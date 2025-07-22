import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AppSkeleton from '../components/AppSkeleton';
import CustomButton from '../components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import PopUp from '../Popup/PopUp';
import api from '../utils/apiUrl';
import { useDispatch } from 'react-redux';
import { setUserData } from '../store/slices/userSlice';
import Header from '../components/Header';

const OtpScreen = () => {
  const [counter, setCounter] = useState(60);
  const length = 6;
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputs = useRef([]);
  const route = useRoute();
  const { mobile, rememberMe } = route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input
    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] === '' && index > 0) {
        setTimeout(() => {
          inputs.current[index - 1]?.focus();

          const newOtp = [...otp];
          newOtp[index - 1] = '';
          setOtp(newOtp);
        }, 10);
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (counter > 0) {
      timer = setTimeout(() => setCounter(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [counter]);

  const resendCode = () => {
    setCounter(60);
    console.log('Resend code triggered');
  };

  const handleLogin = async () => {
    const otpCode = otp.join('').trim(); // this gives you "123456"

    if (otpCode.length < 6) {
      PopUp.show('Error', 'error', 3000, 'Please enter a complete 6-digit OTP');
      return;
    }
    const usernamePayload = mobile ? { mobile } : null;
    console.log('otpCode', otpCode);
    console.log('mobile', usernamePayload);
    console.log('rememberMe', rememberMe, 'rememberMe');
    try {
      setLoading(true);
      const response = await api.post('/api/driver/login', {
        username: usernamePayload, // comes from route.params
        otp: otpCode,
        rememberMe: rememberMe,
      });

      console.log('response', response?.data);
      dispatch(setUserData(response?.data));
      PopUp.show(
        'Hello',
        'success',
        3000,
        'Login Successful'
      );
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabs' }],
      });
    } catch (error) {
      if (error?.response?.status === 400) {
        console.log('error', error?.response?.data?.message);
        PopUp.show('Oops', 'error', 3000, error?.response?.data?.message);
      } else {
        PopUp.show('Oops', 'error', 3000, 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-submit when all 6 digits are entered
  useEffect(() => {
    const otpCode = otp.join('').trim();

    if (otpCode.length === 6) {
      // Add a small delay to ensure state is fully updated
      setTimeout(() => {
        handleLogin();
      }, 50);
    }
  }, [otp]);

  return (
    <AppSkeleton>
      <Header
        source={require('../assets/images/otpImg.png')}
        title={'Enter verification code'}
        label={'We have sent the code to +973 3621 4785.'}
      />
      <View style={styles.mainContainer}>
        {otp?.map((digit, index) => (
          <TextInput
            editable={!loading}
            key={index}
            value={digit}
            onChangeText={text =>
              handleChange(text.replace(/[^0-9]/g, ''), index)
            }
            onKeyPress={e => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            style={styles.input}
            ref={ref => (inputs.current[index] = ref)}
          />
        ))}
      </View>

      <View style={styles?.container}>
        <View style={styles.timerWrapper}>
          {counter > 0 ? (
            <Text style={styles.timerText}>
              Resend in{' '}
              <Text style={{ color: Colors?.black, fontFamily: fonts?.bold }}>
                {`00`}:{counter}s
              </Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={resendCode}>
              <Text
                style={[
                  styles.timerText,
                  {
                    color: Colors?.black,
                    fontWeight: 'bold',
                    textDecorationLine: '',
                  },
                ]}>
                Resend
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <CustomButton
          disabled={loading}
          label={
            loading ? (
              <ActivityIndicator size={'small'} color={Colors?.white} />
            ) : (
              'Continue'
            )
          }
          btnStyle={{ alignSelf: 'center' }}
          onPress={handleLogin}
        />
      </View>
    </AppSkeleton>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  timerWrapper: {
    marginTop: verticalScale(20),
  },
  timerText: {
    fontSize: moderateScale(14),
    color: Colors?.lightGrey,
    fontFamily: fonts?.regular,
  },
  container: {
    justifyContent: 'space-between',
    flex: 0.9,
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginHorizontal: 5,
    marginTop: verticalScale(40),
    backgroundColor: '#FBFBFB',
    padding: scale(10),
    gap: scale(5),
    borderRadius: scale(5),
  },
  input: {
    width: moderateScale(51),
    height: moderateScale(50),
    backgroundColor: Colors?.white,
    textAlign: 'center',
    fontSize: moderateScale(24),
    borderBottomWidth: scale(3),
    borderBottomColor: Colors?.orange,
    borderRadius: scale(8),
  },
});
