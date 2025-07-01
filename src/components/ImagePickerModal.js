import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { openCamera, openGallery } from '../utils/imagePicker';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import { fonts } from '../assets/fonts/Fonts';
import Colors from '../assets/colors/Color';
import Icon from '../assets/icon/Icon';


const ImagePickerModal = ({ visible, onClose, onImagePicked }) => {
    const handleCamera = async () => {
        onClose(); // close modal first
        setTimeout(() => {
            openCamera(onImagePicked); // delay allows modal animation to finish
        }, 400); // 300–500ms is safe
    };

    const handleGallery = async () => {
        onClose();
        setTimeout(() => {
            openGallery(onImagePicked);
        }, 400);
    };


    return (
        <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={0.7}
                onPressOut={onClose}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Choose Image</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} >
                        <TouchableOpacity style={styles.option} onPress={handleCamera}>
                            <Icon family={"Entypo"} name={"camera"} size={moderateScale(25)} />
                            <Text style={styles.optionText}>Open Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.option} onPress={handleGallery}>
                            <Icon family={"Entypo"} name={"folder-images"} size={moderateScale(25)} />
                            <Text style={styles.optionText}>Open Gallery</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000055',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        backgroundColor: 'white',
        padding: verticalScale(25),
        borderRadius: scale(20),
        width: "90%"
    },
    title: {
        fontSize: moderateScale(18),
        fontFamily: fonts?.medium,
        textAlign: 'center',
        marginBottom: verticalScale(10),
    },
    option: {
        backgroundColor: Colors?.orange,
        borderRadius: scale(10),
        padding: verticalScale(15),
        marginVertical: verticalScale(6),
        alignItems: 'center',
        width: "46%",
        gap: verticalScale(5)
    },
    optionText: {
        color: Colors?.white,
        textAlign: 'center',
        fontSize: moderateScale(16),
        fontFamily: fonts?.medium
    },
});
