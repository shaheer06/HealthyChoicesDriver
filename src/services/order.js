import api from "../utils/apiUrl"

export const getOrderList = async (userId) => {
    console.log(userId, 'UserId');
    const response = await api.get(`/api/storefront/driver-orders/orders/${userId}`);
    console.log(response, 'Response');
    return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.post(
            `/api/storefront/driver-orders/orders/${orderId}`,
            { status }
        );
        console.log("Status updated to:", status);
        return response?.data;
    } catch (error) {
        console.error('Error updating order status:', error?.response?.data);
        throw error; // Important for handling error in caller
    }
};