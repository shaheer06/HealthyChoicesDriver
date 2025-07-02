import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppSkeleton from '../components/AppSkeleton'
import Header from '../components/BacKHeader'
import { moderateScale, scale, verticalScale } from '../utils/helper'
import CustomButton from '../components/CustomButton'
import { useNavigation } from '@react-navigation/native'
import { fonts } from '../assets/fonts/Fonts'

const ChangeNumber = () => {
    const navigation=useNavigation();
  return (
   <AppSkeleton>
     <Header showText={true} text="Change Number Request" />
      <View
        style={{
          alignItems: 'center',
          marginTop: verticalScale(10),
          gap: scale(10),
        }}>
        <Image
          source={require('../assets/images/tick.png')}
          style={{width: moderateScale(100), height: moderateScale(100)}}
          resizeMode="contain"
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: fonts?.bold,
            fontSize: moderateScale(20),
          }}>
          Your number change request has been sent to admin. Once it is
          accepted, we will notify you.
        </Text>
        <CustomButton
          label={'Go Back'}
          onPress={() => navigation?.replace('BottomTabs')}
        />
      </View>
   </AppSkeleton>
  )
}

export default ChangeNumber

const styles = StyleSheet.create({

})