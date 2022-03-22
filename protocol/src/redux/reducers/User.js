import {
    GET_USER_START,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
} from "../consts.js";

const initialState = {
    currentUser: null,
    isFetching: false,
    error: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_START:
            return {
                currentUser: null,
                isFetching: true,
                error: false
            }
        case GET_USER_SUCCESS:
            return {
                currentUser: action.payload,
                isFetching: false,
                error: false
            }
        case GET_USER_FAILURE:
            return {
                currentUser: null,
                isFetching: false,
                error: true
            }
        default:
            return { ...state }
    }
}

/* 
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
} */