import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import OrderStatusBadge from './OrderStatusBadge';

const OrderHeader = ({ orderNumber, status, getStatusColor, getStatusText }) => {
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.orderDetails}>Order Details</Text>
        <OrderStatusBadge 
          status={status} 
          getStatusColor={getStatusColor} 
          getStatusText={getStatusText} 
        />
      </View>

      {/* Order Number */}
      <View style={styles.orderNumberContainer}>
        <Text style={styles.orderNumberLabel}>Order No:</Text>
        <Text style={styles.orderNumber}>#{orderNumber}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.white,
    width: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: scale(35),
    borderTopRightRadius: scale(35),
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.orange,
    paddingVertical: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  orderDetails: {
    fontFamily: fonts.bold,
    fontSize: moderateScale(22),
    color: Colors.black,
  },
  orderNumberContainer: {
    backgroundColor: Colors.greyV4,
    marginHorizontal: scale(5),
    marginTop: verticalScale(20),
    padding: verticalScale(15),
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderNumberLabel: {
    fontSize: moderateScale(16),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  orderNumber: {
    fontSize: moderateScale(18),
    fontFamily: fonts.bold,
    color: Colors.orange,
    marginLeft: scale(5),
  },
});

export default OrderHeader;
