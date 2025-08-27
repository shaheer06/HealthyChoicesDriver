import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import OrderSection from './OrderSection';

const OrderCustomerInfo = ({ orderData, fullAddress, onMapPress }) => {
  return (
    <>
      {/* Customer Information */}
      <OrderSection
        icon="user"
        title="Customer Information"
        style={styles.customerInfo}>
        <View style={styles.customerInfo}>
          <Text style={styles.customerName}>
            Name: {orderData.customerId?.name}
          </Text>
          <Text style={styles.customerPhone}>
            Mobile: {orderData?.customerId?.mobile}
          </Text>
          <Text style={styles.customerAddress}>Address: {fullAddress}</Text>
        </View>
      </OrderSection>

      {/* Location Information */}
      <OrderSection
        icon="location-arrow"
        title="Delivery Location"
        showMapIcon={true}
        onMapPress={onMapPress}>
        <Text style={styles.locationText}>{fullAddress}</Text>
      </OrderSection>
    </>
  );
};

const styles = StyleSheet.create({
  customerInfo: { marginTop: verticalScale(5) },
  customerName: {
    fontSize: moderateScale(16),
    fontFamily: fonts.bold,
    color: Colors.black,
    marginBottom: verticalScale(5),
  },
  customerPhone: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
    marginBottom: verticalScale(5),
  },
  customerAddress: {
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
    color: Colors.black,
    lineHeight: verticalScale(20),
  },
  locationText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
    color: Colors.black,
    lineHeight: verticalScale(20),
  },
});

export default OrderCustomerInfo;
