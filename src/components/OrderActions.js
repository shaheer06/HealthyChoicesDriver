import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import Icon from '../assets/icon/Icon';
import CustomButton from './CustomButton';
import { Linking } from 'react-native';

const OrderActions = ({ 
  orderData, 
  navigation, 
  deliveryStatus, 
  STATUS,
  handleConfirmOrder,
  handleStartDelivery,
  handleCompleteDelivery
}) => {
  const handleCallDriver = () => {
    Linking.openURL(`tel:${orderData?.customerId?.mobile}`);
  };

  const handleWhatsapp = () => {
    Linking.openURL(`https://wa.me/${orderData?.customerId?.mobile}`);
  };

  return (
    <>
      {/* Call/Message/WhatsApp Buttons */}
      <View style={styles.callButtonContainer}>
        <TouchableOpacity
          style={styles.callButton}
          onPress={handleCallDriver}>
          <Icon
            family="Ionicons"
            name="call"
            size={20}
            color={Colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.callButton}
          onPress={() => {
            navigation.navigate('Chat', { driver: orderData });
          }}>
          <Icon
            family="Entypo"
            name="message"
            size={20}
            color={Colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.callButton}>
          <Icon
            family="FontAwesome"
            name="whatsapp"
            size={20}
            color={Colors.white}
            onPress={handleWhatsapp}
          />
        </TouchableOpacity>
      </View>

      {/* Main Action Button */}
      <CustomButton
        onPress={
          deliveryStatus === STATUS.PENDING
            ? handleConfirmOrder
            : deliveryStatus === STATUS.READY_FOR_DELIVERY
              ? handleStartDelivery
              : deliveryStatus === STATUS.OUT_FOR_DELIVERY
                ? handleCompleteDelivery
                : () => { }
        }
        label={
          deliveryStatus === STATUS.PENDING
            ? 'Confirm Order'
            : deliveryStatus === STATUS.READY_FOR_DELIVERY
              ? 'Start Delivery'
              : deliveryStatus === STATUS.OUT_FOR_DELIVERY
                ? 'Complete Delivery'
                : null
        }
        btnStyle={{
          width: '95%',
          borderRadius: scale(5),
          backgroundColor:
            deliveryStatus === STATUS.PENDING
              ? Colors?.verify
              : deliveryStatus === STATUS.READY_FOR_DELIVERY
                ? Colors?.btnColor
                : deliveryStatus === STATUS.OUT_FOR_DELIVERY
                  ? Colors?.green
                  : Colors?.gray,
          alignSelf: 'center',
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  callButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(12),
  },
  callButton: {
    backgroundColor: Colors.orange,
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(22.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderActions;
