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

const ImageUploadModal = ({ visible, onClose, onCameraPress, onGalleryPress }) => {
    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Upload Photo</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon family="AntDesign" name="close" size={24} color={Colors.black} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalBody}>
                        <TouchableOpacity style={styles.cameraButton} onPress={onCameraPress}>
                            <Icon family="FontAwesome" name="camera" size={30} color={Colors.orange} />
                            <Text style={styles.cameraButtonText}>Take Photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.galleryButton} onPress={onGalleryPress}>
                            <Icon family="FontAwesome" name="image" size={30} color={Colors.orange} />
                            <Text style={styles.galleryButtonText}>Choose from Gallery</Text>
                        </TouchableOpacity>
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
    cameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.greyV4,
        paddingVertical: verticalScale(15),
        borderRadius: scale(10),
        marginBottom: verticalScale(15),
    },
    cameraButtonText: {
        fontSize: moderateScale(16),
        fontFamily: fonts.medium,
        color: Colors.black,
        marginLeft: scale(10),
    },
    galleryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.greyV4,
        paddingVertical: verticalScale(15),
        borderRadius: scale(10),
    },
    galleryButtonText: {
        fontSize: moderateScale(16),
        fontFamily: fonts.medium,
        color: Colors.black,
        marginLeft: scale(10),
    },
});

export default ImageUploadModal; 