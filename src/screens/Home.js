import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppSkeleton from '../components/AppSkeleton';
import Map from '../components/Map';
import { useOrderRequest } from '../context/OrderRequestContext';

const Home = () => {
    const { setOrderData } = useOrderRequest();

  const simulateIncomingRequest = () => {
    setOrderData({
      customerName: 'John Doe',
      customerAddress: '123 Main Street, Springfield',
      location: {
        latitude: 37.7749,
        longitude: -122.4194,
      },
    });
  };
  return (
    // <AppSkeleton>
    <View >
      <Map />
      <View>

      <Button title="Simulate Order Request" 
      
      onPress={simulateIncomingRequest} />
      </View>
    </View>
    // </AppSkeleton>
  );
};

export default Home;

const styles = StyleSheet.create({

});
