import { createSlice } from '@reduxjs/toolkit'
import { LOADING_0, NOT_FOUND_404 } from '../consts';


const portfolioUserSlice =createSlice({
    name: "portfolioUser",
    initialState: {
        posts: [],
        statusPortolio: LOADING_0,
        page: 0,
        filter:"",
        order:"recent",
    },
    reducers: {
        portfolioStart: (state) => {
            state.statusPortolio = LOADING_0;
        },
        portfolioUpdate: (state, action) => {
            state.posts = [...state.posts,...action.payload.posts]
            state.statusPortolio = action.payload.statusPortolio;
            state.page = state.page + 1;
            console.log("portfolioUpdate")
        },
        portfolioReset:(state) =>{
            state.posts = [];
            state.statusPortolio = LOADING_0;
            state.page = 0;
            state.filter = "";
            state.order = "recent";
        },
        portfolioError:(state) =>{
            state.status = NOT_FOUND_404;
        },
        portfolioFilter:(state,action) =>{
            state.filter = action.payload;
            state.page=1;
        },
        portfolioOrder:(state,action) =>{
            state.order = action.payload;
            state.page=1;
        },
        portfolioResetOption:(state,action) =>{
            state.filter = "";
            state.order = "recent";
        }
    }
});


export const 
{
    portfolioStart,
    portfolioUpdate, 
    portfolioReset, 
    portfolioError, 
    portfolioFilter, 
    portfolioOrder, 
    portfolioResetOption,
} = portfolioUserSlice.actions;

export default portfolioUserSlice.reducer;