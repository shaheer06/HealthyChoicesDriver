import { useState } from 'react';
import { Alert } from 'react-native';

export const useImageUpload = () => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const addImage = (imageAsset) => {
    if (uploadedImages.length < 3) {
      if (imageAsset?.uri) {
        setUploadedImages([...uploadedImages, imageAsset.uri]);
        Alert.alert('Success', 'Image uploaded successfully!');
      } else {
        Alert.alert('Error', 'Failed to get image. Please try again.');
      }
    } else {
      Alert.alert('Limit Reached', 'You can only upload 3 images maximum.');
    }
  };

  const removeImage = (index) => {
    Alert.alert('Remove Image', 'Are you sure you want to remove this image?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setUploadedImages(uploadedImages.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  const clearImages = () => {
    setUploadedImages([]);
  };

  return {
    uploadedImages,
    addImage,
    removeImage,
    clearImages,
  };
};
