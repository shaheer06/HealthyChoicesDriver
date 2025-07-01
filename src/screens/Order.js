import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import AppSkeleton from '../components/AppSkeleton';
import {moderateScale, scale, verticalScale} from '../utils/helper';
import Colors from '../assets/colors/Color';
import {fonts} from '../assets/fonts/Fonts';
import {orderCard} from '../assets/dummyData/dummyData';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
const TAB_WIDTH = (width * 0.916) / 2;

const HistoryTab = ({onPress, item}) => {
  // const { selected } = useSelector(state => state?.language);
  const navigation = useNavigation();
  return (
    <>
      <TouchableOpacity style={[styles.card]} onPress={()=>navigation?.navigate("OrderDetails")}>
        <Text style={styles?.order}>
          Order No# <Text style={styles?.orderNumber}>{item?.orderNumber}</Text>
        </Text>
        <Text style={styles?.customer}>
          Customer Name: <Text style={styles?.name}>{item?.name}</Text>
        </Text>
        <Text style={styles?.customer}>
          Location: <Text style={styles?.location}>{item?.location}</Text>
        </Text>
        <Text style={styles?.customer}>
          Type: <Text style={styles?.type}>{item?.type}</Text>
        </Text>
        <Text
          onPress={() => navigation?.navigate('MapScreen')}
          style={styles?.map}>
          View Map
        </Text>
      </TouchableOpacity>
      {/* <View style={styles?.separator} /> */}
    </>
  );
};

const Order = () => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const handlePress = index => {
    setActiveTab(index);
    Animated.spring(translateX, {
      toValue: index * TAB_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            <FlatList
              scrollEnabled={true}
              data={orderCard}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?._id}
              style={{padding: verticalScale(1), marginTop: verticalScale(10)}}
              renderItem={({item, index}) => <HistoryTab item={item} />}
              contentContainerStyle={{
                paddingBottom: verticalScale(45),
                gap: verticalScale(20),
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <FlatList
              scrollEnabled={true}
              data={orderCard.slice(0, 4)}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?._id}
              style={{padding: verticalScale(1), marginTop: verticalScale(10)}}
              renderItem={({item, index}) => <HistoryTab item={item} />}
              contentContainerStyle={{
                paddingBottom: verticalScale(45),
                gap: verticalScale(20),
              }}
            />
          </>
        );
    }
  };

  return (
    <AppSkeleton>
      {/* <View style={{flex:1}} > */}
      <View style={styles?.tabRow}>
        {['Morning', 'Evening'].map((tab, index) => (
          <TouchableOpacity
            style={styles?.tab}
            key={index}
            onPress={() => handlePress(index)}>
            <Text
              style={[
                styles?.tabText,
                activeTab === index && styles?.activeText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Animated.View style={[styles?.indicator, {transform: [{translateX}]}]} />
      <View style={styles?.tabContainer}>{renderContent()}</View>
      {/* </View> */}
    </AppSkeleton>
  );
};

export default Order;

const styles = StyleSheet.create({
  date: {
    fontFamily: fonts?.regular,
    fontSize: moderateScale(13),
    color: Colors?.black,
  },
  price: {
    fontFamily: fonts?.bold,
    fontSize: moderateScale(13),
    color: Colors?.black,
  },
  tabRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors?.greyV2,
    // backgroundColor:'red',
    alignItems: 'center',
  },
  tab: {
    width: TAB_WIDTH,
    alignItems: 'center',
    paddingVertical: verticalScale(12),
  },
  tabText: {
    fontSize: moderateScale(16),
    color: Colors?.black,
    fontFamily: fonts?.medium,
  },
  activeText: {
    fontFamily: fonts?.bold,
  },
  indicator: {
    height: moderateScale(3),
    width: TAB_WIDTH,
    backgroundColor: Colors?.orange,
  },
  tabContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: verticalScale(12),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    padding: scale(10),
    flex: 1,
    // marginHorizontal: scale(5),
    borderLeftWidth: scale(4),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderLeftColor: Colors?.orange,
    gap: verticalScale(7),
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
});
