import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      phone: "",
      name: "",
      email: "",
      image: "",
      pending: false,
      error: false,
    },
    address: { province: "", district: "", ward: "", address: "", userId: "" },
  },
  reducers: {
    updateStart: (state) => {
      state.user.pending = true;
    },
    updateError: (state) => {
      state.user.pending = false;
      state.user.error = true;
    },
    updateSuccess: (state, action) => {
      state.user.pending = false;
      state.user.error = false;
      state.user.id = action.payload._id;
      state.user.phone = action.payload.phone;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.image = action.payload.imageUrl;
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    clearAddress: (state) => {
      state.address = {
        province: "",
        district: "",
        ward: "",
        address: "",
        userId: "",
      };
    },
    clearUser: (state) => {
      state.user = {
        id: "",
        phone: "",
        name: "",
        email: "",
        image: "",
        pending: false,
        error: false,
      };
    },
  },
});

export const {
  updateStart,
  updateError,
  updateSuccess,
  clearUser,
  updateAddress,
  clearAddress,
} = userSlice.actions;
export default userSlice;
