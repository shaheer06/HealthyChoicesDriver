// components/OrderRequestModal.js
import React from 'react';
import {Modal, View, Text, Button, StyleSheet} from 'react-native';
import { scale, verticalScale } from '../utils/helper';
import { useOrderRequest } from '../context/OrderRequestContext';


const OrderRequestModal = ({onAccept}) => {
  const {orderData, setOrderData} = useOrderRequest();

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
          <Text>User: {orderData.customerName}</Text>
          <Text>Location: {orderData.customerAddress}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={handleCancel} />
            <Button title="Accept" onPress={handleAccept} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: verticalScale(20),
    margin: verticalScale(20),
    borderRadius: scale(10),
  },
  buttonContainer: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default OrderRequestModal;
