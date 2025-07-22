import React from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Colors from '../assets/colors/Color';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, verticalScale } from '../utils/helper';

const AppSkeleton = ({
  children,
  statusBarColor = Colors.orange,
  topBgColor = Colors.orange,
  disableScroll = false,
  statusBarContent = 'light-content',
  style
}) => {
  const insets = useSafeAreaInsets();

  const commonStyle = {
    flex: 1,
    paddingTop: insets.top > verticalScale(10) ? insets.top - verticalScale(8) : insets.top,
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <StatusBar
        barStyle={statusBarContent}
        backgroundColor={statusBarColor}
        translucent={false}
      />

      <View style={{ height: insets.top, backgroundColor: statusBarColor }} />

      {disableScroll ? (
        <View style={styles.container}>{children}</View>
      ) : (
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom:
                insets.bottom > 10 ? insets.bottom - verticalScale(10) : insets.bottom,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={[styles.container, style]}>{children}</View>
        </ScrollView>
      )}
    </View>
  );

};


export default AppSkeleton;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors?.white,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(19),
    // paddingBottom:verticalScale(20)
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});
