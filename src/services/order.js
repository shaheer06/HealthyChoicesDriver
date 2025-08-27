  import api from '../utils/apiUrl';

export const getOrderList = async userId => {
  try {
    const response = await api.get(
      `/api/storefront/driver-orders/orders/${userId}`,
    );
    console.log(response, 'Response');
    return response.data;
  } catch (error) {
    console.error('Error fetching order list:', error?.response?.data);
    throw error; // Important for handling error in caller
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.post(
      `/api/storefront/driver-orders/orders/${orderId}`,
      {status},
    );
    console.log('Status updated to:', status);
    return response?.data;
  } catch (error) {
    console.error('Error updating order status:', error?.response?.data);
    throw error; // Important for handling error in caller
  }
};

export const getOrderHistory = async driverId => {
  try {
    console.log(`/api/storefront/driver-orders/history/${driverId}`, 'Driver ID');
    const response = await api.get(`/api/storefront/driver-orders/history/${driverId}`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching order history:', error?.response?.data);
    throw error; // Important for handling error in caller
  }
};

export const activityLog = async driverId => {
  try {
    const response = await api.get(`/api/storefront/driver/activities/${driverId}`);
    return response?.data;
  } catch (error) {
    console.error('Error fetching activity log:', error?.response?.data);
    throw error; // Important for handling error in caller
  }
};
