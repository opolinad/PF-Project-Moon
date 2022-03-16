import { FEED_DATABASE, GET_CATEGORIES, GET_CATEGORIES_LOADING, LOADING_0, SEARCHING_DATABASE, SET_FEED_TO_LOADING, SET_SEARCHING_TO_LOADING, STARTING_STATUS } from "../consts";


export function feed(state={status:STARTING_STATUS,posts:[]},action)
{
    if(action.type===SEARCHING_DATABASE || action.type===FEED_DATABASE){return action.payload}
    else if(action.type===SET_SEARCHING_TO_LOADING || action.type===SET_FEED_TO_LOADING){return {status:LOADING_0,posts:[]}}
    else return state;
}

export function categories(state={status:STARTING_STATUS,posts:{}},action)
{
    if(action.type===GET_CATEGORIES_LOADING){return {status:STARTING_STATUS,posts:{}};}
    else if(action.type===GET_CATEGORIES){return action.payload;}
    else return state;
}

export function filterAndOrder(state={})