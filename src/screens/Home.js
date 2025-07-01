import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import AppSkeleton from '../components/AppSkeleton';
import Map from '../components/Map';
import OrderRequestModal from '../components/OrderRequestModal';
import { useOrderRequest } from '../context/OrderRequestContext';
import Colors from '../assets/colors/Color';
import { scale, verticalScale } from '../utils/helper';

const Home = () => {
  const { setOrderData } = useOrderRequest();
  const mapRef = useRef(null);

  const simulateIncomingRequest = () => {
    setOrderData({
      customerName: 'John Doe',
      customerAddress: '123 Main Street, Springfield',
      location: {
        latitude: 24.8754,
        longitude: 67.0410,
      },
    });
  };

  const handleAcceptOrder = (orderData) => {
    console.log('Order accepted:', orderData);
    // Here you would typically:
    // 1. Send acceptance to backend
    // 2. Update order status
    // 3. Start navigation to customer
    // 4. Update UI to show active delivery
  };

  const handleRefreshLocation = () => {
    if (mapRef.current) {
      mapRef.current.refreshLocation();
    }
  };

  return (
    <View style={styles.container}>
      <Map ref={mapRef} />
      <OrderRequestModal onAccept={handleAcceptOrder} />

      {/* Top right refresh button */}
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefreshLocation}>
        <Text style={styles.refreshButtonText}>📍</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <Button title="Simulate Order Request" onPress={simulateIncomingRequest} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 10,
  },
  refreshButton: {
    position: 'absolute',
    top: verticalScale(50),
    right: scale(20),
    backgroundColor: 'white',
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  refreshButtonText: {
    fontSize: scale(20),
  },
});
