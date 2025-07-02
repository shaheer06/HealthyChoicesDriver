import React, { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import Icon from '../assets/icon/Icon';
import { moderateScale, scale, verticalScale } from '../utils/helper';

const CustomInput = ({
  placeholder,
  title,
  mode = 'text', // "text" or "date"
  iconName,
  iconFamily,
  iconSize = moderateScale(20),
  iconColor = Colors?.lightGrey,
  value,
  onChangeText,
  style,
  titleStyle,
  inputStyle,
  disabled = false,
  secureTextEntry = false,
  showFocus = false,
  focusColor = Colors?.orange,
  placeholderTextColor=Colors.lightGrey,
  minimumDate,
  editable
}) => {
  // const initialDate = value ? new Date(value) : new Date();
  // const [date, setDate] = useState(new Date());
  // const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focus, setFocus] = useState(false);

  // useEffect(() => {
  //   if (value) {
  //     const vDate = new Date(value);
  //     setDate(vDate);
  //   }
  // }, [value]);

  // const getFormattedDate = date => {
  //   if (!date) return '';
  //   return new Date(date).toLocaleDateString(); // You can use moment/Intl if needed
  // };

  // const displayValue = getFormattedDate(value);

  // const handleDateConfirm = selectedDate => {
  //   setOpen(false);
  //   setDate(selectedDate);
  //   onChangeText?.(selectedDate); // Send back Date or string — your choice
  // };

  return (
    <View style={[styles.container, style]}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

      {/* {mode === 'date' ? (
        <>
          <TouchableOpacity
            onPress={() => !disabled && setOpen(true)}
            activeOpacity={0.8}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                placeholderTextColor={Colors?.lightGrey}
                value={displayValue}
                editable={false}
              />
              {iconName && iconFamily && (
                <Icon
                  name={iconName}
                  family={iconFamily}
                  size={iconSize}
                  color={iconColor}
                />
              )}
            </View>
          </TouchableOpacity>

          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setOpen(false)}
            minimumDate={minimumDate}
          />
        </>
      ) : ( */}
        <View
          style={[
            styles.inputWrapper,
            showFocus && {
              borderColor: focus ? focusColor : Colors?.black,
              borderWidth: focus ? scale(2) : scale(1),
              backgroundColor: focus ? Colors?.greyV4 : Colors?.white,
            },
          ]}>
          <TextInput
            style={[styles.input, {flex: 1}, inputStyle]}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            onChangeText={onChangeText}
            editable={!disabled && editable}
            secureTextEntry={secureTextEntry && !showPassword}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          {iconName && iconFamily && (
            <Icon
              name={iconName}
              family={iconFamily}
              size={iconSize}
              color={iconColor}
            />
          )}

          {secureTextEntry && (
            <Icon
              name={showPassword ? 'eye' : 'eye-off'}
              family="Feather"
              size={moderateScale(20)}
              color={Colors?.lightGrey}
              onPress={() => setShowPassword(!showPassword)}
            />
          )}
        </View>
      {/* )} */}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // marginBottom: verticalScale(16), // use marginBottom instead of marginTop
  },
  title: {
    fontFamily: fonts?.bold,
    fontSize: moderateScale(24),
    color: Colors?.black,
    marginBottom: verticalScale(6),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(15),
    paddingVertical:
      Platform.OS === 'android' ? verticalScale(5) : verticalScale(15),
    borderRadius: scale(5),
    borderWidth: scale(1),

    // justifyContent: 'space-between',
  },
  input: {
    fontSize: moderateScale(14),
    color: Colors?.black,
  },
});
