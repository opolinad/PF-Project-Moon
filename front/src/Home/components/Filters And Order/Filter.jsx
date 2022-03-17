import React from "react";
import { useDispatch } from "react-redux";
import Actions from "../../../redux/actions/index.js";

export default function Filter()
{
    const dispatch= useDispatch();

    function filtering(e)
    {
        dispatch(Actions.setFeedToLoading())
        dispatch(Actions.changeFilter(e.target.value))
    }

    return(
        <div id="filterCont">
            <h3>Filters!</h3>
            <select name="filterSelect" id="filterSelect" onChange={(e)=>filtering(e)}>  
                <option value="" className="filterOption"></option>
                {/* <option value="trending" className="filterOption">Trending</option> */}
                <option value="designsOnly" className="filterOption">Designs Only</option>
            </select>
        </div>
    )
}