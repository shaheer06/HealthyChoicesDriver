import Colors from '../assets/colors/Color';

export const getStatusColor = (status) => {
  const colors = {
    'pending': Colors.orange,
    'ready for delivery': Colors.verify,
    'in progress': Colors.btnColor,
    'out for delivery': Colors.btnColor,
    'delivered': Colors.green,
  };
  return colors[status] || Colors.grey;
};

export const getStatusText = (status) => {
  const texts = {
    'pending': 'Pending',
    'ready for delivery': 'Ready For Delivery',
    'in progress': 'Delivery Inbound',
    'out for delivery': 'Out For Delivery',
    'delivered': 'Delivered',
  };
  return texts[status] || status || 'Unknown';
};

export const formatAddress = (address) => {
  const fullAddress = [
    address?.home?.road_building,
    address?.home?.flat_house_no,
    address?.home?.governorateId?.name,
    address?.home?.cityId?.name,
    address?.home?.blockId?.name
  ]
    .filter(Boolean) // Removes null/undefined/empty strings
    .join(', ');
  
  return fullAddress;
};
