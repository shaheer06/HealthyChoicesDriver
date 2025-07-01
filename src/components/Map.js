import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Image, TouchableOpacity, Text, Platform, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  moderateScale,
  requestLocationPermission,
  scale,
  verticalScale,
  GOOGLE_MAPS_API_KEY,
} from '../utils/helper';
import Colors from '../assets/colors/Color';
import { useOrderRequest } from '../context/OrderRequestContext';

const Map = forwardRef((props, ref) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const { orderData } = useOrderRequest();

  const checkPermission = async () => {
    const granted = await requestLocationPermission();
    setHasPermission(granted);
    if (!granted) {
      Alert.alert(
        'Location Permission Required',
        'Please enable location permissions in settings to use the map.'
      );
    }
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDriverLocation({ latitude, longitude });
        setIsLoadingLocation(false);

        // Get route if order data exists
        if (orderData && orderData.location) {
          getRouteFromGoogleDirections(latitude, longitude, orderData.location.latitude, orderData.location.longitude);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLoadingLocation(false);
        Alert.alert(
          'Location Error',
          'Unable to get your current location. Please check your GPS settings.'
        );
      }
    );
  };

  const getRouteFromGoogleDirections = async (startLat, startLng, endLat, endLng) => {
    setIsLoadingRoute(true);

    try {
      const origin = `${startLat},${startLng}`;
      const destination = `${endLat},${endLng}`;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.routes.length > 0) {
        const route = data.routes[0];
        const points = route.overview_polyline.points;

        const coordinates = [];
        if (route.legs && route.legs[0] && route.legs[0].steps) {
          route.legs[0].steps.forEach(step => {
            if (step.start_location) {
              coordinates.push({
                latitude: step.start_location.lat,
                longitude: step.start_location.lng
              });
            }
            if (step.end_location) {
              coordinates.push({
                latitude: step.end_location.lat,
                longitude: step.end_location.lng
              });
            }
          });
        }

        if (coordinates.length > 0) {
          setRouteCoordinates(coordinates);
        } else {
          const decodedCoordinates = decodePolyline(points);
          setRouteCoordinates(decodedCoordinates);
        }
      } else {
        console.error('No route found:', data.status, data.error_message);
        generateSimpleRoute(startLat, startLng, endLat, endLng);
      }
    } catch (error) {
      console.error('Error fetching route:', error);
      generateSimpleRoute(startLat, startLng, endLat, endLng);
    } finally {
      setIsLoadingRoute(false);
    }
  };

  const decodePolyline = (encoded) => {
    const poly = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let shift = 0, result = 0;

      do {
        let b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (result >= 0x20);

      let dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        let b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (result >= 0x20);

      let dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      const p = { latitude: lat / 1E5, longitude: lng / 1E5 };
      poly.push(p);
    }

    return poly;
  };

  const generateSimpleRoute = (startLat, startLng, endLat, endLng) => {
    const coordinates = [];
    const steps = 20;

    for (let i = 0; i <= steps; i++) {
      const lat = startLat + (endLat - startLat) * (i / steps);
      const lng = startLng + (endLng - startLng) * (i / steps);
      coordinates.push({ latitude: lat, longitude: lng });
    }

    setRouteCoordinates(coordinates);
  };

  useImperativeHandle(ref, () => ({
    refreshLocation: getCurrentLocation
  }));

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      getCurrentLocation();
    }
  }, [hasPermission]);

  useEffect(() => {
    if (orderData && orderData.location && driverLocation) {
      getRouteFromGoogleDirections(
        driverLocation.latitude,
        driverLocation.longitude,
        orderData.location.latitude,
        orderData.location.longitude
      );
    }
  }, [orderData, driverLocation]);



  const openAppSettings = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      Linking.openSettings();
    }
  };

  if (hasPermission === null) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={[styles.container, styles.center]}>
        <Image style={styles?.errorImg} source={require("../assets/images/error.jpg")} resizeMode='contain' />
        <TouchableOpacity onPress={openAppSettings} style={styles?.btn} >
          <Text>Open Setting</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoadingLocation) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Colors?.selectionColor} />
        <Text style={styles.loadingText}>Getting your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        mapType='standard'
        initialRegion={driverLocation ? {
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : {
          latitude: 26.2285,
          longitude: 50.586,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Your Location"
            description="Driver's current location"
            pinColor="blue"
          />
        )}

        {orderData && orderData.location && (
          <Marker
            coordinate={orderData.location}
            title="Customer Location"
            description={orderData.customerAddress}
            pinColor="red"
          />
        )}

        {routeCoordinates.length > 0 && (
          <>
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#FF0000"
              strokeWidth={6}
            />
          </>
        )}
      </MapView>

      {isLoadingRoute && (
        <View style={styles.routeLoadingContainer}>
          <ActivityIndicator size="small" color={Colors?.selectionColor} />
          <Text style={styles.routeLoadingText}>Calculating route...</Text>
        </View>
      )}
    </View>
  );
});

export default Map;

const styles = StyleSheet.create({
  container: {
    width: '110%',
    alignSelf: 'center',
    height: "100%"
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    flex: 1,
    borderRadius: scale(15),
  },
  errorImg: {
    width: '80%',
    height: '80%',
  },
  btn: {
    backgroundColor: 'skyblue',
    padding: verticalScale(10),
    borderRadius: 5
  },
  loadingText: {
    marginTop: verticalScale(10),
    fontSize: scale(16),
    color: '#666',
  },
  routeLoadingContainer: {
    position: 'absolute',
    top: verticalScale(100),
    left: scale(20),
    right: scale(20),
    backgroundColor: 'white',
    padding: verticalScale(10),
    borderRadius: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  routeLoadingText: {
    marginLeft: scale(10),
    fontSize: scale(14),
    color: '#666',
  }
});
