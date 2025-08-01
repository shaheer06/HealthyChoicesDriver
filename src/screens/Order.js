import {
  Alert,
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
import Icon from '../assets/icon/Icon';
import CustomButton from '../components/CustomButton';

const {width, height} = Dimensions.get('window');
const TAB_WIDTH = (width * 0.916) / 2;

const HistoryTab = ({onPress, item, isSelected, onLongPress, navigation}) => {
  // const { selected } = useSelector(state => state?.language);

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
          Customer Name: <Text style={styles?.name}>{item?.name}</Text>
        </Text>
        <Text style={styles?.customer}>
          Location: <Text style={styles?.location}>{item?.location}</Text>
        </Text>
        <Text style={styles?.customer}>
          Type: <Text style={styles?.type}>{item?.type}</Text>
        </Text>
        <Text
          onPress={() => navigation?.navigate('MapScreen', {orderData: item})}
          style={styles?.map}>
          View Map
        </Text>
      </TouchableOpacity>
      {/* <View style={styles?.separator} /> */}
    </View>
  );
};

const Order = () => {
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const [selected, setSelected] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
  const [check, setCheck] = useState(false);
  const [selected2, setSelected2] = useState([]);
  const [selectionMode2, setSelectionMode2] = useState(false);
  const [check2, setCheck2] = useState(false);
  const navigation = useNavigation();

  const handleCheck = () => {
    setCheck(prev => {
      const next = !prev;
      if (next) {
        const allIds = orderCard?.map(item => item?._id);
        setSelected(allIds);
        setSelectionMode(true);
      } else {
        setSelected([]);
        setSelectionMode(false);
      }
      return next;
    });
  };

  const handleCheck2 = () => {
    setCheck2(prev => {
      const next = !prev;
      if (next) {
        const allIds = orderCard?.map(item => item?._id);
        setSelected2(allIds);
        setSelectionMode2(true);
      } else {
        setSelected2([]);
        setSelectionMode2(false);
      }
      return next;
    });
  };

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

  const handleSelect2 = (id, isLongPress = false) => {
    if (isLongPress && !selectionMode2) {
      setSelectionMode2(true);
    }

    if (!selectionMode2 && !isLongPress) return;

    setSelected2(prev => {
      let newSelected;
      if (prev.includes(id)) {
        newSelected = prev.filter(item => item !== id);
      } else {
        newSelected = [...prev, id];
      }

      if (newSelected.length === 0) {
        setSelectionMode2(false);
      }

      const allIds = orderCard.slice(0, 4).map(item => item._id);
      const allSelected = allIds.every(id => newSelected.includes(id));
      setCheck2(allSelected);

      return newSelected;
    });
  };

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
            {selected?.length > 0 && (
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: verticalScale(10),
                    // alignSelf:'flex-end'
                  }}>
                  <Icon
                    family={'MaterialIcons'}
                    name={check ? 'check-box' : 'check-box-outline-blank'}
                    size={moderateScale(20)}
                    onPress={handleCheck}
                    color={check ? Colors?.selectionColor : Colors?.black}
                  />
                  <Text>{check ? 'Unselect All' : 'Select All'}</Text>
                </View>
                <CustomButton
                  label={'Complete Order'}
                  btnStyle={{
                    width: '50%',
                    backgroundColor: Colors?.green,
                    paddingVertical: verticalScale(10),
                  }}
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are you sure you want to complete orders?',
                      [
                        {
                          text: 'No',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Yes',
                          onPress: () => {
                            setSelected([]);
                            setCheck(false);
                            setSelectionMode(false);
                            console.log('Orders completed');
                          },
                        },
                      ],
                      {cancelable: true},
                    );
                  }}
                />
              </View>
            )}
            <FlatList
              scrollEnabled={true}
              data={orderCard}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?._id}
              style={{
                padding: verticalScale(1),
                marginTop: verticalScale(10),
              }}
              renderItem={({item, index}) => (
                <HistoryTab
                  item={item}
                  onPress={
                    () => (selectionMode ? handleSelect(item._id) : null)
                    // navigation?.navigate('OrderDetails', {orderData: item})
                  }
                  onLongPress={() => handleSelect(item._id, true)}
                  isSelected={selected?.includes(item._id)}
                  navigation={navigation}
                />
              )}
              contentContainerStyle={{
                paddingBottom:
                  selected.length > 0 ? verticalScale(90) : verticalScale(45),
                gap: verticalScale(20),
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            {selected2?.length > 0 && (
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: verticalScale(10),
                    // alignSelf:'flex-end'
                  }}>
                  <Icon
                    family={'MaterialIcons'}
                    name={check2 ? 'check-box' : 'check-box-outline-blank'}
                    size={moderateScale(20)}
                    onPress={handleCheck2}
                    color={check2 ? Colors?.selectionColor : Colors?.black}
                  />
                  <Text>{check2 ? 'Unselect All' : 'Select All'}</Text>
                </View>
                <CustomButton
                  label={'Complete Order'}
                  btnStyle={{
                    width: '50%',
                    backgroundColor: Colors?.green,
                    paddingVertical: verticalScale(10),
                  }}
                  onPress={() => {
                    Alert.alert(
                      'Confirmation',
                      'Are you sure you want to complete orders?',
                      [
                        {
                          text: 'No',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'Yes',
                          onPress: () => {
                            setSelected2([]);
                            setCheck2(false);
                            setSelectionMode2(false);
                            console.log('Orders completed');
                          },
                        },
                      ],
                      {cancelable: true},
                    );
                  }}
                />
              </View>
            )}
            <FlatList
              scrollEnabled={true}
              data={orderCard.slice(0, 4)}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?._id}
              style={{padding: verticalScale(1), marginTop: verticalScale(10)}}
              renderItem={({item, index}) => (
                <HistoryTab
                  item={item}
                  onPress={
                    () => (selectionMode2 ? handleSelect2(item._id) : null)
                    // navigation?.navigate('OrderDetails', { orderData: item })
                  }
                  onLongPress={() => handleSelect2(item._id, true)}
                  isSelected={selected2?.includes(item._id)}
                  navigation={navigation}
                />
              )}
              contentContainerStyle={{
                paddingBottom:
                  selected2?.length > 0 ? verticalScale(90) : verticalScale(45),
                gap: verticalScale(20),
              }}
            />
          </>
        );
    }
  };

  return (
    <AppSkeleton disableScroll={true}>
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
    width: '100%',
    alignSelf: 'center',
    marginTop: verticalScale(12),
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: scale(16),
    padding: scale(10),
    // flex: 1,
    // marginHorizontal: scale(5),
    borderLeftWidth: scale(4),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
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
