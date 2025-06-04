import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "cart",
  initialState: {
    orders: [
      {
        userId: "",
        productId: "",
        status: "",
        quantity: 0,
        paymentMethob: "",
        shippingMethod: "",
        shippingFee: 0,
        note: "",
      },
    ],
  },
  reducers: {
    updateOrder: (state, action) => {
      state.orders = action.payload;
    },
    clearOrder: (state) => {
      state.orders = [];
    },
  },
});

export const { updateOrder, clearOrder } = orderSlice.actions;
export default orderSlice;
