import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppSkeleton from '../components/AppSkeleton';
import CustomInput from '../components/CustomInput';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Header from '../components/BacKHeader';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../assets/colors/Color';
import PopUp from '../Popup/PopUp';
import { updateUserProfile } from '../utils/updateUserProfile';
import { setUserData } from '../store/slices/userSlice';

const ProfileDetail = () => {
  const navigation = useNavigation();
  const { userData } = useSelector(state => state?.user);
  const [name, setName] = useState(userData?.data?.name);
  const [mobile, setMobile] = useState(userData?.data?.mobile);
  const [email, setEmail] = useState(userData?.data?.email);
  const [isLoading, setIsLoading] = useState(false);
  console.log('userData', userData);
  const dispatch = useDispatch();
  const updateProfile = async () => {
    const payload = {
      name: name,
      mobile: mobile,
    };
    setIsLoading(true);
    try {
      const response = await updateUserProfile(userData?.data?._id, payload);
      console.log(response, 'response');
      dispatch(setUserData(response?.data));
      PopUp.show('Success', 'success', 4000, 'Profile updated successfully');
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      console.log(error, 'profile error');
      PopUp.show('Error', 'error', 4000, 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppSkeleton>
      <Header showText={true} text="Edit Profile" />
      <View style={styles?.container}>
        <CustomInput
          title={'Name'}
          titleStyle={{ fontSize: moderateScale(14), color: Colors?.black }}
          placeholder={'John Doe'}
          value={name}
          style={{ width: '48.5%' }}
          onChangeText={setName}
        />
        <CustomInput
          title={'Mobile Number'}
          titleStyle={{ fontSize: moderateScale(14), color: Colors?.black }}
          placeholder={'97312345678'}
          value={mobile}
          style={{ width: '48.5%' }}
          onChangeText={setMobile}
        />
      </View>
      <CustomButton
        label={isLoading ? <ActivityIndicator size="small" color={Colors.white} /> : 'Update Profile'}
        btnStyle={{
          alignSelf: 'center',
          width: '100%',
          marginTop: verticalScale(20),
        }}
        onPress={updateProfile}
        disabled={isLoading}
      />
    </AppSkeleton>
  );
};

export default ProfileDetail;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: scale(10),
    marginTop: verticalScale(10),
    // alignItems: 'center',
  },
});
