import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppSkeleton from '../components/AppSkeleton';
import Header from '../components/BacKHeader';
import moment from 'moment';
import {moderateScale, scale, verticalScale} from '../utils/helper';
import Colors from '../assets/colors/Color';
import {fonts} from '../assets/fonts/Fonts';
import {mealData} from '../assets/dummyData/dummyData';

const ActivityBox = ({item}) => {
  return (
    <View style={styles?.container}>
      <Text style={styles?.meal}>{item?.meal}</Text>
      <Text style={styles?.dish}>{item?.dish}</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles?.name}>{item?.name}</Text>
        <Text style={styles?.date}>{moment(item?.date).format('LLLL')}</Text>
      </View>
    </View>
  );
};

const ActivityLog = () => {
  return (
    <AppSkeleton>
      <Header showText={true} text="Activity Log" />
      <FlatList
      style={{marginTop:verticalScale(10)}}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{gap:verticalScale(10),paddingBottom:verticalScale(20)}}
        data={mealData}
        keyExtractor={item => item?._id}
        renderItem={({item}) => {
          return <ActivityBox item={item} />;
        }}
      />
    </AppSkeleton>
  );
};

export default ActivityLog;

const styles = StyleSheet.create({
  container: {
    // elevation:2,
    padding: verticalScale(15),
    borderWidth: 1,
    borderColor: Colors?.black,
    borderRadius: scale(10),

    gap: verticalScale(5),
  },
  meal: {
    fontFamily: fonts?.bold,
    color: Colors?.black,
    fontSize: moderateScale(18),
  },
  dish: {
    fontFamily: fonts?.robotoMedium,
    color: Colors?.black,
    fontSize: moderateScale(14),
  },
  name: {
    fontFamily: fonts?.bold,
    color: Colors?.orange,
    fontSize: moderateScale(16),
  },
  date: {
    fontFamily: fonts?.bold,
    color: Colors?.black,
    fontSize: moderateScale(12),
  },
});
