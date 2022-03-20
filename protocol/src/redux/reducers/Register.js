import {
    REGISTER_START,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_CLEAR
} from "../consts.js"


const initialState = {
    registerUser: null,
    isFetching: false,
    error: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case REGISTER_START:
            return {
                registerUser: null,
                isFetching: true,
                error: false
            }
        case REGISTER_SUCCESS:
            return {
                registerUser: action.payload,
                isFetching: false,
                error: false
            }
        case REGISTER_FAILURE:
            return {
                registerUser: null,
                isFetching: false,
                error: true
            }
        case REGISTER_CLEAR:
            return {
                registerUser: null,
                isFetching: false,
                error: false
            }
        default:
            return { ...state }
    }
}

