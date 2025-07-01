// components/OrderRequestModal.js
import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { scale, verticalScale, GOOGLE_MAPS_API_KEY } from '../utils/helper';
import { useOrderRequest } from '../context/OrderRequestContext';
import Colors from '../assets/colors/Color';

const OrderRequestModal = ({ onAccept }) => {
  const { orderData, setOrderData } = useOrderRequest();
  const [distance, setDistance] = useState('Calculating...');
  const [duration, setDuration] = useState('');
  const [driverLocation, setDriverLocation] = useState(null);

  const getRouteInfoFromGoogle = async (startLat, startLng, endLat, endLng) => {
    try {
      const origin = `${startLat},${startLng}`;
      const destination = `${endLat},${endLng}`;
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK' && data.routes.length > 0) {
        const route = data.routes[0];
        const leg = route.legs[0];

        const distanceKm = (leg.distance.value / 1000).toFixed(1);
        setDistance(`${distanceKm} km`);

        const durationMinutes = Math.round(leg.duration.value / 60);
        setDuration(`${durationMinutes} min`);
      } else {
        console.error('No route found:', data.status);
        const simpleDistance = calculateSimpleDistance(startLat, startLng, endLat, endLng);
        setDistance(`${simpleDistance} km`);
        setDuration('25-30 min');
      }
    } catch (error) {
      console.error('Error fetching route info:', error);
      const simpleDistance = calculateSimpleDistance(startLat, startLng, endLat, endLng);
      setDistance(`${simpleDistance} km`);
      setDuration('25-30 min');
    }
  };

  const calculateSimpleDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(1);
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setDriverLocation({ latitude, longitude });

        if (orderData && orderData.location) {
          getRouteInfoFromGoogle(
            latitude,
            longitude,
            orderData.location.latitude,
            orderData.location.longitude
          );
        }
      },
      (error) => {
        console.error('Error getting location for distance calculation:', error);
        setDistance('Unable to calculate');
        setDuration('Unable to calculate');
      }
    );
  };

  useEffect(() => {
    if (orderData) {
      getCurrentLocation();
    }
  }, [orderData]);

  const handleCancel = () => setOrderData(null);
  const handleAccept = () => {
    onAccept(orderData);
    setOrderData(null);
  };

  if (!orderData) return null;

  return (
    <Modal transparent animationType="slide" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>New Order Request</Text>
              <Text style={styles.headerSubtitle}>Customer needs delivery</Text>
            </View>

            {/* Customer Info */}
            <View style={styles.customerSection}>
              <View style={styles.customerInfo}>
                <Image
                  source={require('../assets/images/profile2.jpg')}
                  style={styles.customerImage}
                />
                <View style={styles.customerDetails}>
                  <Text style={styles.customerName}>{orderData.customerName}</Text>
                  <Text style={styles.customerStatus}>Premium Customer</Text>
                  <Text style={styles.rating}>⭐ 4.8 (120 reviews)</Text>
                </View>
              </View>
            </View>

            {/* Product Info */}
            <View style={styles.productSection}>
              <Text style={styles.sectionTitle}>Order Details</Text>
              <View style={styles.productCard}>
                <Image
                  source={require('../assets/images/vegetable1.png')}
                  style={styles.productImage}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName}>Fresh Organic Vegetables</Text>
                  <Text style={styles.productDescription}>Mixed vegetables pack</Text>
                  <Text style={styles.productPrice}>$24.99</Text>
                  <Text style={styles.deliveryTime}>Estimated delivery: {duration || '25-30 min'}</Text>
                </View>
              </View>
            </View>

            {/* Location Info */}
            <View style={styles.locationSection}>
              <Text style={styles.sectionTitle}>Delivery Location</Text>
              <View style={styles.locationCard}>
                <View style={styles.locationIcon}>
                  <Text style={styles.locationIconText}>📍</Text>
                </View>
                <View style={styles.locationDetails}>
                  <Text style={styles.address}>{orderData.customerAddress}</Text>
                  <Text style={styles.coordinates}>
                    Lat: {orderData.location.latitude.toFixed(4)},
                    Long: {orderData.location.longitude.toFixed(4)}
                  </Text>
                  <Text style={styles.distance}>Distance: {distance}</Text>
                </View>
              </View>
            </View>

            {/* Order Summary */}
            <View style={styles.summarySection}>
              <Text style={styles.sectionTitle}>Order Summary</Text>
              <View style={styles.summaryCard}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Subtotal:</Text>
                  <Text style={styles.summaryValue}>$24.99</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delivery Fee:</Text>
                  <Text style={styles.summaryValue}>$3.99</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Tip:</Text>
                  <Text style={styles.summaryValue}>$2.00</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                  <Text style={styles.totalLabel}>Total:</Text>
                  <Text style={styles.totalValue}>$30.98</Text>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
                <Text style={styles.acceptButtonText}>Accept Order</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modal: {
    backgroundColor: 'white',
    margin: verticalScale(20),
    borderRadius: scale(20),
    maxHeight: '90%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  header: {
    padding: verticalScale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: Colors?.selectionColor,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: scale(14),
    color: '#666',
    textAlign: 'center',
    marginTop: verticalScale(5),
  },
  customerSection: {
    padding: verticalScale(15),
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customerImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    marginRight: scale(15),
  },
  customerDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#333',
  },
  customerStatus: {
    fontSize: scale(14),
    color: Colors?.selectionColor,
    fontWeight: '600',
  },
  rating: {
    fontSize: scale(12),
    color: '#666',
    marginTop: verticalScale(2),
  },
  productSection: {
    padding: verticalScale(15),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(10),
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: scale(12),
    padding: verticalScale(15),
  },
  productImage: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(8),
    marginRight: scale(15),
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#333',
  },
  productDescription: {
    fontSize: scale(14),
    color: '#666',
    marginTop: verticalScale(2),
  },
  productPrice: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: Colors?.selectionColor,
    marginTop: verticalScale(5),
  },
  deliveryTime: {
    fontSize: scale(12),
    color: '#666',
    marginTop: verticalScale(2),
  },
  locationSection: {
    padding: verticalScale(15),
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: scale(12),
    padding: verticalScale(15),
  },
  locationIcon: {
    marginRight: scale(15),
  },
  locationIconText: {
    fontSize: scale(24),
  },
  locationDetails: {
    flex: 1,
  },
  address: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#333',
  },
  coordinates: {
    fontSize: scale(12),
    color: '#666',
    marginTop: verticalScale(2),
  },
  distance: {
    fontSize: scale(12),
    color: Colors?.selectionColor,
    fontWeight: '600',
    marginTop: verticalScale(2),
  },
  summarySection: {
    padding: verticalScale(15),
  },
  summaryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: scale(12),
    padding: verticalScale(15),
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
  },
  summaryLabel: {
    fontSize: scale(14),
    color: '#666',
  },
  summaryValue: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: verticalScale(8),
    marginTop: verticalScale(8),
  },
  totalLabel: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: Colors?.selectionColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: verticalScale(20),
    gap: scale(15),
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: verticalScale(15),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: scale(16),
    fontWeight: '600',
    color: '#666',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: Colors?.selectionColor,
    padding: verticalScale(15),
    borderRadius: scale(12),
  },
  acceptButtonText: {
    textAlign: 'center',
    fontSize: scale(16),
    fontWeight: '600',
    color: 'white',
  },
});

export default OrderRequestModal;
