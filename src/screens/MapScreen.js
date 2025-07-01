import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import Icon from '../assets/icon/Icon'
import { scale, verticalScale } from '../utils/helper'
import Colors from '../assets/colors/Color'
import { useNavigation } from '@react-navigation/native'

const MapScreen = () => {
    const navigation=useNavigation();
  return (
    <View>
      <Map/>
      <View style={styles?.btn} >
        <Icon
        family={"Ionicons"}
        name={"return-up-back"}
        onPress={()=>navigation?.goBack()}
        />
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({
    btn:{
        position:"absolute",
        top:verticalScale(50),
        backgroundColor:Colors?.white,
        padding:scale(10),
        borderRadius:scale(5),
        left:scale(15)

    }
})