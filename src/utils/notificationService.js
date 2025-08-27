import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { navigate } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

class NotificationService {
  constructor() {
    this.unsubscribeForeground = null;
    this.unsubscribeEvent = null;
  }

  async init() {
    await this.requestPermission();
    await this.createNotificationChannel();
    this.listenForegroundNotifications();
    this.listenNotificationEvents();
    this.getFCMToken();
  }

  async requestPermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      console.log(
        granted === PermissionsAndroid.RESULTS.GRANTED
          ? '✅ Android notification permission granted'
          : '❌ Android notification permission denied',
      );
    } else {
      const settings = await notifee.requestPermission();
      console.log('🔔 iOS notification settings:', settings);
    }
  }

  async createNotificationChannel() {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        sound: 'default',
        vibration: true,
        importance: AndroidImportance.HIGH,
      });
    }
  }

  listenForegroundNotifications() {
    this.unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('📬 FCM Foreground Message:', remoteMessage);

      await notifee.displayNotification({
        title: remoteMessage.notification?.title || 'New Notification',
        body: remoteMessage.notification?.body || 'You have a new message',
        android: {
          channelId: 'default',
          importance: AndroidImportance.HIGH,
          sound: 'default',
          pressAction: { id: 'default' },
        },
        ios: {
          sound: 'default',

          // ✅ No badgeCount in foreground
        },
        data: {
          screen: remoteMessage.data?.screen || 'EditProfile',
        },
      });
    });
  }

  listenNotificationEvents() {
    this.unsubscribeEvent = notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        const screen = detail?.notification?.data?.screen;
        if (screen) {
          navigate(screen);
        }
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS) {
        const screen = detail?.notification?.data?.screen;
        if (screen) {
          global.notificationNavigationData = { screen };
        }
      }
    });
  }

  async getFCMToken() {
    try {
      const token = await messaging().getToken();
      await AsyncStorage.setItem('fcmToken', token);
      console.log('📱 FCM Token:', token);
    } catch (err) {
      console.error('❌ Error fetching FCM token:', err);
    }
  }

  cleanup() {
    if (this.unsubscribeForeground) this.unsubscribeForeground();
    if (this.unsubscribeEvent) this.unsubscribeEvent();
  }
}

export default new NotificationService();
