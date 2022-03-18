import React from "react";
import { useDispatch } from "react-redux";
import Actions from "../../../redux/actions/index.js";

export default function Ordering()
{
    const dispatch= useDispatch();

    function ordering(e)
    {
        dispatch(Actions.setFeedToLoading())
        dispatch(Actions.changeOrdering(e.target.value))
    }

    return(
        <div id="orderingCont">
            <h3>Ordering!</h3>
            <select name="orderingSelect" id="orderingSelect" onChange={(e)=>ordering(e)}>  
                <option value="" className="orderingOption"></option>
                <option value="recent" className="orderingOption">Recent</option>
                <option value="trending" className="orderingOption">Trending</option>
            </select>
        </div>
    )
}