import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View, Dimensions } from 'react-native';
import { moderateScale } from '../utils/helper';

const { width, height } = Dimensions.get('window');

const Loader = ({ loading, size = 180 }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          })
        ])
      ).start();
    } else {
      rotateAnim.stopAnimation();
    }
  }, [loading]);

  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  if (!loading) return null;

  return (
    <View style={styles.overlay}>
      <Animated.Image
        source={require('../assets/images/image2.png')}
        style={{
          width: moderateScale(size),
          height: moderateScale(size),
          transform: [{ rotateY }],
        }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height,
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // optional
    zIndex: 2,
  },
});

export default Loader;
