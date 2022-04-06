import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
        banned: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
            state.error = false
        },
        loginFailure: (state) => {
            state.isFetching = true
            state.error = true
        },
        loginBanned: (state) => {
            state.isFetching = true
            state.banned = true
        },
        logoutStart: (state) => {
            state.currentUser = null
            state.isFetching = false
            state.error = false
        },
        updateFollow:(state,action) => {
            state.currentUser= action.payload;
        },
        updateUnfollow:(state,action) => {
            console.log(action.payload)
            state.currentUser= action.payload;
        }
    }
})

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    updateFollow,
    updateUnfollow,
    loginBanned
} = loginSlice.actions;
export default loginSlice.reducer;