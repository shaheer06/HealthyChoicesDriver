import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../assets/icon/Icon';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import { moderateScale, scale, verticalScale } from '../utils/helper';

const OrderSection = ({
    icon,
    title,
    children,
    onMapPress,
    showMapIcon = false,
}) => {
    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Icon family="FontAwesome" name={icon} size={20} color={Colors.orange} />
                <Text style={styles.sectionTitle}>{title}</Text>
                {showMapIcon && (
                    <TouchableOpacity onPress={onMapPress}>
                        <Icon family="MaterialIcons" name="map" size={20} color={Colors.orange} />
                    </TouchableOpacity>
                )}
            </View>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    section: {
        backgroundColor: Colors.greyV4,
        marginHorizontal: scale(5),
        marginTop: verticalScale(15),
        padding: verticalScale(15),
        borderRadius: scale(10),
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(10),
    },
    sectionTitle: {
        fontSize: moderateScale(16),
        fontFamily: fonts.bold,
        color: Colors.black,
        marginLeft: scale(10),
        flex: 1,
    },
});

export default OrderSection; 