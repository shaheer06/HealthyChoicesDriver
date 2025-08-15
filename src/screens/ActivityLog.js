import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppSkeleton from '../components/AppSkeleton';
import Header from '../components/BacKHeader';
import moment from 'moment';
import {moderateScale, scale, verticalScale} from '../utils/helper';
import Colors from '../assets/colors/Color';
import {fonts} from '../assets/fonts/Fonts';
import {mealData} from '../assets/dummyData/dummyData';
import {useQuery} from '@tanstack/react-query';
import {activityLog} from '../services/order';
import {useSelector} from 'react-redux';
import PopUp from '../Popup/PopUp';
import api from '../utils/apiUrl';
import Loader from '../components/Loader';

const ActivityBox = ({item}) => {
  return (
    <View style={styles?.container}>
      <Text style={styles?.meal}>{item?.activity}</Text>
      <Text style={styles?.dish}>{item?.description}</Text>

      <Text style={styles?.date}>{moment(item?.createdAt).format('LLLL')}</Text>
    </View>
  );
};

const ActivityLog = () => {
  const {userData} = useSelector(state => state?.user);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const {
  //   data: activityLog,
  //   isLoading: isLoading,
  //   refetch,
  // }
  // = useQuery({
  //   queryKey: ['orderList', userData?.data?._id],
  //   queryFn: () => activityLog(userData?.data?._id),
  //   enabled: !!userData?.data?._id,
  //   staleTime: 2 * 60 * 1000,
  //   cacheTime: 5 * 60 * 1000,
  //   onSuccess: data => {
  //     console.log(data, 'Dataaaaaa');
  //   },
  //   onError: error => {
  //     console.log(error, 'Error');
  //     PopUp.show('Error', 'error', 3000, 'There is an Error');
  //   },
  // });

  // useEffect(() => {
  //   console.log(activityLog,"hgfvvjmknbnm,")
  //     refetch();
  // }, [refetch]);

  const activityLog = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/api/storefront/driver/activities/${userData?.data?._id}`,
      );
      setData(response?.data?.data);
    } catch (error) {
      console.log(error, 'Error');
      PopUp.show('Error', 'error', 3000, 'There is an Error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    activityLog();
  }, []);
  return (
    <>
      <AppSkeleton disableScroll={true}>
        <Header showText={true} text="Activity Log" />
        <FlatList
          style={{marginTop: verticalScale(10)}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: verticalScale(10),
            paddingBottom: verticalScale(20),
          }}
          data={data}
          keyExtractor={item => item?._id}
          renderItem={({item}) => {
            return <ActivityBox item={item} />;
          }}
        />
      </AppSkeleton>
      <Loader loading={loading} />
    </>
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
    fontSize: moderateScale(16),
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
    textAlign: 'right',
    width: '100%',
  },
});
