import { GET_USER_DATA, LOADING_0, NEXT_FAVORITES_PAGE, NEXT_USER_FAVORITES, NEXT_USER_PAGE, NEXT_USER_POSTS, RESET_USER_CARDS, RESET_USER_PAGES, STARTING_STATUS, SUCCESS_200 } from "../consts.js";

const initialState = {
    userData: []
};

export function userData (state = initialState, action){
    switch(action.type) {
        case GET_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            }
        default:
            return state;
    }
};

export function userPage(state=0,action)
{
    switch(action.type)
    {
        case RESET_USER_PAGES:
        return 0;

        case NEXT_USER_PAGE:
        return state+1;

        default:
        return state;
    } 
}

export function userFavoritePage(state=0,action)
{
    switch(action.type)
    {
        case RESET_USER_PAGES:
        return 0;

        case NEXT_FAVORITES_PAGE:
        return state+1;

        default:
        return state;
    } 
}

export function userFavorites(state={status:STARTING_STATUS,posts:[]},action)
{
    switch(action.type)
    {
        case GET_USER_DATA:
        return {status:SUCCESS_200,posts:action.payload.favorites};

        case RESET_USER_CARDS:
        return {status:STARTING_STATUS,posts:{}};

        case NEXT_USER_FAVORITES:
        return {status:action.payload.status,posts:[...state.posts,action.payload.posts]};

        default:
        return state;
    }  
}

export function userPosts(state={status:STARTING_STATUS,posts:[]},action)
{
    switch(action.type)
    {
        case GET_USER_DATA:
        return {status:SUCCESS_200,posts:action.payload.posts};

        case RESET_USER_CARDS:
        return {status:STARTING_STATUS,posts:{}};

        case NEXT_USER_POSTS:
        return {status:action.payload.status,posts:[...state.posts,action.payload.posts]};

        default:
        return state;
    }  
}