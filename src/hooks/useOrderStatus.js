import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import api from '../utils/apiUrl';

export const useOrderStatus = (orderData) => {
  const { userData } = useSelector(state => state?.user);
  
  const STATUS = {
    PENDING: 'pending',
    READY_FOR_DELIVERY: 'ready for delivery',
    IN_PROGRESS: 'in progress',
    OUT_FOR_DELIVERY: 'out for delivery',
    DELIVERED: 'delivered',
  };

  // Get status from orderData with fallback to 'ready for delivery'
  const getInitialStatus = () => {
    if (orderData?.status) {
      // Map API status to our internal status constants
      const statusMapping = {
        'ready for delivery': 'ready for delivery',
        'pending': 'pending',
        'in progress': 'in progress',
        'out for delivery': 'out for delivery',
        'delivered': 'delivered',
        'completed': 'completed'
      };
      
      const normalizedStatus = orderData.status.toLowerCase();
      return statusMapping[normalizedStatus] || 'Ready For Delivery';
    }
    return 'Ready For Delivery'; // Default status
  };

  const [deliveryStatus, setDeliveryStatus] = useState(getInitialStatus());

  const updateOrderStatus = async (orderId, status) => {
    try {
      console.log('User Data', userData?.data?._id, status);
      const response = await api.post(
        `/api/storefront/driver-orders/orders/${orderId}/driver/${userData?.data?._id}`,
        { status },
      );
      console.log('Status', response?.data);
      return response?.data;
    } catch (error) {
      console.error('Error updating order status:', error?.response?.data);
    }
  };

  const handleConfirmOrder = () => {
    Alert.alert(
      'Confirm Order',
      'Are you sure you want to confirm this order for delivery?',
      [
        { text: 'Cancel', style: 'cancel' },
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
      await updateOrderStatus(orderData._id, 'out for delivery');
      setDeliveryStatus(STATUS.OUT_FOR_DELIVERY);
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
        { text: 'Cancel', style: 'cancel' },
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

  // Update status when orderData changes
  useEffect(() => {
    if (orderData?.status) {
      const newStatus = getInitialStatus();
      console.log('Order Status from API:', orderData.status);
      console.log('Mapped Status:', newStatus);
      setDeliveryStatus(newStatus);
    }
  }, [orderData?.status]);

  // Log current delivery status for debugging
  useEffect(() => {
    console.log('Current deliveryStatus:', deliveryStatus);
  }, [deliveryStatus]);

  return {
    deliveryStatus,
    STATUS,
    handleConfirmOrder,
    handleStartDelivery,
    handleCompleteDelivery,
  };
};
