import React from "react";
import { useDispatch } from "react-redux";
import Actions from "../../../redux/actions/index.jsx";

export default function Filter()
{
    const dispatch= useDispatch();

    function filtering(e)
    {
        dispatch(Actions.setFeedToLoading())
        dispatch(Actions.)
    }

    return(
        <div id="filterCont">
            <select name="filterSelect" id="filterSelect" onChange={(e)=>filtering(e)}>  
                <option value="" className="filterOption"></option>
                <option value="trending" className="filterOption">Trending</option>
                <option value="recent" className="filterOption">Recent</option>
            </select>
        </div>
    )
}