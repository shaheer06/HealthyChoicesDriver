import axios from 'axios';
import PopUp from '../Popup/PopUp';


export const BASE_URL = 'https://healthychoices-server.onrender.com';


// Placeholder for future token retrieval
const getAccessToken = async () => {
  // const user = useSelector(state => state?.user?.userData);
  // const state = store.getState();
  // return state.user?.userData?.token || null; // ✅ token from user.userData.token
  // return await AsyncStorage.getItem('accessToken');
  return null;
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  async config => {
    // Custom flag for auth
    const requiresAuth = config.headers?._requiresAuth;

    if (requiresAuth) {
      const token = await getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      delete config.headers._requiresAuth; // clean up
    }

    // FormData content-type handling
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    // Fallback timeout if not passed
    if (!config.timeout) {
      config.timeout = 10000; // 10 seconds default
    }


    return config;
  },
  error => Promise.reject(error),
);

// Optional: Response Interceptor (for global error handling)
apiClient.interceptors.response.use(
  response => response,
  error => {
    let message = 'Something went wrong. Please try again later.';

    if (error.message === 'Network Error') {
      message = 'No internet connection. Please check your network.';
    } else if (error.code === 'ECONNABORTED') {
      message = 'Request timed out. Try again.';
    } else if (error.response?.status === 401) {
      message = 'Unauthorized. Please login again.';
    } else if (error.response?.data?.message) {
      message = 'Something went wrong. Please try again later.';
    }

    PopUp.show('Error', 'error', 1500, message);

    return Promise.reject(error); // Still reject, so you can handle in components if needed
  }
);


// API wrapper
const api = {
  get: (url, params = {}, requiresAuth = false, customHeaders = {}) =>
    apiClient.get(url, {
      params,
      headers: {
        _requiresAuth: requiresAuth,
        ...customHeaders,
      },
    }),

  post: (url, data = {}, requiresAuth = false, config = {}, customHeaders = {}) =>
    apiClient.post(url, data, {
      timeout: config.timeout || 10000,
      headers: {
        _requiresAuth: requiresAuth,
        ...customHeaders,
      },
    }),

  patch: (url, data = {}, requiresAuth = false, customHeaders = {}) =>
    apiClient.patch(url, data, {
      headers: {
        _requiresAuth: requiresAuth,
        ...customHeaders,
      },
    }),

  delete: (url, data = {}, requiresAuth = false, customHeaders = {}) =>
    apiClient.delete(url, {
      data,
      headers: {
        _requiresAuth: requiresAuth,
        ...customHeaders,
      },
    }),
};


export default api;
