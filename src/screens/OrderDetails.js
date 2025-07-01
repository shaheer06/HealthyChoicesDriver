import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppSkeleton from '../components/AppSkeleton';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import Icon from '../assets/icon/Icon';

const OrderDetails = () => {
  return (
    <AppSkeleton>
      <View style={styles?.container} >
        <Text style={styles?.orderDetails} >Order Details</Text>
      </View>
      <View style={styles?.mainContainer} >
        <Text style={styles?.order} >Order No#{' '}
            <Text style={styles?.orderNumber} >HC-1001</Text>
        </Text>
        <View>
            <Text>👤 Customer: Shaheer</Text>
        </View>
      </View>
    </AppSkeleton>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
container:{
    backgroundColor:Colors?.white,
    width:'100%',
    alignSelf:'center',
    borderTopLeftRadius:scale(35),
    borderTopRightRadius:scale(35),
    alignItems:'center',
    borderWidth:4,
    borderColor:Colors?.orange

},
orderDetails:{
    fontFamily:fonts?.bold,
    fontSize:moderateScale(22),
    color:Colors?.black
},
order: {
    fontSize: moderateScale(15),
    fontFamily: fonts?.latoBold,
    color: Colors?.black,
    textAlign:'center'
  },
  orderNumber: {
    fontFamily: fonts?.bold,
    color: Colors?.black,
  },
  mainContainer:{
    borderColor:Colors?.black,
    borderWidth:2,
    padding:verticalScale(8),
    borderRadius:scale(5),
    marginTop:verticalScale(10),
    borderStyle:'dashed'
  }
});
