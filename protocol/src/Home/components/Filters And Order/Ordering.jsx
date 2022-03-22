import React from "react";
import { useDispatch } from "react-redux";

import OrderingCss from "./Ordering.module.css";

export default function Ordering()
{
    const dispatch= useDispatch();

    function ordering(e)
    {
        //dispatch(Actions.setFeedToLoading())
        //dispatch(Actions.changeOrdering(e.target.value))
    }

    return(
        <div id={OrderingCss.orderingCont}>
            <select name="orderingSelect" id={OrderingCss.orderingSelect} onChange={(e)=>ordering(e)}>  
                <option value="" className={OrderingCss.orderingOption}> By Default</option>
                <option value="recent" className={OrderingCss.orderingOption}>Recent</option>
                <option value="trending" className={OrderingCss.orderingOption}>Trending</option>
            </select>
        </div>
    )
}