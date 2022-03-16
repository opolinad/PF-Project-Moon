import { GET_POST_DATA } from "../consts.js";

const initialState = {
    postData: []
};

export default function (state = initialState, action){
    switch(action.type) {
        case GET_POST_DATA:
            return {
                ...state,
                postData: action.payload,
            }
        default:
            return state;
    }
};