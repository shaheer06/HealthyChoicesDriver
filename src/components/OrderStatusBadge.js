import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';

const OrderStatusBadge = ({ status, getStatusColor, getStatusText }) => {
  return (
    <View
      style={[
        styles.statusBadge,
        { backgroundColor: getStatusColor(status) },
      ]}>
      <Text style={styles.statusText}>
        {getStatusText(status)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBadge: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
  },
  statusText: {
    color: Colors.white,
    fontFamily: fonts.medium,
    fontSize: moderateScale(12),
  },
});

export default OrderStatusBadge;
