import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "userData",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,

    },
    reducers: {
        userStart: (state) => {
            state.currentUser = null;
            state.isFetching = true;
            state.error = false;
        },
        userSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        userFailure: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = true;
        },
        //Update
        updateStart: (state) => {
            state.currentUser = null;
            state.isFetching = true;
            state.error = false;
        },
        updateSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
            state.error = false;
        },
        updateFailure: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = true;
        }
    },
});

export const {
    userStart,
    userSuccess,
    userFailure,
    updateStart,
    updateSuccess,
    updateFailure,
} = userSlice.actions;
export default userSlice.reducer;
