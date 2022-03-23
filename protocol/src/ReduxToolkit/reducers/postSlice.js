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

const detailedPost = createSlice({
    name: "detailedPost",
    initialState:{loading:true,detailed:{}},
    reducers:{
        setDetailedPost:(state,action)=>{
            state.detailed=action.payload;
            state.loading=false;
            //state = {loading:false, ...action.payload}
        },
        setDetailedLoading:(state)=>{
            console.log("en set loading")
            state.detailed={};
            state.loading=true;
        }
    }
})

export const { getCategories } = postSlice.actions;
export const { setDetailedPost, setDetailedLoading } = detailedPost.actions;
export const postReducer = postSlice.reducer;
export const detailedPostReducer = detailedPost.reducer;