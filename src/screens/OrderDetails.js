import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import api from '../utils/apiUrl';

const OrderDetails = ({route}) => {
  const {orderData} = route?.params || {};
  // console.log(orderData?._id,
  //   "Order DAtaa"
  // )
  const [deliveryStatus, setDeliveryStatus] = useState('Pending');
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const navigation = useNavigation();

  const STATUS = {
    PENDING: 'Pending',
    READY_FOR_DELIVERY: 'Ready For Delivery',
    IN_PROGRESS: 'Delivery Inbound',
    DELIVERED: 'Delivered',
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await api.post(
        `/api/storefront/driver-orders/orders/${orderId}`,
        {status},
      );
      console.log("Status",status)
      return response?.data;
    } catch (error) {
      console.error('Error updating order status:', error?.response?.data);
    }
  };

  useEffect(() => {
    if (orderData?._id) {
      updateOrderStatus(orderData._id, STATUS.PENDING)
        .then(() => setDeliveryStatus(STATUS.PENDING))
        .catch(() => Alert.alert('Error', 'Failed to set order as pending'));
    }
  }, []);

  const handleConfirmOrder = () => {
    Alert.alert(
      'Confirm Order',
      'Are you sure you want to confirm this order for delivery?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Confirm',
          onPress: async () => {
            try {
              await updateOrderStatus(orderData._id, STATUS.READY_FOR_DELIVERY);
              setDeliveryStatus(STATUS.READY_FOR_DELIVERY);
              Alert.alert('Success', 'Order confirmed for delivery!');
            } catch {
              Alert.alert('Error', 'Failed to confirm order.');
            }
          },
        },
      ],
    );
  };

  const handleStartDelivery = async () => {
    try {
      await updateOrderStatus(orderData._id, STATUS.IN_PROGRESS);
      setDeliveryStatus(STATUS.IN_PROGRESS);
      Alert.alert(
        'Delivery Started',
        'You can now start your delivery journey!',
      );
    } catch {
      Alert.alert('Error', 'Failed to start delivery.');
    }
  };

  const handleCompleteDelivery = () => {
    Alert.alert(
      'Complete Delivery',
      'Are you sure you want to mark this delivery as completed?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Complete',
          onPress: async () => {
            try {
              await updateOrderStatus(orderData._id, STATUS.DELIVERED);
              setDeliveryStatus(STATUS.DELIVERED);
              Alert.alert('Success', 'Delivery completed successfully!');
            } catch {
              Alert.alert('Error', 'Failed to complete delivery.');
            }
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
      [STATUS.PENDING]: Colors.orange,
      [STATUS.READY_FOR_DELIVERY]: Colors.verify,
      [STATUS.IN_PROGRESS]: Colors.btnColor,
      [STATUS.DELIVERED]: Colors.green,
    };
    return colors[status] || Colors.grey;
  };

  const getStatusText = status => {
    const texts = {
      [STATUS.PENDING]: 'Pending',
      [STATUS.READY_FOR_DELIVERY]: 'Ready For Delivery',
      [STATUS.IN_PROGRESS]: 'Delivery Inbound',
      [STATUS.DELIVERED]: 'Delivered',
    };
    return texts[status] || 'Unknown';
  };

  const renderOrderItem = ({item}) => (
    <View style={styles.orderItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item?.title}</Text>
        <Text style={styles.itemQuantity}>Qty: {item?.qty}</Text>
      </View>
      <Text style={styles.itemPrice}>Rs. {item?.price}</Text>
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

  const handleCallDriver = () => {
    Linking.openURL(`tel:${orderData.phone}`);
  };

  const handleWhatsapp = () => {
    Linking.openURL(`https://wa.me/${orderData.phone}`);
  };
  const fullAddress = [
    orderData?.customerId?.address?.home?.flat_house_no,
    orderData?.customerId?.address?.home?.road_building,
    orderData?.customerId?.address?.home?.block,
    orderData?.customerId?.address?.home?.city,
    orderData?.customerId?.address?.home?.governorate,
    // item?.home?.additionalNotes,
  ]
    .filter(Boolean) // Removes null/undefined/empty strings
    .join(', ');
  return (
    <AppSkeleton disableScroll={true}>
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
            <Text style={styles.customerName}>
              {orderData.customerId?.name}
            </Text>
            <Text style={styles.customerPhone}>
              {orderData?.customerId?.mobile}
            </Text>
            <Text style={styles.customerAddress}>{fullAddress}</Text>
          </View>
        </OrderSection>

        {/* Location Information */}
        <OrderSection
          icon="location-arrow"
          title="Delivery Location"
          showMapIcon={true}
          onMapPress={() => setShowLocationModal(true)}>
          <Text style={styles.locationText}>{fullAddress}</Text>
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
            <Text style={styles.summaryValue}>Rs. {orderData.subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee:</Text>
            <Text style={styles.summaryValue}>
              Rs. {orderData.deliveryAmount}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Vat:</Text>
            <Text style={styles.summaryValue}>
              Rs. {Number(orderData.vat).toFixed(1)}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Grand Total:</Text>
            <Text style={styles.totalValue}>Rs. {orderData.grandTotal}</Text>
          </View>

          <View style={styles.paymentMethod}>
            <Text style={styles.paymentLabel}>Payment Method:</Text>
            <Text style={styles.paymentValue}>{orderData.paymentMethod}</Text>
          </View>
          <View style={styles.callButtonContainer}>
            <TouchableOpacity style={styles.callButton}>
              <Icon
                family="Ionicons"
                name="call"
                size={20}
                color={Colors.white}
                onPress={handleCallDriver}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.callButton}
              onPress={() => {
                navigation.navigate('Chat', {driver: orderData});
              }}>
              <Icon
                family="Entypo"
                name="message"
                size={20}
                color={Colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Icon
                family="FontAwesome"
                name="whatsapp"
                size={20}
                color={Colors.white}
                onPress={handleWhatsapp}
              />
            </TouchableOpacity>
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
            deliveryStatus === STATUS.PENDING
              ? handleConfirmOrder
              : deliveryStatus === STATUS.READY_FOR_DELIVERY
              ? handleStartDelivery
              : deliveryStatus === STATUS.IN_PROGRESS
              ? handleCompleteDelivery
              : () => {}
          }
          label={
            deliveryStatus === STATUS.PENDING
              ? 'Confirm Order'
              : deliveryStatus === STATUS.READY_FOR_DELIVERY
              ? 'Start Delivery'
              : deliveryStatus === STATUS.IN_PROGRESS
              ? 'Complete Delivery'
              : null
          }
          btnStyle={{
            width: '95%',
            borderRadius: scale(5),
            backgroundColor:
              deliveryStatus === STATUS.PENDING
                ? Colors?.verify
                : deliveryStatus === STATUS.READY_FOR_DELIVERY
                ? Colors?.btnColor
                : deliveryStatus === STATUS.IN_PROGRESS
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
  callButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(12),
  },
  callButton: {
    backgroundColor: Colors.orange,
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(22.5),
    justifyContent: 'center',
    alignItems: 'center',
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
