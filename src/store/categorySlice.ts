import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [
      {
        id: "",
        name: "",
        slug: "",
        description: "",
      },
    ],
  },
  reducers: {
    updateCategory: (state, action) => {
      state.items = action.payload;
    },
    clearCategory: (state) => {
      state.items = [];
    },
  },
});

export const { updateCategory, clearCategory } = categorySlice.actions;
export default categorySlice;
