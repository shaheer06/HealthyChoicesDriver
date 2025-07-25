import api from "../utils/apiUrl"

export const generateOtp = (fullPhoneNumber) => {
    return api.post('/api/driver/generateOtp', {
        username: fullPhoneNumber,
    });
};

export const login = (mobile, otp, rememberMe) => {
    return api.post('/api/driver/login', {
        username: mobile ? { mobile } : null,
        otp: otp ?? null,
        rememberMe: rememberMe ?? null,
    });
};
