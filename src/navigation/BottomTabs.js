import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { moderateScale, scale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import Home from '../screens/Home';
import Order from '../screens/Order';
import Profile from '../screens/Profile';
import Icon from '../assets/icon/Icon';
import OneTime from '../screens/OneTime';

const Tab = createBottomTabNavigator();
const { height } = Dimensions.get('window');

const BottomTabs = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: insets.bottom > 0 ? insets.bottom : scale(10),
          paddingTop: scale(15),
          // height: 65 + insets.bottom,
          backgroundColor: Colors?.white,
          elevation: 5,
          height: height < 750 ? moderateScale(60) + insets.bottom 
          : moderateScale(70) + insets.bottom,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          // marginTop:height*0.02,
          //   padding: 15,
          // alignSelf: 'center',
          // flex:1
        },
        tabBarIconStyle: {
          width: moderateScale(28),
          height: moderateScale(28),
        },
        tabBarIcon: ({ focused }) => {
          let iconProps = {
            size: moderateScale(28),
            color: focused ? Colors?.orange : Colors?.black,
          };

          switch (route?.name) {
            case 'Home':
              return (
                <Icon
                  family={focused ? "MaterialIcons":'Ionicons'}
                  name={focused ? 'maps-home-work':'home-outline'}
                  {...iconProps}
                />
              );
            case 'Order':
              return (
                <Icon
                  family="Feather"
                  name={focused ? 'book-open' : 'book'}
                  {...iconProps}
                />
              );
              //  case 'OneTime':
              // return (
              //   <Icon
              //     family="MaterialIcons"
              //     name={focused ? 'all-inbox' : 'inbox'}
              //     {...iconProps}
              //   />
              // );
            // case 'Profile':
            //   return (
            //     <Icon
            //       family="MaterialCommunityIcons"
            //       name={focused ? 'storefront' : 'storefront-outline'}
            //       {...iconProps}
            //     />
            //   );
            case 'Profile':
              return (
                <Icon
                  family="FontAwesome"
                  name={focused ? 'user-circle-o' : 'user-circle'}
                  {...iconProps}
                />
              );
             
            default:
              return null;
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Order" component={Order} />
      {/* <Tab.Screen name="OneTime" component={OneTime} /> */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
