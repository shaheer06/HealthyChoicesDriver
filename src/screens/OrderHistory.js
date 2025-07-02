import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import AppSkeleton from '../components/AppSkeleton';
import moment from 'moment';
import {moderateScale, scale, verticalScale} from '../utils/helper';
import Colors from '../assets/colors/Color';
import {fonts} from '../assets/fonts/Fonts';
import Header from '../components/BacKHeader';
import {orderHistory} from '../assets/dummyData/dummyData';
import CustomInput from '../components/CustomInput';
import EmptyComponent from '../components/EmptyComponent';

const OrderBox = ({item}) => {
  return (
    <View style={styles?.container}>
      <Text style={styles?.orderId}>{item?.orderId}</Text>
      <Text
        style={[
          styles?.meal,
          {
            color:
              item.status === 'Delivered'
                ? Colors?.verify
                : item.status === 'Cancelled'
                ? Colors?.notValid
                : item.status === 'Returned'
                ? Colors?.btnColor
                : item.status === 'Out for Delivery'
                ? Colors?.green
                : null,
          },
        ]}>
        {item?.status}
      </Text>
      <Text>
        Customer Name: <Text style={styles?.name}>{item?.customerName}</Text>
      </Text>
      <Text>
        Menu ={' '}
        <Text style={styles?.dish}>
          {item?.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
        </Text>
      </Text>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text>Delivered At: </Text>

        <Text style={styles?.date}>{moment(item?.date).format('LLLL')}</Text>
      </View>
      <View style={{flexDirection: 'row', gap: scale(2), alignItems: 'center'}}>
        <Text>Payment Method:</Text>
        <Text style={styles?.name}>{item?.paymentMethod}</Text>
      </View>
      <Text>
        Total Amount:{' '}
        <Text style={styles?.name}>{`BHD ${item?.totalAmount}`}</Text>
      </Text>
      <Text>
        Location: <Text style={styles?.name}>{`${item?.location}`}</Text>
      </Text>
    </View>
  );
};



const OrderHistory = () => {
  const [searchText, setSearchText] = useState('');


  const filteredOrders = orderHistory.filter(item => {
  const formattedDate = moment(item.date).format('YYYY-MM-DD'); // '2025-07-01'
  const input = searchText?.toLowerCase().trim();

  // Try to parse things like "1 July" or "01 July"
  const parsedInput = moment(input, ['D MMMM', 'DD MMMM', 'YYYY-MM-DD'], true);

  if (parsedInput.isValid()) {
    // Format input to 'YYYY-MM-DD' to match item.date
    return formattedDate === parsedInput?.format('YYYY-MM-DD');
  }

  // fallback to substring matching (e.g., for 'july')
  const month = moment(item.date).format('MMMM').toLowerCase(); // 'july'
  const day = moment(item.date).format('D'); // '1'

  return (
    formattedDate.includes(input) ||
    month.includes(input) ||
    day === input
  );
});

  return (
    <AppSkeleton>
      <Header showText={true} text="Order History" />
      <CustomInput
      placeholder={"Serch from date or month"}
      value={searchText}
      onChangeText={setSearchText}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredOrders}
        style={{marginTop: verticalScale(10)}}
        contentContainerStyle={{
          gap: verticalScale(10),
          paddingBottom: verticalScale(20),
        }}
        ListEmptyComponent={<EmptyComponent/>}
        keyExtractor={item => item?._id}
        renderItem={({item}) => {
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
});
