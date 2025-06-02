import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  productId: {
    _id: string;
    nameProduct: string;
    price: number;
    newPrice: number;
    imageUrl: string;
    color: string;
  };
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
    clearItems: (state) => {
      state.items = [];
    },
  },
});

export const { updateCart, clearItems } = cartSlice.actions;
export default cartSlice;
