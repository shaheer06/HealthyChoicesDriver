import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import SplashScreen from './src/screens/SplashScreen';
import BottomTabs from './src/navigation/BottomTabs';
import { OrderRequestProvider } from './src/context/OrderRequestContext';
import OrderRequestModal from './src/components/OrderRequestModal';
import MapScreen from './src/screens/MapScreen';
import OrderDetails from './src/screens/OrderDetails';
import ActivityLog from './src/screens/ActivityLog';
import OrderHistory from './src/screens/OrderHistory';
import ProfileDetail from './src/screens/ProfileDetail';
import Notification from './src/screens/Notification';
import ChangeNumber from './src/screens/ChangeNumber';
import Chat from './src/screens/Chat';
const Stack = createNativeStackNavigator();

export default function App() {
  const navRef = useNavigationContainerRef();

  return (
    <OrderRequestProvider>
      <SafeAreaProvider>
        <NavigationContainer ref={navRef}>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="OrderDetails" component={OrderDetails} />
            <Stack.Screen name="ActivityLog" component={ActivityLog} />
            <Stack.Screen name="OrderHistory" component={OrderHistory} />
            <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="ChangeNumber" component={ChangeNumber} />
            <Stack.Screen name="BottomTabs" component={BottomTabs} />
            <Stack.Screen name="Chat" component={Chat} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </OrderRequestProvider>
  );
}
