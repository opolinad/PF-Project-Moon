import * as consts from "../consts.js";


const defaultState = {
    loggedIn: false,
    users: {}
}

export function userLogin(state = defaultState, action){
    if(action.type === consts.GET_USERS){
        return {
                    ...state,
                    users: action.payload
                }
    }
    
    if(action.type === consts.USERLOGIN){
        return {
                    loggedIn: true,
                    user: {...action.payload}
                }
    }

    if(action.type === consts.USERLOGOUT){
        localStorage.clear()
        return {
            loggedIn: false,
            user: {}
        }
    } else{
        return state
    }
}