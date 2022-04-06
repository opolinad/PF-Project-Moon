import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    postsStart: (state) => {
      state.isFetching = true;
    },
    postsSuccess: (state, action) => {
      state.posts = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    postsFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { postsStart, postsSuccess, postsFailure } = postsSlice.actions;

export default postsSlice.reducer;
