import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      //   state.notification = {
      //     message: action.payload.message,
      //     type: action.payload.type,
      //   };
      state.notification = action.payload;
    },
    clearNotification: () => initialState,
  },
});

export const { setNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer;
