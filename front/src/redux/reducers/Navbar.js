import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_LOADING, LOADING_0, SEARCHING_ACTION, STARTING_STATUS } from "../consts";



export function searchReducer(state="",action)
{
    if(action.type===SEARCHING_ACTION){return action.payload}
    return state;
}

export function notifications(state={status:STARTING_STATUS,posts:[]},action)
{
    if(action.type===GET_NOTIFICATIONS_LOADING){return {status:LOADING_0,posts:[]};}
    else if(action.type===GET_NOTIFICATIONS){return action.payload;}
    else return state;
}