// helper.js
import {Alert, Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {check, openSettings, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const {width, height} = Dimensions.get('window');

// Base design dimensions (commonly 375x812 for iPhone 11 Pro)
const baseWidth = 375;
const baseHeight = 812;

// Scale based on width
export const scale = size => (width / baseWidth) * size; //for buttons images horizontal padding/margin borderRadius

// Vertical scale based on height
export const verticalScale = size => (height / baseHeight) * size; //for Heights (cards, spacers) Vertical padding/margins Scrollable areas

// Moderate scale for controlled scaling (optional)
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor; //Fonts  Icons  Compact UI element



export const requestLocationPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      let result = await check(permission);

      if (result === RESULTS.DENIED || result === RESULTS.BLOCKED) {
        result = await request(permission);
      }

      if (result === RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to show the map.',
          buttonPositive: 'OK',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
  } catch (error) {
    console.warn('Permission error:', error);
    return false;
  }
};


export const GOOGLE_MAPS_API_KEY = 'AIzaSyD_qcFdAqDGDG6oD2VzJqd8g4sAKMq6iBY';
