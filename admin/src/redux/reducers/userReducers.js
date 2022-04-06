import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    isFetching: false,
    error: false,
  },
  reducers: {
    userStart: (state) => {
      state.isFetching = true;
    },
    userSuccess: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    userFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { userStart, userSuccess, userFailure } = userSlice.actions;

export default userSlice.reducer;
