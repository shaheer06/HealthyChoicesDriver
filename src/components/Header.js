import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import { moderateScale, scale } from '../utils/helper';

const { width, height } = Dimensions.get('window');

const Header = ({
  source,
  title,
  label,
  isImage = true,
  isLabel = true,
  styleView,
  onPress,
}) => {
  const navigation = useNavigation();
  const handleBackPress = () => {
    if (onPress) {
      onPress(); // use custom onPress if provided
    } else {
      navigation.goBack(); // fallback to default
    }
  };
  return (
    <View style={styles?.mainContainer}>
      <TouchableOpacity
        style={styles?.container}
        onPress={handleBackPress}>
        <Image
          source={require('../assets/images/leftArrow.png')}
          style={styles?.img}
        />
      </TouchableOpacity>
      {isImage && (
        <Image
          source={source}
          style={{
            width: moderateScale(180),
            height: moderateScale(175),
            alignSelf: 'center',
          }}
        />
      )}
      {isLabel && (
        <View style={[styleView, { gap: scale(3), alignItems: 'center' }]}>
          <Text style={styles?.heading1}>{title}</Text>
          <Text style={styles?.heading2}>{label}</Text>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  img: {
    width: moderateScale(15),
    height: moderateScale(15),
  },
  container: {},
  mainContainer: {
    gap: scale(30),
    width: '98%',
    alignSelf: 'center',
    zIndex: 100,
  },
  heading1: {
    fontSize: moderateScale(24),
    color: Colors?.black,
    fontFamily: fonts?.bold,
    textAlign: 'center',
  },
  heading2: {
    fontSize: moderateScale(12),
    fontFamily: fonts?.regular,
    color: Colors?.lightGrey,
    textAlign: 'center',
  },
});
