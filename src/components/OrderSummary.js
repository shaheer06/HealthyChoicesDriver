import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import OrderSection from './OrderSection';
import OrderActions from './OrderActions';

const OrderSummary = ({ 
  orderData, 
  from, 
  navigation, 
  deliveryStatus, 
  STATUS,
  handleConfirmOrder,
  handleStartDelivery,
  handleCompleteDelivery
}) => {
  return (
    <OrderSection icon="calculator" title={from !== 'Order' ? 'Order Summary' : 'Order Details'}>
      {from !== 'Order' && (
        <>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>Rs. {orderData.subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee:</Text>
            <Text style={styles.summaryValue}>
              Rs. {orderData.deliveryAmount}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Vat:</Text>
            <Text style={styles.summaryValue}>
              Rs. {Number(orderData.vat).toFixed(1)}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Grand Total:</Text>
            <Text style={styles.totalValue}>Rs. {orderData.grandTotal}</Text>
          </View>

          <View style={styles.paymentMethod}>
            <Text style={styles.paymentLabel}>Payment Method:</Text>
            <Text style={styles.paymentValue}>{orderData.paymentMethod}</Text>
          </View>
        </>
      )}

      <OrderActions 
        orderData={orderData}
        navigation={navigation}
        deliveryStatus={deliveryStatus}
        STATUS={STATUS}
        handleConfirmOrder={handleConfirmOrder}
        handleStartDelivery={handleStartDelivery}
        handleCompleteDelivery={handleCompleteDelivery}
      />
    </OrderSection>
  );
};

const styles = StyleSheet.create({
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
  },
  summaryLabel: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  summaryValue: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.greyV4,
    marginTop: verticalScale(5),
    paddingTop: verticalScale(10),
  },
  totalLabel: {
    fontSize: moderateScale(16),
    fontFamily: fonts.bold,
    color: Colors.black,
  },
  totalValue: {
    fontSize: moderateScale(16),
    fontFamily: fonts.bold,
    color: Colors.orange,
  },
  paymentMethod: {
    marginTop: verticalScale(10),
    paddingTop: verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: Colors.greyV4,
  },
  paymentLabel: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  paymentValue: {
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
    color: Colors.grey,
    marginTop: verticalScale(2),
  },
});

export default OrderSummary;
