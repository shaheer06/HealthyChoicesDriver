export const orderCard = [
  {
    _id: "1",
    orderNumber: "HC-1001",
    name: "Shaheer",
    phone: "+92 300 1234567",
    location: "PECHS, Block-6, Shahrah-e-Faisal, Karachi",
    lat: 24.872398,
    lng: 67.063953,
    type: "One Time",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    items: [
      { name: "Fresh Vegetables Pack", quantity: 2, price: 1200 },
      { name: "Organic Fruits Basket", quantity: 1, price: 800 },
      { name: "Whole Grain Bread", quantity: 3, price: 150 },
    ],
    totalAmount: 2750,
    deliveryFee: 200,
    grandTotal: 2950,
    paymentMethod: "Cash on Delivery",
    specialInstructions: "Please deliver before 2 PM. Customer prefers contactless delivery.",
  },
  {
    _id: "2",
    orderNumber: "HC-1002",
    name: "Bilal",
    phone: "+92 301 2345678",
    location: "Federal B Area, Block 10, Karachi",
    lat: 24.935078,
    lng: 67.067421,
    type: "Weekly",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    items: [
      { name: "Organic Milk", quantity: 2, price: 300 },
      { name: "Fresh Eggs", quantity: 1, price: 250 },
      { name: "Honey Jar", quantity: 1, price: 500 },
    ],
    totalAmount: 1350,
    deliveryFee: 150,
    grandTotal: 1500,
    paymentMethod: "Online Payment",
    specialInstructions: "Ring doorbell twice. Leave at doorstep if no answer.",
  },
  {
    _id: "3",
    orderNumber: "HC-1003",
    name: "Alex",
    phone: "+92 302 3456789",
    location: "Urdu Bazar, Saddar Town, Karachi",
    lat: 24.861614,
    lng: 67.013391,
    type: "One Time",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    items: [
      { name: "Mixed Nuts Pack", quantity: 1, price: 450 },
      { name: "Dried Fruits", quantity: 2, price: 300 },
      { name: "Green Tea", quantity: 1, price: 200 },
    ],
    totalAmount: 1250,
    deliveryFee: 100,
    grandTotal: 1350,
    paymentMethod: "Cash on Delivery",
    specialInstructions: "Call 5 minutes before arrival.",
    image: "https://via.placeholder.com/150",
  },
  {
    _id: "4",
    orderNumber: "HC-1004",
    name: "Ayesha",
    phone: "+92 303 4567890",
    location: "Clifton Block 5, Karachi",
    lat: 24.807253,
    lng: 67.030041,
    type: "Monthly",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    items: [
      { name: "Premium Rice", quantity: 1, price: 800 },
      { name: "Cooking Oil", quantity: 2, price: 400 },
      { name: "Spices Pack", quantity: 1, price: 350 },
    ],
    totalAmount: 1950,
    deliveryFee: 200,
    grandTotal: 2150,
    paymentMethod: "Online Payment",
    specialInstructions: "Deliver to security guard if not home.",
    image: "https://via.placeholder.com/150",
  },
  {
    _id: "5",
    orderNumber: "HC-1005",
    name: "Usman",
    phone: "+92 304 5678901",
    location: "Gulshan-e-Iqbal, Block 13-D, Karachi",
    lat: 24.921340,
    lng: 67.095580,
    type: "One Time",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    items: [
      { name: "Fresh Meat", quantity: 1, price: 1200 },
      { name: "Chicken", quantity: 2, price: 800 },
      { name: "Fish", quantity: 1, price: 600 },
    ],
    totalAmount: 3400,
    deliveryFee: 250,
    grandTotal: 3650,
    paymentMethod: "Cash on Delivery",
    specialInstructions: "Keep frozen items cold. Deliver in evening.",
    image: "https://via.placeholder.com/150",
  },
  {
    _id: "6",
    orderNumber: "HC-1006",
    name: "Fatima",
    phone: "+92 305 6789012",
    location: "DHA Phase 6, Karachi",
    lat: 24.812100,
    lng: 67.067335,
    type: "One Time",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    items: [
      { name: "Organic Vegetables", quantity: 1, price: 600 },
      { name: "Fresh Fruits", quantity: 1, price: 400 },
      { name: "Herbs Pack", quantity: 1, price: 200 },
    ],
    totalAmount: 1200,
    deliveryFee: 150,
    grandTotal: 1350,
    paymentMethod: "Online Payment",
    specialInstructions: "Prefer organic items only. Check expiry dates.",
    image: "https://via.placeholder.com/150",
  },
  {
    _id: "7",
    orderNumber: "HC-1007",
    name: "Zain",
    phone: "+92 306 7890123",
    location: "North Nazimabad Block L, Karachi",
    lat: 24.937038,
    lng: 67.034653,
    type: "Weekly",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    items: [
      { name: "Bread Pack", quantity: 2, price: 100 },
      { name: "Butter", quantity: 1, price: 250 },
      { name: "Cheese", quantity: 1, price: 300 },
    ],
    totalAmount: 750,
    deliveryFee: 100,
    grandTotal: 850,
    paymentMethod: "Cash on Delivery",
    specialInstructions: "Deliver in morning. Fresh bread preferred.",
    image: "https://via.placeholder.com/150",
  },
  {
    _id: "8",
    orderNumber: "HC-1008",
    name: "Hira",
    phone: "+92 307 8901234",
    location: "Bahadurabad, Karachi",
    lat: 24.884678,
    lng: 67.072096,
    type: "Monthly",
    orderDate: "2024-01-15",
    deliveryDate: "2024-01-16",
    items: [
      { name: "Premium Coffee", quantity: 1, price: 800 },
      { name: "Tea Bags", quantity: 2, price: 150 },
      { name: "Sugar", quantity: 1, price: 120 },
    ],
    totalAmount: 1220,
    deliveryFee: 120,
    grandTotal: 1340,
    paymentMethod: "Online Payment",
    specialInstructions: "Handle with care. Fragile items.",
    image: "https://via.placeholder.com/150",
  }
];



export const profileArray = [
  {
    _id: '_1',
    title: "🧑 Your Profile",
    routName: "ProfileDetail"

  },
  {
    _id: '2',
    title: "🔔 Activity Log",
    routName: "ActivityLog"

  },
  {
    _id: '3',
    title: "💳 Order History",
    routName: "OrderHistory"

  },

  {
    _id: "4",
    title: "🔔 Notifications",
    routName: "Notification"

  },


];


export const mealData = [
  {
    _id: "1",
    name: "Azhar",
    meal: "Meal Delivered",
    dish: "Chicken Bowl was delivered to the customer",
    date: "2025-07-02T09:36:00.000Z",
  },
  {
    _id: "2",
    name: "Fatima",
    meal: "Meal Pending",
    dish: "Beef Wrap is being prepared in the kitchen",
    date: "2025-07-01T14:20:00.000Z",
  },
  {
    _id: "3",
    name: "Ali",
    meal: "Meal Cancelled",
    dish: "Veggie Pasta order was cancelled by the customer",
    date: "2025-06-30T11:15:00.000Z",
  },
  {
    _id: "4",
    name: "Sara",
    meal: "Meal Delivered",
    dish: "Grilled Salmon was delivered to the customer",
    date: "2025-06-29T17:00:00.000Z",
  },
  {
    _id: "5",
    name: "Usman",
    meal: "Meal Preparing",
    dish: "Mutton Biryani is being cooked",
    date: "2025-06-28T08:45:00.000Z",
  },
  {
    _id: "6",
    name: "Hira",
    meal: "Meal Delivered",
    dish: "Paneer Tikka was delivered to the customer",
    date: "2025-06-27T19:10:00.000Z",
  },
  {
    _id: "7",
    name: "Zain",
    meal: "Meal Delivered",
    dish: "Spaghetti Carbonara was delivered to the customer",
    date: "2025-06-26T12:30:00.000Z",
  },
  {
    _id: "8",
    name: "Nida",
    meal: "Meal Preparing",
    dish: "Chicken Caesar Salad is being assembled",
    date: "2025-06-25T15:25:00.000Z",
  },
  {
    _id: "9",
    name: "Kashif",
    meal: "Meal Cancelled",
    dish: "Lamb Chops order was cancelled by the kitchen",
    date: "2025-06-24T10:00:00.000Z",
  },
  {
    _id: "10",
    name: "Ayesha",
    meal: "Meal Delivered",
    dish: "Tandoori Chicken was delivered to the customer",
    date: "2025-06-23T20:05:00.000Z",
  },
];


export const orderHistory = [
  {
    _id: "1",
    orderId: "ORD-1001",
    customerName: "Azhar Khan",
    status: "Delivered",
    items: [
      { name: "Chicken Biryani", quantity: 1 },
      { name: "Raita", quantity: 1 },
    ],
    totalAmount: 8.99,
    paymentMethod: "Credit Card",
    date: "2025-07-02T09:36:00.000Z",
    location: "Manama, Bahrain",
  },
  {
    _id: "2",
    orderId: "ORD-1002",
    customerName: "Fatima Zahra",
    status: "Cancelled",
    items: [
      { name: "Beef Burger", quantity: 2 },
      { name: "Fries", quantity: 1 },
    ],
    totalAmount: 12.5,
    paymentMethod: "Cash on Delivery",
    date: "2025-06-30T17:15:00.000Z",
    location: "Riffa, Bahrain",
  },
  {
    _id: "3",
    orderId: "ORD-1003",
    customerName: "Ali Raza",
    status: "Returned",
    items: [
      { name: "Veggie Pizza", quantity: 1 },
      { name: "Garlic Bread", quantity: 1 },
    ],
    totalAmount: 10.25,
    paymentMethod: "Apple Pay",
    date: "2025-07-01T12:00:00.000Z",
    location: "Muharraq, Bahrain",
  },
  {
    _id: "4",
    orderId: "ORD-1004",
    customerName: "Sara Malik",
    status: "Delivered",
    items: [
      { name: "Paneer Tikka", quantity: 1 },
      { name: "Mango Lassi", quantity: 2 },
    ],
    totalAmount: 11.75,
    paymentMethod: "Credit Card",
    date: "2025-06-29T20:45:00.000Z",
    location: "Isa Town, Bahrain",
  },
  {
    _id: "5",
    orderId: "ORD-1005",
    customerName: "Usman Bashir",
    status: "Delivered",
    items: [
      { name: "Tandoori Chicken", quantity: 1 },
      { name: "Naan", quantity: 2 },
    ],
    totalAmount: 14.0,
    paymentMethod: "Debit Card",
    date: "2025-07-02T11:20:00.000Z",
    location: "Budaiya, Bahrain",
  },
];




export const notifications = [
  {
    _id: '1',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    message: 'Order #1234 was delivered successfully.',
    date: '2025-07-02T16:30:00Z',
    type: 'delivered',
  },
  {
    _id: '2',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    message: 'Order #1235 has been cancelled by the user.',
    date: '2025-05-01T13:15:00Z',
    type: 'cancelled',
  },
  {
    _id: '3',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    message: 'You received a new order #1236.',
    date: '2025-07-01T12:45:00Z',
    type: 'new',
  },
  {
    _id: '4',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    message: 'Order #1237 has been picked up.',
    date: '2025-07-01T13:20:00Z',
    type: 'picked',
  },
  {
    _id: '1',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    message: 'Order #1234 was delivered successfully.',
    date: '2025-07-02T16:30:00Z',
    type: 'delivered',
  },
  {
    _id: '2',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    message: 'Order #1235 has been cancelled by the user.',
    date: '2025-05-01T13:15:00Z',
    type: 'cancelled',
  },
  {
    _id: '3',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    message: 'You received a new order #1236.',
    date: '2025-07-01T12:45:00Z',
    type: 'new',
  },
  {
    _id: '4',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
    message: 'Order #1237 has been picked up.',
    date: '2025-07-01T13:20:00Z',
    type: 'picked',
  },
];

export const chatMessages = [
  {
    _id: "1",
    message: "Hi! I'm your delivery driver. I'll be arriving in about 10 minutes.",
    sender: "driver",
    timestamp: "10:30 AM",
    date: "2024-01-16"
  },
  {
    _id: "2",
    message: "Great! I'll be waiting. Please call when you arrive.",
    sender: "user",
    timestamp: "10:31 AM",
    date: "2024-01-16"
  },
  {
    _id: "3",
    message: "Perfect! I'll call you when I reach your location.",
    sender: "driver",
    timestamp: "10:32 AM",
    date: "2024-01-16"
  },
  {
    _id: "4",
    message: "I'm here now. Please come to the main gate.",
    sender: "driver",
    timestamp: "10:40 AM",
    date: "2024-01-16"
  },
  {
    _id: "5",
    message: "Coming out now. Thank you!",
    sender: "user",
    timestamp: "10:41 AM",
    date: "2024-01-16"
  }
];


