import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (!existingItem) {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalQuantity += 1;
      } else {
        existingItem.quantity += 1;
        state.totalQuantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      state.totalQuantity -= existingItem.quantity;
      state.totalPrice -= existingItem.price * existingItem.quantity;
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );
      existingItem.quantity += 1;
      state.totalQuantity += 1;
      state.totalPrice += existingItem.price;
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      existingItem.quantity -= 1;
      state.totalQuantity -= 1;
      state.totalPrice -= existingItem.price;
    },
    clearCart: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
