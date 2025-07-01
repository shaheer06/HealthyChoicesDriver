import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from '../assets/icon/Icon';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import { moderateScale, scale, verticalScale } from '../utils/helper';

const { width } = Dimensions.get('window');

const LocationModal = ({ visible, onClose, location, coordinates }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Delivery Location</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon family="AntDesign" name="close" size={24} color={Colors.black} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        <View style={styles.mapPlaceholder}>
                            <Icon family="MaterialIcons" name="map" size={50} color={Colors.grey} />
                            <Text style={styles.mapText}>Map View</Text>
                            <Text style={styles.locationText}>{location}</Text>
                            <Text style={styles.coordinatesText}>
                                Lat: {coordinates?.lat}, Long: {coordinates?.lng}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderRadius: scale(15),
        width: width * 0.9,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: verticalScale(20),
        borderBottomWidth: 1,
        borderBottomColor: Colors.greyV4,
    },
    modalTitle: {
        fontSize: moderateScale(18),
        fontFamily: fonts.bold,
        color: Colors.black,
    },
    modalBody: {
        padding: verticalScale(20),
    },
    mapPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.greyV4,
        height: verticalScale(200),
        borderRadius: scale(10),
    },
    mapText: {
        fontSize: moderateScale(16),
        fontFamily: fonts.medium,
        color: Colors.grey,
        marginTop: verticalScale(10),
    },
    locationText: {
        fontSize: moderateScale(14),
        fontFamily: fonts.medium,
        color: Colors.black,
        marginTop: verticalScale(10),
        textAlign: 'center',
        paddingHorizontal: scale(20),
    },
    coordinatesText: {
        fontSize: moderateScale(12),
        fontFamily: fonts.regular,
        color: Colors.grey,
        marginTop: verticalScale(5),
    },
});

export default LocationModal; 