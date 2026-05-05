import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import uiReducer from "./slices/uiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});

export default store;
