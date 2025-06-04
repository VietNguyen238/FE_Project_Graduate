import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [
      {
        _id: "",
        productId: {
          _id: "",
          nameProduct: "",
          price: 0,
          newPrice: 0,
          imageUrl: "",
          color: "",
        },
        quantity: 0,
      },
    ],
  },
  reducers: {
    updateCart: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { updateCart, clearCart } = cartSlice.actions;
export default cartSlice;
