import { Alert, PermissionsAndroid, Platform, Linking } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

// Open device settings
const openAppSettings = () => {
  Alert.alert(
    "Permission Required",
    "Please grant permission from Settings to access library and camera.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Open Settings",
        onPress: () => Linking.openSettings(),
      },
    ]
  );
};

// Request Camera Permission
const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs access to your camera',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;

    const isNeverAskAgain = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    if (!isNeverAskAgain) openAppSettings(); // Permission denied permanently
    return false;
  }
  return true;
};

// Request Gallery Permission
const requestGalleryPermission = async () => {
  if (Platform.OS === 'android') {
    const permission = Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(
            permission, {
            title: 'Storage Permission',
            message: 'App needs access to your photo library',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
        }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
}

// Open Camera
export const openCamera = async (callback) => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) return;

  launchCamera(
    {
      mediaType: 'photo',
      cameraType: 'back',
      includeBase64: false,
    },
    (response) => {
      if (response?.didCancel) {
        console.log("User cancelled Camera");
      } else if (response?.errorCode) {
        console.log('Camera error', response?.errorMessage);
      } else {
        callback?.(response?.assets?.[0]);
      }
    }
  );
};

// Open Gallery
export const openGallery = async (callback) => {
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) return;

  launchImageLibrary(
    {
      mediaType: 'photo',
      includeBase64: false,
    },
    (response) => {
      if (response?.didCancel) {
        console.log("User cancelled image picker");
      } else if (response?.errorCode) {
        console.log("Gallery Error", response?.errorMessage);
      } else {
        callback?.(response?.assets?.[0]);
      }
    }
  );
};
