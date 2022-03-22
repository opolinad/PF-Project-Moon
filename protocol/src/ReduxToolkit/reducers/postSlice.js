import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
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

export const { getCategories } = postSlice.actions;
export default postSlice.reducer;