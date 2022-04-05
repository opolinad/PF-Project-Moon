import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    usersStart: (state) => {
      state.isFetching = true;
    },
    usersSuccess: (state, action) => {
      state.users = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    usersFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { usersStart, usersSuccess, usersFailure } = usersSlice.actions;

export default usersSlice.reducer;
