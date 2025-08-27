import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AppSkeleton from '../components/AppSkeleton';
import moment from 'moment';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import Header from '../components/BacKHeader';
import CustomInput from '../components/CustomInput';
import EmptyComponent from '../components/EmptyComponent';
import { useEffect } from 'react';
import { getOrderHistory } from '../services/order';
import { useSelector } from 'react-redux';

const OrderBox = ({ item }) => {
  return (
    <View style={styles?.container}>
      <Text style={styles?.orderId}>{item?.orderNo}</Text>
      <Text
        style={[
          styles?.meal,
          {
            color:
              item.status === 'delivered'
                ? Colors?.verify
                : item.status === 'cancelled'
                  ? Colors?.notValid
                  : item.status === 'returned'
                    ? Colors?.btnColor
                    : item.status === 'out for delivery'
                      ? Colors?.green
                      : null,
          },
        ]}>
        {item?.status}
      </Text>
      <Text>
        Customer Name: <Text style={styles?.name}>{item?.customerId?.name}</Text>
      </Text>
      <Text>
        Menu ={' '}
        <Text style={styles?.dish}>
          {/* {item?.items.map(i => `${i.name} x${i.quantity}`).join(', ')} */}
          {item?.meal}
        </Text>
      </Text>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text>Delivered At: </Text>

        <Text style={styles?.date}>{moment(item?.date).format('LLLL')}</Text>
      </View>
      {/* <View style={{flexDirection: 'row', gap: scale(2), alignItems: 'center'}}>
        <Text>Payment Method:</Text>
        <Text style={styles?.name}>{item?.paymentMethod}</Text>
      </View> */}
      {/* <Text>
        Total Amount:{' '}
        <Text style={styles?.name}>{`BHD ${item?.totalAmount}`}</Text>
      </Text> */}
      <Text>
        Location:{" "}
        <Text style={styles?.location}>
          {item?.customerId?.address?.home?.road_building},{" "}
          {item?.customerId?.address?.home?.flat_house_no},{" "}
          {item?.customerId?.address?.home?.governorateId?.name},{" "}
          {item?.customerId?.address?.home?.cityId?.name},{" "}
          {item?.customerId?.address?.home?.blockId?.name}
        </Text>
      </Text>
    </View>
  );
};

const OrderHistory = () => {
  const [searchText, setSearchText] = useState('');
  const { userData } = useSelector(state => state?.user);
  const [orderHistory, setOrderHistory] = useState([]);
  const orderHistoryData = async () => {
    const response = await getOrderHistory(userData?.data?._id);
    setOrderHistory(response?.data);
    console.log(response, 'Response');
  };
  useEffect(() => {
    orderHistoryData();
  }, []);


  return (
    <AppSkeleton disableScroll={true}>
      <Header showText={true} text="Order History" />
      <CustomInput
        placeholder={'Serch from date or month'}
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={orderHistory}
        style={{ marginTop: verticalScale(10) }}
        contentContainerStyle={{
          gap: verticalScale(10),
          paddingBottom: verticalScale(20),
        }}
        ListEmptyComponent={<EmptyComponent />}
        keyExtractor={item => item?._id}
        renderItem={({ item }) => {
          return <OrderBox item={item} />;
        }}
      />
    </AppSkeleton>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({
  container: {
    padding: verticalScale(15),
    borderWidth: 1.5,
    borderColor: Colors?.orange,
    gap: verticalScale(5),
    borderStyle: 'dashed',
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
    borderBottomLeftRadius: scale(20),
  },
  meal: {
    fontFamily: fonts?.bold,
    fontSize: moderateScale(16),
    textTransform: 'capitalize',
  },
  dish: {
    fontFamily: fonts?.bold,
    color: Colors?.black,
    fontSize: moderateScale(15),
    // fontStyle:"italic"
  },
  name: {
    fontFamily: fonts?.bold,
    color: Colors?.black,
    fontSize: moderateScale(16),
  },
  date: {
    fontFamily: fonts?.bold,
    color: Colors?.black,
    fontSize: moderateScale(14),
  },
  orderId: {
    textAlign: 'center',
    color: Colors?.black,
    fontFamily: fonts?.latoBold,
    fontSize: moderateScale(15),
    textDecorationLine: 'underline',
  },
  location: {
    fontFamily: fonts?.bold,
    color: Colors?.black,
    fontSize: moderateScale(14),
  },
});
