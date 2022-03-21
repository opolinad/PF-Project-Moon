import { GET_CAT } from "../consts.js"


const initialState = {
    categories: [],
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_CAT:
            return{
                ...state,
                categories: action.payload
            }
        default:
            return state
    }
}

