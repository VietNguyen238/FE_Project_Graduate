import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [
      {
        nameProduct: "",
        price: 0,
        newPrice: "",
        quantity: 0,
        description: "",
        basicInformation: "",
        imageUrl: [""],
        categoryId: "",
      },
    ],
  },
  reducers: {
    updateProduct: (state, action) => {
      state.items = action.payload;
    },
    clearproduct: (state) => {
      state.items = [];
    },
  },
});

export const { updateProduct, clearproduct } = productSlice.actions;
export default productSlice;
