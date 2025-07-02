import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import AppSkeleton from '../components/AppSkeleton';

import LocationModal from '../components/LocationModal';
import OrderSection from '../components/OrderSection';
import {moderateScale, scale, verticalScale} from '../utils/helper';
import Colors from '../assets/colors/Color';
import {fonts} from '../assets/fonts/Fonts';
import Icon from '../assets/icon/Icon';
import ImagePickerModal from '../components/ImagePickerModal';
import Header from '../components/BacKHeader';
import CustomButton from '../components/CustomButton';

const OrderDetails = ({route}) => {
  const {orderData} = route?.params || {};
  const [deliveryStatus, setDeliveryStatus] = useState('pending');
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);


  const handleConfirmOrder = () => {
    Alert.alert(
      'Confirm Order',
      'Are you sure you want to confirm this order for delivery?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: () => {
            setDeliveryStatus('confirmed');
            Alert.alert('Success', 'Order confirmed for delivery!');
          },
        },
      ],
    );
  };

  const handleStartDelivery = () => {
    setDeliveryStatus('inProgress');
    Alert.alert('Delivery Started', 'You can now start your delivery journey!');
  };

  const handleCompleteDelivery = () => {
    Alert.alert(
      'Complete Delivery',
      'Are you sure you want to mark this delivery as completed?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Complete',
          onPress: () => {
            setDeliveryStatus('delivered');
            Alert.alert('Success', 'Delivery completed successfully!');
          },
        },
      ],
    );
  };

  const addImage = imageAsset => {
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

  const removeImage = index => {
    Alert.alert('Remove Image', 'Are you sure you want to remove this image?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setUploadedImages(uploadedImages.filter((_, i) => i !== index));
        },
      },
    ]);
  };

  const getStatusColor = status => {
    const colors = {
      pending: Colors.orange,
      confirmed: Colors.verify,
      inProgress: Colors.btnColor,
      delivered: Colors.green,
    };
    return colors[status] || Colors.grey;
  };

  const getStatusText = status => {
    const texts = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      inProgress: 'In Progress',
      delivered: 'Delivered',
    };
    return texts[status] || 'Unknown';
  };

  const renderOrderItem = ({item}) => (
    <View style={styles.orderItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>Rs. {item.price}</Text>
    </View>
  );

  const renderUploadedImage = ({item, index}) => (
    <View style={styles.imageContainer}>
      <Image
        source={{uri: item}}
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

  if (!orderData) {
    return (
      <AppSkeleton>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No order data found</Text>
        </View>
      </AppSkeleton>
    );
  }

 

  return (
    <AppSkeleton>
      <Header />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.orderDetails}>Order Details</Text>
          <View
            style={[
              styles.statusBadge,
              {backgroundColor: getStatusColor(deliveryStatus)},
            ]}>
            <Text style={styles.statusText}>
              {getStatusText(deliveryStatus)}
            </Text>
          </View>
        </View>

        {/* Order Number */}
        <View style={styles.orderNumberContainer}>
          <Text style={styles.orderNumberLabel}>Order No:</Text>
          <Text style={styles.orderNumber}>#{orderData.orderNumber}</Text>
        </View>

        {/* Customer Information */}
        <OrderSection
          icon="user"
          title="Customer Information"
          style={styles.customerInfo}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{orderData.name}</Text>
            <Text style={styles.customerPhone}>{orderData.phone}</Text>
            <Text style={styles.customerAddress}>{orderData.location}</Text>
          </View>
        </OrderSection>

        {/* Location Information */}
        <OrderSection
          icon="location-arrow"
          title="Delivery Location"
          showMapIcon={true}
          onMapPress={() => setShowLocationModal(true)}>
          <Text style={styles.locationText}>{orderData.location}</Text>
        </OrderSection>

        {/* Order Items */}
        <OrderSection icon="shopping-cart" title="Order Items">
          <FlatList
            data={orderData.items}
            renderItem={renderOrderItem}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
          />
        </OrderSection>

        {/* Order Summary */}
        <OrderSection icon="calculator" title="Order Summary">
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>Rs. {orderData.totalAmount}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee:</Text>
            <Text style={styles.summaryValue}>Rs. {orderData.deliveryFee}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>Rs. {orderData.grandTotal}</Text>
          </View>
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentLabel}>Payment Method:</Text>
            <Text style={styles.paymentValue}>{orderData.paymentMethod}</Text>
          </View>
        </OrderSection>

        {/* Special Instructions */}
        {orderData.specialInstructions && (
          <OrderSection icon="info-circle" title="Special Instructions">
            <Text style={styles.instructionsText}>
              {orderData.specialInstructions}
            </Text>
          </OrderSection>
        )}

        {/* Image Upload Section */}
        {deliveryStatus === 'inProgress' && (
          <OrderSection icon="camera" title="Delivery Photos">
            <Text style={styles.uploadText}>
              Upload photos of pickup/delivery ({uploadedImages.length}/3
              images)
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
        )}

        <CustomButton
          onPress={
            deliveryStatus === 'pending'
              ? handleConfirmOrder
              : deliveryStatus === 'confirmed'
              ? handleStartDelivery
              : deliveryStatus === 'inProgress'
              ? handleCompleteDelivery
              : () => {}
          }
          label={
            deliveryStatus === 'pending'
              ? 'Confirm Order'
              : deliveryStatus === 'confirmed'
              ? 'Start Delivery'
              : deliveryStatus === 'inProgress'
              ? 'Complete Delivery'
              : null
          }
          btnStyle={{
            width: '95%',
            borderRadius: scale(5),
            backgroundColor:
              deliveryStatus === 'pending'
                ? Colors?.verify
                : deliveryStatus === 'confirmed'
                ? Colors?.btnColor
                : deliveryStatus === 'inProgress'
                ? Colors?.green
                : Colors?.gray,
            alignSelf: 'center',
          }}
        />
      </ScrollView>

      <ImagePickerModal
        visible={showImageModal}
        onClose={() => setShowImageModal(false)}
        onImagePicked={addImage}
      />

      <LocationModal
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        location={orderData.location}
        coordinates={{lat: orderData.lat, lng: orderData.lng}}
      />
    </AppSkeleton>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  header: {
    backgroundColor: Colors.white,
    width: '100%',
    alignSelf: 'center',
    borderTopLeftRadius: scale(35),
    borderTopRightRadius: scale(35),
    alignItems: 'center',
    borderWidth: 4,
    borderColor: Colors.orange,
    paddingVertical: verticalScale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
  },
  orderDetails: {
    fontFamily: fonts.bold,
    fontSize: moderateScale(22),
    color: Colors.black,
  },
  statusBadge: {
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
    borderRadius: scale(20),
  },
  statusText: {
    color: Colors.white,
    fontFamily: fonts.medium,
    fontSize: moderateScale(12),
  },
  orderNumberContainer: {
    backgroundColor: Colors.greyV4,
    marginHorizontal: scale(5),
    marginTop: verticalScale(20),
    padding: verticalScale(15),
    borderRadius: scale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderNumberLabel: {
    fontSize: moderateScale(16),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  orderNumber: {
    fontSize: moderateScale(18),
    fontFamily: fonts.bold,
    color: Colors.orange,
    marginLeft: scale(5),
  },
  customerInfo: {marginTop: verticalScale(5)},
  customerName: {
    fontSize: moderateScale(16),
    fontFamily: fonts.bold,
    color: Colors.black,
    marginBottom: verticalScale(5),
  },
  customerPhone: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
    marginBottom: verticalScale(5),
  },
  customerAddress: {
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
    color: Colors.black,
    lineHeight: verticalScale(20),
  },
  locationText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
    color: Colors.black,
    lineHeight: verticalScale(20),
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyV4,
  },
  itemInfo: {flex: 1},
  itemName: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  itemQuantity: {
    fontSize: moderateScale(12),
    fontFamily: fonts.regular,
    color: Colors.black,
    marginTop: verticalScale(2),
  },
  itemPrice: {
    fontSize: moderateScale(14),
    fontFamily: fonts.bold,
    color: Colors.orange,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
  },
  summaryLabel: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  summaryValue: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.greyV4,
    marginTop: verticalScale(5),
    paddingTop: verticalScale(10),
  },
  totalLabel: {
    fontSize: moderateScale(16),
    fontFamily: fonts.bold,
    color: Colors.black,
  },
  totalValue: {
    fontSize: moderateScale(16),
    fontFamily: fonts.bold,
    color: Colors.orange,
  },
  paymentMethod: {
    marginTop: verticalScale(10),
    paddingTop: verticalScale(10),
    borderTopWidth: 1,
    borderTopColor: Colors.greyV4,
  },
  paymentLabel: {
    fontSize: moderateScale(14),
    fontFamily: fonts.medium,
    color: Colors.black,
  },
  paymentValue: {
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
    color: Colors.grey,
    marginTop: verticalScale(2),
  },
  instructionsText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
    color: Colors.black,
    lineHeight: verticalScale(20),
    fontStyle: 'italic',
  },
  uploadText: {
    fontSize: moderateScale(12),
    fontFamily: fonts.regular,
    color: Colors.grey,
    marginBottom: verticalScale(10),
  },
  imagesList: {marginBottom: verticalScale(10)},
  imageContainer: {marginRight: scale(10), position: 'relative'},
  uploadedImage: {width: scale(80), height: scale(80), borderRadius: scale(8)},
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
  actionButtons: {
    marginHorizontal: scale(20),
    marginTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  confirmButton: {
    backgroundColor: Colors.verify,
    paddingVertical: verticalScale(15),
    borderRadius: scale(10),
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: Colors.btnColor,
    paddingVertical: verticalScale(15),
    borderRadius: scale(10),
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: Colors.green,
    paddingVertical: verticalScale(15),
    borderRadius: scale(10),
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontFamily: fonts.bold,
    fontSize: moderateScale(16),
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: moderateScale(16),
    fontFamily: fonts.medium,
    color: Colors.grey,
  },
});
