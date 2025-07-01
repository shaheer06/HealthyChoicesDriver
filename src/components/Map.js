import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Alert, Image, TouchableOpacity, Text, Platform, Linking } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import {
  moderateScale,
  requestLocationPermission,
  scale,
  verticalScale,
} from '../utils/helper';
import Colors from '../assets/colors/Color';

const Map = () => {
  const [hasPermission, setHasPermission] = useState(null);

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

  useEffect(() => {

    checkPermission();
  }, []);


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

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        mapType='standard'
        initialRegion={{
          latitude: 26.2285,
          longitude: 50.586,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{ latitude: 26.2285, longitude: 50.586 }}
          title="Manama"
          description="Capital of Bahrain"
          pinColor={Colors?.selectionColor}
        />
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    width: '110%',
    // marginVertical: verticalScale(15),
    // height: moderateScale(200),
    // borderRadius: scale(15),
    // flex:1,
    alignSelf:'center',
    height:"100%"
    // paddingBottom:verticalScale(200)

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
  btn:{
    backgroundColor:'skyblue',
    padding:verticalScale(10),
    borderRadius:5
  }
});
