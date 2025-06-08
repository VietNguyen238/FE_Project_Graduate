import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    items: [
      {
        userId: "",
        productId: "",
        comment: "",
        rating: 0,
      },
    ],
  },
  reducers: {
    updateReview: (state, action) => {
      state.items = action.payload;
    },
    clearReview: (state) => {
      state.items = [];
    },
  },
});

export const { updateReview, clearReview } = reviewSlice.actions;
export default reviewSlice;
