import * as consts from "../consts.js";

export function dummyLPreducer(state=" ",action)
{
    if(action.type===consts.DUMMY)return consts.DUMMY;
    else return state;
}