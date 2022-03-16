import { LOADING_0, SEARCHING_DATABASE, SET_SEARCHING_TO_LOADING } from "../consts";


export function feed(state={status:LOADING_0,posts:[]},action)
{
    if(action.type===SEARCHING_DATABASE){return action.payload}
    else if(action.type===SET_SEARCHING_TO_LOADING){return {status:LOADING_0,posts:[]}}
    else return state;
}