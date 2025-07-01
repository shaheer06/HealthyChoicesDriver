import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {moderateScale, scale, verticalScale} from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';

const CustomButton = ({
  label,
  onPress,
  btnStyle,
  txtStyle,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles?.btn, btnStyle, disabled ? styles?.disabledBtn : null]}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={[styles?.btnText, txtStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    paddingVertical: verticalScale(15),
    backgroundColor: Colors?.btnColor,
    width: '95%',
    alignItems: 'center',
    borderRadius: scale(40),
    marginTop: verticalScale(10),
  },
  btnText: {
    color: Colors?.white,
    fontSize: moderateScale(14),
    fontFamily: fonts?.robotoMedium,
  },
  disabledBtn: {
    backgroundColor: 'lightgrey',
  },
});
