import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppSkeleton from './src/components/AppSkeleton';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabs from './src/navigation/BottomTabs';
import {OrderRequestProvider} from './src/context/OrderRequestContext';
import OrderRequestModal from './src/components/OrderRequestModal';

const Stack = createNativeStackNavigator();
export default function App() {
  const navRef = useNavigationContainerRef();
  return (
    // <OrderRequestProvider>
      <SafeAreaProvider>
        <NavigationContainer 
        // ref={navRef}
        >
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* <OrderRequestModal
        onAccept={(orderData)=>{
          navRef.navigate("BottomTabs"),{
            screen:'Home',
            params:{orderData}
          }
        }}
        /> */}
      </SafeAreaProvider>
    // </OrderRequestProvider>
  );
}
