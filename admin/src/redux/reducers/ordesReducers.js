import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    ordersStart: (state) => {
      state.isFetching = true;
    },
    ordersSuccess: (state, action) => {
      state.orders = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    ordersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { ordersStart, ordersSuccess, ordersFailure } =
  ordersSlice.actions;
export default ordersSlice.reducer;
