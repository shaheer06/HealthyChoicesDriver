import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppSkeleton from '../components/AppSkeleton';
import CustomInput from '../components/CustomInput';
import {scale, verticalScale} from '../utils/helper';
import Header from '../components/BacKHeader';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ProfileDetail = () => {
    const navigation=useNavigation();
  return (
    <AppSkeleton>
      <Header showText={true} text="Edit Profile" />
      <View style={styles?.container}>
        <CustomInput
          placeholder={'Azhar Akbar'}
          style={{width: '48.5%'}}
          editable={false}
        />
        <CustomInput
          placeholder={'+9734567564'}
          style={{width: '48.5%'}}
          editable={false}
        />
      </View>
      <CustomInput
        placeholder={'azhar@email.com'}
        style={{marginTop: verticalScale(10)}}
        editable={false}
      />
      <CustomButton
        label={'Chnage Number'}
        btnStyle={{
          alignSelf: 'center',
          width: '100%',
          marginTop: verticalScale(20),
        }}
        onPress={()=>navigation.replace("ChangeNumber")}
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
