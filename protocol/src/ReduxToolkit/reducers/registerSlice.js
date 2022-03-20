import { createSlice } from '@reduxjs/toolkit'

const registerSlice = createSlice({
    name: "register",
    initialState: {
        registerUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        registerStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        registerSuccess: (state, action) => {
            state.registerUser = action.payload
            state.isFetching = false
            state.error = false
        },
        registerFailure: (state) => {
            state.isFetching = true
            state.error = true
        },
        registerClear: (state) => {
            state.currentUser = null
            state.isFetching = false
            state.error = false
        }
    }
})

export const { registerStart, registerSuccess, registerFailure, registerClear } = registerSlice.actions;
export default registerSlice.reducer;