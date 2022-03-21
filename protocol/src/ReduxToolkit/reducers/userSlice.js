import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "userData",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        userStart: (state) => {
            state.currentUser = null
            state.isFetching = true
            state.error = false
        },
        userSuccess: (state, action) => {
            state.currentUser = action.payload
            state.isFetching = false
            state.error = false
        },
        userFailure: (state) => {
            state.currentUser = null
            state.isFetching = false
            state.error = true
        },
    }
})

export const { userStart, userSuccess, userFailure } = userSlice.actions;
export default userSlice.reducer;