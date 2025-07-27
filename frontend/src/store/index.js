// optional - managing a global authentication state using Redux

import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  authenicated: false,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginUser(state) {
      state.authenticated = true;
    },
    logoutUser(state) {
      state.authenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});
