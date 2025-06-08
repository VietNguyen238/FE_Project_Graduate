import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import categorySlice from "./categorySlice";
import productSlice from "./productSlice";
import reviewSlice from "./reviewSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    category: categorySlice.reducer,
    order: orderSlice.reducer,
    product: productSlice.reducer,
    review: reviewSlice.reducer,
  },
});

export default store;
