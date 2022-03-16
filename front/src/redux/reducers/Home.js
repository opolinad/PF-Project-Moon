import { FEED_DATABASE, FEED_NEXT_PAGE_DATABASE, GET_CATEGORIES, GET_CATEGORIES_LOADING, LOADING_0, NEXT_PAGE, RESET_OPTIONS, RESET_PAGE, RESET_SELECTED_CATEGORY, SEARCHING_DATABASE, SET_FEED_TO_LOADING, SET_FILTER, SET_ORDERING, SET_SEARCHING_TO_LOADING, SET_SELECTED_CATEGORY, STARTING_STATUS } from "../consts";


export function feed(state={status:STARTING_STATUS,posts:[]},action)
{
    if(action.type===SEARCHING_DATABASE || action.type===FEED_DATABASE){return action.payload}
    else if(action.type===SET_SEARCHING_TO_LOADING || action.type===SET_FEED_TO_LOADING){return {status:LOADING_0,posts:[]}}
    else if(action.type===FEED_NEXT_PAGE_DATABASE){return {...state,posts:[...state.posts,...action.payload.posts]}}
    else return state;
}

export function categories(state={status:STARTING_STATUS,posts:{}},action)
{
    if(action.type===GET_CATEGORIES_LOADING){return {status:STARTING_STATUS,posts:{}};}
    else if(action.type===GET_CATEGORIES){return action.payload;}
    else return state;
}

export function selectedCategory(state="",action)
{
    if(action.type===SET_SELECTED_CATEGORY)return action.payload;
    else if(action.type===RESET_SELECTED_CATEGORY || action.type===SEARCH_RESET_OPTIONS_CATEGORY)return "";
    else return state;
}

export function filterAndOrder(state={},action)
{
    if(action.type===RESET_OPTIONS || action.type===SEARCH_RESET_OPTIONS_CATEGORY) {return {};}
    else if(action.type===SET_FILTER) {return {...state,filter:action.payload};}
    else if(action.type===SET_ORDERING) {return {...state,ordering:action.payload};}
    else return state;
}

export function homePage(state=0,action)
{
    if(action.type===RESET_PAGE) return 0;
    else if(action.type===NEXT_PAGE) return state+1;
    else return state;
}