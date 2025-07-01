import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {moderateScale} from '../utils/helper';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
    
        navigation?.replace('LoginScreen');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
        hidden={true}
      />
      <ImageBackground
        source={require('../assets/images/splash.png')}
        resizeMode="cover"
        style={{width: '100%', height: '100%', flex: 1}}>
        {/* <View style={styles?.container}> */}
        <Image
          style={styles?.img}
          source={require('../assets/images/image1.png')}
        />
        <View style={styles?.container}>
          <Animated.Image
            style={[styles?.img2, {opacity: fadeAnim}]}
            source={require('../assets/images/image2.png')}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  img: {
    width: moderateScale(293),
    height: moderateScale(162),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 0.8,
    justifyContent: 'center',
  },
  img2: {
    width: moderateScale(198),
    height: moderateScale(129),
  },
});
