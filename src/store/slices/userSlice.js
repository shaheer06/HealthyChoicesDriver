import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  isLoggedIn: false,
  address: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData(state, action) {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    logoutUser(state) {
      state.userData = null;
      state.isLoggedIn = false;
    },
  },
});

export const {setUserData, logoutUser, setAddress} = userSlice?.actions;
export default userSlice?.reducer;
