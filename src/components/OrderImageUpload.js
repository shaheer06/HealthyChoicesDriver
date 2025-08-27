import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import OrderSection from './OrderSection';
import Icon from '../assets/icon/Icon';

const OrderImageUpload = ({ 
  deliveryStatus, 
  uploadedImages, 
  addImage, 
  removeImage, 
  setShowImageModal 
}) => {
  const renderUploadedImage = ({ item, index }) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: item }}
        style={styles.uploadedImage}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={styles.removeImageButton}
        onPress={() => removeImage(index)}>
        <Icon family="AntDesign" name="close" size={16} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  if (deliveryStatus !== 'inProgress') {
    return null;
  }

  return (
    <OrderSection icon="camera" title="Delivery Photos">
      <Text style={styles.uploadText}>
        Upload photos of pickup/delivery ({uploadedImages.length}/3 images)
      </Text>
      {uploadedImages.length > 0 && (
        <FlatList
          data={uploadedImages}
          renderItem={renderUploadedImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.imagesList}
        />
      )}
      {uploadedImages.length < 3 && (
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => setShowImageModal(true)}>
          <Icon
            family="FontAwesome"
            name="plus"
            size={20}
            color={Colors.white}
          />
          <Text style={styles.uploadButtonText}>Add Photo</Text>
        </TouchableOpacity>
      )}
      {uploadedImages.length === 3 && (
        <Text style={styles.maxImagesText}>Maximum images reached</Text>
      )}
    </OrderSection>
  );
};

const styles = StyleSheet.create({
  uploadText: {
    fontSize: moderateScale(12),
    fontFamily: fonts.regular,
    color: Colors.grey,
    marginBottom: verticalScale(10),
  },
  imagesList: { marginBottom: verticalScale(10) },
  imageContainer: { marginRight: scale(10), position: 'relative' },
  uploadedImage: { width: scale(80), height: scale(80), borderRadius: scale(8) },
  removeImageButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: Colors.red,
    borderRadius: scale(10),
    width: scale(20),
    height: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.orange,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    alignSelf: 'flex-start',
  },
  uploadButtonText: {
    color: Colors.white,
    fontFamily: fonts.medium,
    fontSize: moderateScale(14),
    marginLeft: scale(5),
  },
  maxImagesText: {
    fontSize: moderateScale(12),
    fontFamily: fonts.medium,
    color: Colors.orange,
    textAlign: 'center',
    marginTop: verticalScale(5),
  },
});

export default OrderImageUpload;
