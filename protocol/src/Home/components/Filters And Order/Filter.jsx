import React from "react";
import { useDispatch } from "react-redux";
import { setFeedToLoading, setFilter } from "../../../ReduxToolkit/reducers/homeSlice";
import FilterCss from "./Filter.module.css";

export default function Filter()
{
    const dispatch= useDispatch();

    function filtering(e)
    {
        alert("Entra")
        dispatch(setFeedToLoading())
        dispatch(setFilter(e.target.value))
    }

    return(
        <div id={FilterCss.filterCont}>
            <select name="filterSelect" id={FilterCss.filterSelect} onChange={(e)=>filtering(e)}>
                <option value="" className={FilterCss.filterOption}>All</option>
                {/* <option value="trending" className="filterOption">Trending</option> */}
                <option value="designsOnly" className={FilterCss.filterOption}>Designs Only</option>
                <option value="textOnly" className={FilterCss.filterOption}>Text Only</option>
            </select>
        </div>
    )
}