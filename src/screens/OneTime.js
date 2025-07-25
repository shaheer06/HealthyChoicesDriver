import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import AppSkeleton from '../components/AppSkeleton';
import Header from '../components/BacKHeader';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { orderCard } from '../assets/dummyData/dummyData';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import api from '../utils/apiUrl';
import { useSelector } from 'react-redux';
import PopUp from '../Popup/PopUp';
import EmptyComponent from '../components/EmptyComponent';
import Loader from '../components/Loader';
import { useQuery } from '@tanstack/react-query';
import { getOrderList } from '../services/order';

const HistoryTab = ({ onPress, item, isSelected, onLongPress, navigation }) => {
  // const { selected } = useSelector(state => state?.language);
  const fullAddress = [
    item?.customerId?.address?.home?.flat_house_no,
    item?.customerId?.address?.home?.road_building,
    item?.customerId?.address?.home?.block,
    item?.customerId?.address?.home?.city,
    item?.customerId?.address?.home?.governorate,
    // item?.home?.additionalNotes,
  ]
    .filter(Boolean) // Removes null/undefined/empty strings
    .join(', ');
  return (
    <View style={[styles.cardWrapper, isSelected && styles.selectedBackground]}>
      <TouchableOpacity
        onLongPress={onLongPress}
        style={[
          styles.card,
          isSelected &&
          {
            // backgroundColor: 'rgba(55, 160, 0, 0.1)', // light orange with opacity
            // borderColor: Colors.orange,
            // borderWidth: 1,
            // borderLeftWidth: isSelected ? 6 : 4,
            // borderLeftColor: isSelected ? Colors.orange : Colors.greyV2,
          },
        ]}
        onPress={onPress}>
        <Text style={styles?.order}>
          Order No# <Text style={styles?.orderNumber}>{item?.orderNumber}</Text>
        </Text>
        <Text style={styles?.customer}>
          Customer Name:{' '}
          <Text style={styles?.name}>{item?.customerId?.name}</Text>
        </Text>
        <Text style={styles?.customer}>
          Location: <Text style={styles?.location}>{fullAddress}</Text>
        </Text>
        <Text style={styles?.customer}>
          Contact: <Text style={styles?.type}>{item?.customerId?.mobile}</Text>
        </Text>
        <Text
          onPress={() => navigation?.navigate('MapScreen', { orderData: item })}
          style={styles?.map}>
          View Map
        </Text>
      </TouchableOpacity>
      {/* <View style={styles?.separator} /> */}
    </View>
  );
};

const OneTime = () => {
  const [selected, setSelected] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [check, setCheck] = useState(false);
  const [selected2, setSelected2] = useState([]);
  const [selectionMode2, setSelectionMode2] = useState(false);
  const [check2, setCheck2] = useState(false);
  const navigation = useNavigation();
  console.log(orderData, 'OrderData');
  // const [loading, setLoading] = useState(false);
  const { userData } = useSelector(state => state?.user);
  // console.log("User Data",userData?.data?._id)

  // const handleCheck = () => {
  //   setCheck(prev => {
  //     const next = !prev;
  //     if (next) {
  //       const allIds = orderCard?.map(item => item?._id);
  //       setSelected(allIds);
  //       setSelectionMode(true);
  //     } else {
  //       setSelected([]);
  //       setSelectionMode(false);
  //     }
  //     return next;
  //   });
  // };

  const handleSelect = (id, isLongPress = false) => {
    if (isLongPress && !selectionMode) {
      setSelectionMode(true);
    }

    if (!selectionMode && !isLongPress) return;

    setSelected(prev => {
      let newSelected;
      if (prev?.includes(id)) {
        newSelected = prev.filter(item => item !== id);
      } else {
        newSelected = [...prev, id];
      }

      if (newSelected.length === 0) {
        setSelectionMode(false);
      }

      const allIds = orderCard.map(item => item._id);
      const allSelected = allIds.every(id => newSelected.includes(id));
      setCheck(allSelected);

      return newSelected;
    });
  };

  const { data: orderData, isLoading: isLoadingOrders, refetch } = useQuery({
    queryKey: ['orderList', userData?.data?._id],
    queryFn: () => getOrderList(userData?.data?._id),
    enabled: !!userData?.data?._id,
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    onSuccess: (data) => {
      console.log(data, 'Dataaaaaa');
    },
    onError: (error) => {
      console.log(error, 'Error');
      PopUp.show('Error', 'error', 3000, 'There is an Error');
    },
  })

  useFocusEffect(
    useCallback(() => {
      if (userData?.data?._id) {
        refetch();
      }
    }, [refetch, userData?.data?._id]),
  );

  return (
    <>
      <AppSkeleton disableScroll={true}>
        <Header showText={true} text="One Time Orders" />
        <FlatList
          scrollEnabled={true}
          data={orderData?.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?._id}
          style={{
            padding: verticalScale(1),
            marginTop: verticalScale(15),
          }}
          renderItem={({ item, index }) => (
            <HistoryTab
              item={item}
              onPress={() =>
                selectionMode
                  ? handleSelect(item?.data?._id)
                  : navigation?.navigate('OrderDetails', { orderData: item?.data })
              }
              onLongPress={() => handleSelect(item?.data?._id, true)}
              isSelected={selected?.includes(item?.data?._id)}
              navigation={navigation}
            />
          )}
          ListEmptyComponent={() => {
            return <EmptyComponent />;
          }}
          contentContainerStyle={{
            paddingBottom:
              selected.length > 0 ? verticalScale(90) : verticalScale(45),
            gap: verticalScale(20),
          }}
        />
      </AppSkeleton>
      <Loader loading={isLoadingOrders} />
    </>
  );
};

export default OneTime;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    padding: scale(10),
    // flex: 1,
    // marginHorizontal: scale(5),
    borderLeftWidth: scale(4),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderLeftColor: Colors?.orange,
    gap: verticalScale(7),
    width: '100%',
    // alignSelf:'center',
  },
  order: {
    fontSize: moderateScale(15),
    fontFamily: fonts?.latoBold,
    color: Colors?.black,
  },
  orderNumber: {
    fontFamily: fonts?.bold,
    color: Colors?.black,
  },
  customer: {
    fontFamily: fonts?.medium,
    fontSize: moderateScale(14),
    color: Colors?.black,
  },
  name: {
    fontFamily: fonts?.bold,
    fontSize: moderateScale(14),
    color: Colors?.orange,
  },
  location: {
    fontFamily: fonts?.regular,
    fontSize: moderateScale(14),
    color: Colors?.black,
  },
  type: {
    color: Colors?.green,
    fontFamily: fonts?.bold,
  },
  map: {
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    color: 'blue',
  },
  cardWrapper: {
    width: '100%',
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    alignSelf: 'center',
  },

  selectedBackground: {
    // backgroundColor: 'rgba(255, 165, 0, 0.15)', // light orange
    borderRadius: scale(12),
    backgroundColor: '#90EE90',
    borderWidth: 1,
    borderColor: Colors?.black,
  },
});
