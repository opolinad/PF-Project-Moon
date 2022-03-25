import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
    name: "search",
    initialState:"",
    reducers:{
        searchingAction:(state, action)=>{
            console.log("searchingAction")
            return state=action.payload;
        }
    }
});

export const { searchingAction } = searchSlice.actions;
export default  searchSlice.reducer;