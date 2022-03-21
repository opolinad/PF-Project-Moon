import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { GET_CATEGORIES, LOADING_0, STARTING_STATUS, NOT_FOUND_404, SUCCESS_200 } from "../../redux/consts";
import { loginFailure } from './loginSlice';

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
            state.status = action.payload.status;
            state.posts=action.payload.post;
        }
    }
});

const selectedCategorySlice = createSlice({
    name: "selectedCategories",
    initialState: "",
    reducers: {
        setSelectedCategory: (state, action) => {
            console.log(state);
            console.log("action payload",action.payload);
            return state = action.payload;
        },
        resetSelectedCategory: (state, action) => {
            state = action.payload;
        },
        searchResetOptionsCategory: (state) => {
            state = "";
        }
    }
});

const filterAndOrderSlice = createSlice({
    name: "filterAndOrder",
    initialState: {},
    reducers: {
        resetOptions: (state, action) => {
            state = {};
        },
        searchResetOptionsCategoryFAO: (state, action) => {
            state = {}
        },
        setFilter: (state, action) => {
            state = { ...state, filter: action.payload };
        },
        setOrdering: (state, action) => {
            state = { ...state, ordering: action.payload };
        }
    }
});

// export const { searchingDatabase, feedDatabase, setSearchingToLoading, setFeedToLoading, feedNextPageDatabase } = feedSlice.actions;
// export const feedReducer = feedSlice.reducer;
export const { getCategoriesLoading, getCategories } = categoriesSlice.actions;
export const categoriesReducer=categoriesSlice.reducer;
export const { setSelectedCategory, resetSelectedCategory, searchResetOptionsCategory } = selectedCategorySlice.actions;
export const selectedCategoryReducer = selectedCategorySlice.reducer;
// export const { resetOptions, searchResetOptionsCategoryFAO, setFilter, setOrdering } = filterAndOrderSlice.actions;
// export const filterAndOrderReducer = filterAndOrderSlice.reducer;