import React from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fonts } from '../assets/fonts/Fonts';
import Colors from '../assets/colors/Color';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Icon from '../assets/icon/Icon';

const { width, height } = Dimensions.get('window');

const Header = ({
  type = 1,
  text = '',
  showText = false,
  onHamburgerPress = () => { },
  onLocationPress = () => { },
  styleContainer,
  text3,
  iconColor,
  color,
  locationText = 'Current Location',
}) => {
  const navigation = useNavigation();

  const renderBackArrow = () => (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.iconWrapper}>
      {/* <Image
        source={require('../assets/images/leftArrow.png')}
        style={[styles.icon,iconStyle]}
      /> */}
      <Icon
        family={'AntDesign'}
        name={'left'}
        size={moderateScale(20)}
        color={iconColor}
      />
    </TouchableOpacity>
  );

  const renderHamburger = () => (
    <TouchableOpacity onPress={onHamburgerPress} style={styles.iconWrapper}>
      {/* <Image
        source={require('../assets/images/leftArrow.png')}
        style={styles.icon}
      /> */}
      <Icon
        family={'Feather'}
        name={'menu'}
        size={moderateScale(24)}
        color={color}
      />
    </TouchableOpacity>
  );

  const renderLocation = () => (
    <TouchableOpacity onPress={onLocationPress} style={styles.locationWrapper}>
      <Icon
        family={'Feather'}
        name={'map-pin'}
        size={moderateScale(16)}
        color={Colors?.white}
      />
      <Text style={styles.locationText} numberOfLines={1}>
        {locationText}
      </Text>
      {/* <Icon
        family={'Feather'}
        name={'chevron-down'}
        size={moderateScale(14)}
        color={Colors?.white}
      /> */}
    </TouchableOpacity>
  );

  // Type 1: Back arrow (left), optional text (center)
  if (type === 1) {
    return (
      <View style={[styles.container1, styleContainer]}>
        {renderBackArrow()}
        {showText && (
          <View style={styles.centerTextWrapper}>
            <Text style={[styles.text, { color: color }]}>{text}</Text>
          </View>
        )}
      </View>
    );
  }

  // Type 2: Location (left) + Center title + right hamburger
  if (type === 2) {
    return (
      <View style={[styles.container, styleContainer]}>
        {renderLocation()}
        <View style={styles.centerTextWrapper}>
          <Text style={[styles.text, { color: Colors?.white }]}>{text}</Text>
        </View>
        {renderHamburger()}
      </View>
    );
  }

  // Type 3: Left arrow + center title + right hamburger
  if (type === 3) {
    return (
      <View style={[styles.container2, styleContainer]}>
        {/* {renderBackArrow()} */}
        <Text style={[styles?.text, text3]}>{text}</Text>
        {/* {renderHamburger()} */}
      </View>
    );
  }

  if (type === 4) {
    return (
      <View style={[styles.container1, styleContainer]}>
        {/* {renderBackArrow()} */}
        {showText && (
          <View style={styles.centerTextWrapper}>
            <Text style={styles.text}>{text}</Text>
          </View>
        )}
      </View>
    );
  }
  return null;
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    position: 'relative',
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(10),
    alignItems: 'center',
    justifyContent:"center"
  },
  iconWrapper: {
    zIndex: 100,
  },
  icon: {
    width: moderateScale(18),
    height: moderateScale(18),
    resizeMode: 'contain',
  },
  centerTextWrapper: {
    position: 'absolute',
    left: scale(0),
    right: scale(0),
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    fontSize: moderateScale(14),
    color: Colors?.white,
    fontFamily: fonts?.bold,
    textAlign: 'center',
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: scale(80),
    zIndex: 100,
  },
  locationText: {
    fontSize: moderateScale(14),
    color: Colors?.white,
    fontFamily: fonts?.medium,
    marginHorizontal: moderateScale(4),
    flex: 1,
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(10),

  },
});
