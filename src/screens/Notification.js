import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import AppSkeleton from '../components/AppSkeleton';
import Header from '../components/BacKHeader';
import { fonts } from '../assets/fonts/Fonts';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { notifications } from '../assets/dummyData/dummyData';
import moment from 'moment';

const { height } = Dimensions.get('window');

const Notification = () => {
  // const notification = notificationArray(translations);
  const NotificationCard = ({ item }) => {
    return (
      <>
        <View style={[styles?.container, { flexDirection: 'row' }]}>
          <Image
            source={{ uri: item?.image }}
            style={{
              width: moderateScale(60),
              height: moderateScale(60),
              borderRadius: scale(30),
            }}
          />
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
            }}>
            <Text style={styles?.title}>{item?.message}</Text>
            <Text style={styles?.label}>{moment(item?.date).fromNow()}</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: scale(1),
            borderBottomColor: Colors?.greyV2,
            width: '110%',
            alignSelf: 'center',
            marginTop: verticalScale(15),
          }}
        />
      </>
    );
  };
  return (
    <>
      <AppSkeleton disableScroll={true}>
        <Header showText={true} text={'Notifications'} />
        <ScrollView
          style={{ marginTop: verticalScale(15) }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: verticalScale(20) }}>
          {notifications?.map((item, index) => (
            <NotificationCard item={item} key={index} />
          ))}
        </ScrollView>
      </AppSkeleton>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts?.medium,
    fontSize: moderateScale(15),
    color: Colors?.black,
  },
  label: {
    fontFamily: fonts?.regular,
    fontSize: moderateScale(12),
    color: Colors?.black,
    textAlign: 'center',
    alignSelf: 'flex-end',
    marginTop: verticalScale(10),
  },
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: verticalScale(10),
    gap: scale(5),
  },
});
