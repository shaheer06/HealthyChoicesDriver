import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../assets/colors/Color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale, verticalScale} from '../utils/helper';

const AppSkeleton = ({
  children,
  statusBarColor = Colors.orange,
  statusBarContent = 'light-content',
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar
        barStyle={statusBarContent}
        backgroundColor={statusBarColor}
        translucent={false}
      />

      <View style={{height: insets.top, backgroundColor: statusBarColor}} />

      <View style={styles.container}>{children}</View>
    </View>
  );
};

export default AppSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(19),
    // paddingBottom:verticalScale(20)
  },
});
