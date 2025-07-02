import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { moderateScale, verticalScale } from '../utils/helper';
import { fonts } from '../assets/fonts/Fonts';

const EmptyComponent = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {showImage && (
        <>
          <Image
            source={require('../assets/images/noData.jpg')}
            style={styles.image}
          // resizeMode="contain"
          />
          <Text style={styles.text}>NO DATA FOUND</Text>
        </>
      )}
    </View>
  );
};

export default EmptyComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: moderateScale(300),
  },
  text: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(25),
    fontFamily: fonts?.bold,
  },
});
