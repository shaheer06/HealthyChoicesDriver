// components/Icon.js
import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { moderateScale } from '../../utils/helper';

const iconFamilies = {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Feather,
  Entypo,
  AntDesign,
  FontAwesome5,
  EvilIcons,
  Foundation,
  Octicons,
  SimpleLineIcons,
  MaterialCommunityIcons,
  FontAwesome6
};

const Icon = ({
  family,
  name,
  size = moderateScale(24),
  color = 'black',
  style,
  onPress
}) => {
  const IconComponent = iconFamilies[family];
  if (!IconComponent || !name) return null;

  const iconElement = (
    <IconComponent name={name} size={size} color={color} style={style} />
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {iconElement}
    </TouchableOpacity>
  ) : (
    iconElement
  );
};

export default Icon;
