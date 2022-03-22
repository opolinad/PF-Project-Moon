import {GET_USERS, POST_USERS} from "../consts.js"


const initialState = {
    loggedIn: false,
    users: [],
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_USERS:
            return{
                ...state,
                    users: action.payload
            }

        case POST_USERS:
            return{
                ...state,
                users: action.payload
            }

        default:
            return state
    }
}

