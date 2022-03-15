import { GET_NOTIFICATIONS, GET_NOTIFICATIONS_LOADING, NOT_FOUND_404, SEARCHING_ACTION, SEARCHING_DATABASE, SET_SEARCHING_TO_LOADING, SUCCESS_200 } from "../consts";

export function searchingAction(payload)
{
    return({type:SEARCHING_ACTION,payload})
}


export function setSearchingToLoading()
{
    return({type:SET_SEARCHING_TO_LOADING})
}

export function searchingDataBaseAction(payload="")
{
    return async function (dispatch)
    {
        let q="";
        if(payload!=""){q="?search="+payload;}
        const resp = await axios.get("http://localhost:3001/feed"+q);
        //despues se procesa
        let status=NOT_FOUND_404;
        if(resp.data.length){status=SUCCESS_200}
        return({type:SEARCHING_DATABASE,payload:{status,posts:resp.data}})
    }
}

export function setNotificationsToLoading()
{
    return({type:GET_NOTIFICATIONS_LOADING})
}

export function getNotificationsAction(id=0) //imagino que debe haber un id o algo asi
{
    return async function (dispatch)
    {
        const resp = await axios.get(`http://localhost:3001/notifications/${id}`);
        //despues se procesa
        let status=NOT_FOUND_404;
        if(resp.data.length){status=SUCCESS_200;}
        return({type:GET_NOTIFICATIONS,payload:{status,posts:resp.data}})
    }
}