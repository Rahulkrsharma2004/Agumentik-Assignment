import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("token");

const initialState = { user: storedUser ? true : null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
