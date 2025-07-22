import api from './apiUrl';

export const updateUserProfile = async (id, payload, image = null) => {
  const formData = new FormData();

  //Append Normal fields
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData?.append(key, value);
    }
  });

  if (image) {
    formData.append('image', {
      uri: image,
      type: 'profile/jpeg',
      name: 'image.jpeg',
    });
  }

  return api?.post(`/api/driver/updateProfile/${id}`, formData, true, {
    timeout: 30000,
  });
};
