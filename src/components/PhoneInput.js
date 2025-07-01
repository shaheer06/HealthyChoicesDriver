import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Platform,
} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {parsePhoneNumberFromString} from 'libphonenumber-js';
import {fonts} from '../assets/fonts/Fonts';
import {moderateScale, scale, verticalScale} from '../utils/helper';
import Colors from '../assets/colors/Color';
import Icon from '../assets/icon/Icon';

const PhoneInput = ({phoneNumber, setPhoneNumber, onValidationChange, onCountryChange}) => {
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Bahrain',
    dial_code: '+973',
    code: 'BH',
  });

  const [isValid, setIsValid] = useState(null);
  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const validatePhoneNumber = (number, code) => {
    try {
      const fullNumber = `${code}${number}`;
      const phoneNumberObj = parsePhoneNumberFromString(fullNumber);
      return phoneNumberObj ? phoneNumberObj.isValid() : false;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (phoneNumber) {
      const isNumberValid = validatePhoneNumber(
        phoneNumber,
        selectedCountry?.dial_code,
      );
      setIsValid(isNumberValid);
      if (onValidationChange) {
        onValidationChange(isNumberValid);
      }
    } else {
      setIsValid(null);
      if (onValidationChange) {
        onValidationChange(null);
      }
    }
  }, [phoneNumber, selectedCountry, onValidationChange]);

  // Notify parent when country changes
  useEffect(() => {
    if (onCountryChange) {
      onCountryChange(selectedCountry);
    }
  }, [selectedCountry, onCountryChange]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.countryPickerButton}
        onPress={() => setCountryPickerVisible(true)}>
        <Image
          source={{
            uri: `https://flagcdn.com/w80/${selectedCountry?.code.toLowerCase()}.png`,
          }}
          style={styles.flagImage}
          resizeMode="contain"
        />
        <Text style={styles.countryCodeText}>{selectedCountry?.dial_code}</Text>
        <Icon
          family={'Entypo'}
          name={'chevron-down'}
          size={moderateScale(12)}
          style={{marginLeft: scale(5)}}
          color="black"
        />
      </TouchableOpacity>

      <CountryPicker
        show={countryPickerVisible}
        onBackdropPress={() => setCountryPickerVisible(false)}
        pickerButtonOnPress={item => {
          setSelectedCountry(item);
          setCountryPickerVisible(false);
        }}
        style={{
          modal: {height: '70%'},
          textInput: {color: '#000'},
          dialCode: {color: '#000'},
          countryName: {color: '#000'},
        }}
      />

      <TextInput
        style={[
          styles.input,
          {
            borderColor:
              isValid === null
                ? Colors?.black
                : isValid
                ? Colors?.verify
                : Colors?.notValid,
          },
        ]}
        placeholder="Phone Number"
        placeholderTextColor={Colors?.lightGrey}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(5),
    width: '99%',
  },
  countryPickerButton: {
    paddingVertical:Platform.OS==='android'?  verticalScale(12):verticalScale(12.5),
    borderWidth: scale(1),
    borderColor: Colors?.black,
    borderRadius: scale(5),
    backgroundColor: Colors?.white,
    paddingHorizontal: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: moderateScale(14),
    color: Colors?.black,
    fontFamily: fonts?.medium,
  },
  input: {
    flex: 1,
    borderWidth: scale(1),
    padding: Platform.OS==='android'?  verticalScale(14):verticalScale(14.5),
    fontSize: moderateScale(14),
    borderRadius: scale(5),
    backgroundColor: Colors?.white,
    fontFamily: fonts?.medium,
    color: Colors?.black,
  },
  flagImage: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderRadius: scale(12),
    marginRight: scale(8),
  },
});

export default PhoneInput;
