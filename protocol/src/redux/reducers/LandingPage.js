import {
    GET_USERS,
    POST_USERS,
    LOGIN_START,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT
} from "../consts.js"


const initialState = {
    // loggedIn: false,
    currentUser: null,
    isFetching: false,
    error: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        // case GET_USERS:
        //     return {
        //         ...state,
        //         users: action.payload
        //     }

        // case POST_USERS:
        //     return {
        //         ...state,
        //         users: action.payload
        //     }
        case LOGIN_START:
            return {
                currentUser: null,
                isFetching: true,
                error: false
            }
        case LOGIN_SUCCESS:
            return {
                currentUser: action.payload,
                isFetching: false,
                error: false
            }
        case LOGIN_FAILURE:
            return {
                currentUser: null,
                isFetching: false,
                error: true
            }
        case LOGOUT:
            return {
                currentUser: null,
                isFetching: false,
                error: false
            }
        default:
            return { ...state }
    }
}

