import { createSlice } from '@reduxjs/toolkit'
import { LOADING_0, NOT_FOUND_404 } from '../consts';


const portfolioUserSlice =createSlice({
    name: "portfolioUser",
    initialState: {
        posts: [],
        statusPortolio: LOADING_0,
        page: 0
    },
    reducers: {
        portfolioStart: (state) => {
            state.statusPortolio = LOADING_0;
        },
        portfolioUpdate: (state, action) => {
            state.posts = action.payload
            state.statusPortolio = action.payload.statusPortolio;
            state.page = state.page + 1;
        },
        portfolioReset:(state) =>{
            state.posts = [];
            state.statusPortolio = LOADING_0;
            state.page = 0;
        },
        portfolioError:(state) =>{
            state.status = NOT_FOUND_404;
        }
    }
});


export const {portfolioStart, portfolioUpdate, portfolioReset, portfolioError} = portfolioUserSlice.actions;

export default portfolioUserSlice.reducer;