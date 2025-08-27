import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import AppSkeleton from '../components/AppSkeleton';
import LocationModal from '../components/LocationModal';
import OrderSection from '../components/OrderSection';
import { moderateScale, scale, verticalScale } from '../utils/helper';
import Colors from '../assets/colors/Color';
import { fonts } from '../assets/fonts/Fonts';
import ImagePickerModal from '../components/ImagePickerModal';
import Header from '../components/BacKHeader';
import { useNavigation } from '@react-navigation/native';

// Import custom components
import OrderHeader from '../components/OrderHeader';
import OrderCustomerInfo from '../components/OrderCustomerInfo';
import OrderItems from '../components/OrderItems';
import OrderSummary from '../components/OrderSummary';
import OrderImageUpload from '../components/OrderImageUpload';

// Import custom hooks
import { useOrderStatus } from '../hooks/useOrderStatus';
import { useImageUpload } from '../hooks/useImageUpload';

// Import utility functions
import { getStatusColor, getStatusText, formatAddress } from '../utils/orderStatusUtils';

const OrderDetails = ({ route }) => {
  const { orderData, from } = route?.params || {};
  console.log(orderData, 'Order Datatatta');
  
  const [showImageModal, setShowImageModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const navigation = useNavigation();

  // Use custom hooks
  const {
    deliveryStatus,
    STATUS,
    handleConfirmOrder,
    handleStartDelivery,
    handleCompleteDelivery,
  } = useOrderStatus(orderData);

  const {
    uploadedImages,
    addImage,
    removeImage,
  } = useImageUpload();

  if (!orderData) {
    return (
      <AppSkeleton>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No order data found</Text>
        </View>
      </AppSkeleton>
    );
  }

  const fullAddress = formatAddress(orderData?.customerId?.address);

  return (
    <AppSkeleton disableScroll={true}>
      <Header />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Order Header with Status */}
        <OrderHeader 
          orderNumber={orderData?.orderNo}
          status={deliveryStatus}
          getStatusColor={getStatusColor}
          getStatusText={getStatusText}
        />

        {/* Customer Information */}
        <OrderCustomerInfo 
          orderData={orderData} 
          fullAddress={fullAddress}
          onMapPress={() => setShowLocationModal(true)}
        />

        {/* Order Items */}
        <OrderItems 
          orderData={orderData} 
          from={from} 
        />

        {/* Order Summary and Actions */}
        <OrderSummary 
          orderData={orderData}
          from={from}
          navigation={navigation}
          deliveryStatus={deliveryStatus}
          STATUS={STATUS}
          handleConfirmOrder={handleConfirmOrder}
          handleStartDelivery={handleStartDelivery}
          handleCompleteDelivery={handleCompleteDelivery}
        />

        {/* Special Instructions */}
        {orderData.specialInstructions && (
          <OrderSection icon="info-circle" title="Special Instructions">
            <Text style={styles.instructionsText}>
              {orderData.specialInstructions}
            </Text>
          </OrderSection>
        )}

        {/* Image Upload Section */}
        <OrderImageUpload 
          deliveryStatus={deliveryStatus}
          uploadedImages={uploadedImages}
          addImage={addImage}
          removeImage={removeImage}
          setShowImageModal={setShowImageModal}
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
        coordinates={{ lat: orderData.lat, lng: orderData.lng }}
      />
    </AppSkeleton>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.white 
  },
  instructionsText: {
    fontSize: moderateScale(14),
    fontFamily: fonts.regular,
    color: Colors.black,
    lineHeight: verticalScale(20),
    fontStyle: 'italic',
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
