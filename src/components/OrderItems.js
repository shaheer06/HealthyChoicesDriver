import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { moderateScale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import OrderSection from './OrderSection';

const OrderItems = ({ orderData, from }) => {
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item?.title}</Text>
        <Text style={styles.itemQuantity}>Qty: {item?.qty}</Text>
      </View>
      <Text style={styles.itemPrice}>Rs. {item?.price}</Text>
    </View>
  );

  return (
    <OrderSection icon="shopping-cart" title="Order Items">
      {from !== 'Order' ? (
        <FlatList
          data={orderData.items}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Meal:</Text>
          <Text style={styles.summaryValue}>{orderData.meal}</Text>
        </View>
      )}
    </OrderSection>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyV4,
  },
  itemInfo: { flex: 1 },
  itemName: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  itemQuantity: {
    fontSize: moderateScale(12),
    fontFamily: fonts.regular,
    color: Colors.black,
    marginTop: verticalScale(2),
  },
  itemPrice: {
    fontSize: moderateScale(14),
    fontFamily: fonts.bold,
    color: Colors.orange,
  },
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
});

export default OrderItems;
