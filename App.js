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
import OtpScreen from './src/screens/OtpScreen';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  const navRef = useNavigationContainerRef();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PersistGate loading={null} persistor={persistor}>
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
                    <Stack.Screen name="OtpScreen" component={OtpScreen} />
                  </Stack.Navigator>
                </NavigationContainer>
              </SafeAreaProvider>
            </OrderRequestProvider>
          </PersistGate>
        </QueryClientProvider>
      </Provider>
      <Toast />

    </GestureHandlerRootView>
  );
}
