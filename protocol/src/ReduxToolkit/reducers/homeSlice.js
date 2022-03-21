import { createSlice } from '@reduxjs/toolkit'
import { SEARCH_RESET_OPTIONS_CATEGORY, FEED_DATABASE, FEED_NEXT_PAGE_DATABASE, GET_CATEGORIES, GET_CATEGORIES_LOADING, LOADING_0, NEXT_PAGE, RESET_OPTIONS, RESET_PAGE, RESET_SELECTED_CATEGORY, SEARCHING_DATABASE, SET_FEED_TO_LOADING, SET_FILTER, SET_ORDERING, SET_SEARCHING_TO_LOADING, SET_SELECTED_CATEGORY, STARTING_STATUS } from "../../redux/consts";

const feedSlice = createSlice({
    name: "feed",
    initialState: {
        status: STARTING_STATUS,
        posts: []
    },
    reducers: {
        searchingDatabase: (state, action) => {
            state = action.payload;
        },
        feedDatabase: (state, action) => {
            state = action.payload;
        },
        setSearchingToLoading: (state) => {
            state.status = LOADING_0;
        },
        setFeedToLoading: (state) => {
            state.status = LOADING_0;
        },
        feedNextPageDatabase: (state, action) => {
            state.posts = [...state.posts, action.payload.posts];
        }
    }
});

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        status: STARTING_STATUS,
        posts: {}
    },
    reducers: {
        getCategoriesLoading: (state) => {
            state.status = STARTING_STATUS;
        },
        getCategories: (state, action) => {
            state = action.payload;
        }
    }
});

const selectedCategorySlice = createSlice({
    name:"selectedCategories",
    initialState:"",
    reducers:{
        setSelectedCategory: (state, action)=>{
            state=action.payload;
        },
        resetSelectedCategory: (state,action)=>{
            state=action.payload;
        },
        searchResetOptionsCategory: (state)=>{
            state="";
        }
    }
});

const filterAndOrderSlice = createSlice({
    name:"filterAndOrder",
    initialState:{},
    reducers:{
        resetOptions:(state,action)=>{
            state={};
        },
        searchResetOptionsCategoryFAO:(state,action)=>{
            state={}
        },
        setFilter:(state,action)=>{
            state={...state, filter:action.payload};
        },
        setOrdering:(state,action)=>{
            state={...state, ordering:action.payload};
        }
    }
});

export const { searchingDatabase, feedDatabase, setSearchingToLoading, setFeedToLoading,  feedNextPageDatabase} = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
export const { getCategoriesLoading, getCategories } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
export const { setSelectedCategory, resetSelectedCategory, searchResetOptionsCategory} = selectedCategorySlice.actions;
export const selectedCategoryReducer = selectedCategorySlice.reducer;
export const { resetOptions, searchResetOptionsCategoryFAO, setFilter, setOrdering} = filterAndOrderSlice.actions;
export const filterAndOrderReducer = filterAndOrderSlice.reducer;