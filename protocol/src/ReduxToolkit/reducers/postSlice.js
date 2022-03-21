import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: "post",
    initialState: {
        categories: []
    },
    reducers: {
        getCategories: (state, action) => {
            state.categories = action.payload
        },
    }
})

export const { getCategories } = userSlice.actions;
export default postSlice.reducer;