import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AppSkeleton from '../components/AppSkeleton';
import { fonts } from '../assets/fonts/Fonts';
import Map from '../components/Map';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import CustomInput from '../components/CustomInput';
import PhoneInput from '../components/PhoneInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/apiUrl';
import PopUp from '../Popup/PopUp';
import { useMutation } from '@tanstack/react-query';
import { generateOtp } from '../services/authService';

const { height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const [isPhoneValid, setIsPhoneValid] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'Bahrain',
    dial_code: '+973',
    code: 'BH',
  });
  const handlePhoneValidationChange = (isValid) => {
    setIsPhoneValid(isValid);
    if (phoneError && isValid) {
      setPhoneError('');
    }
  };

  const getFullPhoneNumber = () => {
    // Remove the "+" from dial_code and combine with phone number
    const countryCode = selectedCountry.dial_code.replace('+', '');
    return `${countryCode}${phoneNumber}`;
  };

  const fullPhoneNumber = getFullPhoneNumber();

  const generateOtpMutation = useMutation({
    mutationFn: () => generateOtp(fullPhoneNumber),
    onSuccess: (data) => {
      if (data?.data?.success) {
        navigation?.navigate('OtpScreen', {
          mobile: fullPhoneNumber,
          rememberMe: false,
        });
      }
      PopUp.show('Hello', 'success', 3000, 'OTP has sent to you!!!');
    },
    onError: (error) => {
      if (error?.response?.status === 400) {
        console.log('error', error?.response?.data?.message);
        PopUp.show('Oops', 'error', 3000, error?.response?.data?.message);
      } else {
        PopUp.show('Oops', 'error', 3000, 'Something went wrong');
      }
    },
  });

  const { mutate: generateOtp, isPending: isLoading } = generateOtpMutation;

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);
  return (
    <AppSkeleton>
      <View style={styles.container}>
        <Animated.Image
          source={require('../assets/images/bike.jpg')}
          style={{
            width: moderateScale(200),
            height: moderateScale(200),
            transform: [{ translateX: slideAnim }],
          }}
          resizeMode="contain"
        />
        <View style={styles.mainContainer}>
          <Text style={{ fontFamily: fonts?.bold, fontSize: moderateScale(30), color: Colors?.white }}>
            LOGIN WITH DRIVER
          </Text>
          <Text
            style={{
              fontFamily: fonts?.medium,
              fontSize: moderateScale(16),
              color: Colors?.white,
              // fontStyle:'italic'
              textAlign: 'center'
            }}>
            Welcome back! Please log in to start delivering.
          </Text>
          <PhoneInput
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            onValidationChange={handlePhoneValidationChange}
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
          />
          {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
          <CustomButton
            label={isLoading ? <ActivityIndicator size="small" color={Colors?.white} />
              : 'Start Driving -->'}
            btnStyle={{
              backgroundColor: Colors?.black,
              borderRadius: scale(5),
              width: '100%',
              borderWidth: 1,
              borderColor: "white"
            }}
            txtStyle={[
              {
                color: !phoneNumber.trim() ? Colors?.black : Colors?.white,
              },
            ]}
            onPress={() => generateOtp()}
            isLoading={isLoading}
            disabled={isLoading || !phoneNumber.trim()}
          />
        </View>
        <View
          style={{
            width: '100%',
            marginTop: height * 0.05,
            alignItems: 'center',
            gap: verticalScale(20),
          }}>
          <Image
            source={require('../assets/images/image2.png')}
            style={{ width: '100%', height: moderateScale(100) }}
            resizeMode="contain"
          />
          <Text style={styles.text} >
            "Healthy food, happy customers — delivered by you."
          </Text>
        </View>
      </View>
    </AppSkeleton>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    // backgroundColor:'red',
    // justifyContent:"space-between"
  },
  mainContainer: {
    backgroundColor: Colors?.orange,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: verticalScale(20),
    gap: verticalScale(12),
    borderRadius: scale(10),
    elevation: 12,
    shadowColor: Colors?.black,
    shadowOffset: { height: 3, width: 0 },
    shadowRadius: 3,
    shadowOpacity: 0.5,
  },
  text: {
    fontSize: moderateScale(18),
    textAlign: 'center',
    // fontFamily:fonts?.bold,
    color: Colors?.black,
    fontStyle: "italic",
    fontWeight: "400"
  },
  errorText: {
    color: Colors?.red,
    fontSize: moderateScale(12),
    fontFamily: fonts?.regular,
    textAlign: 'center',
    left: verticalScale(30),
  },
});
