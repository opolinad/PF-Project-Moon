import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import css from "./UserPortfolio.module.css";
import { LOADING_0 } from "../ReduxToolkit/consts";

function ImgsPortfolioGen()
{
    const portfolio = useSelector(state => state.portfolio);

    const navigate = useNavigate();

    let imgsArrShell = portfolio.posts?.map((element,index)=><div onClick={() => navigate("/post/" + element._id)}><img src={element.img}/></div>)

    return(
        <div id={css.imgsArrShell}>
            {imgsArrShell}
        </div>
    )
}

export default function Portfolio()
{
    const user = useSelector(state => state.user.currentUser);
    const userData = useSelector(state => state.userData.currentUser);
    const portfolio = useSelector(state => state.portfolio);

    const [options, setOption] = useState({order:"",filter:""});

    let isPremium = user.premium.includes(userData._id);

    return(
        <div id={css.portfolioCont}>
            <div id={css.filtershell}>
                <select name="portfolioType" id={css.selectFilter} onChange={(e)=>handleFilter(e)}>
                    <option id={css.optionFree} value="free">Free</option>
                    <option id={isPremium ? css.optionPremium : css.optionSubscribe} value={isPremium ? "premium" : "subscribe"}>{isPremium ? "Premium" : "Subscribe!"}</option>
                </select>
                <select name="portfolioOrder" id={css.selectOrder} onChange={(e)=>handleOrder(e)}>
                    <option value="rating">Rating</option>
                    <option value="recent">By Date</option>
                </select>
            </div>
            <div id={css.imgsArrShell}>
                {portfolio.post.length? <ImgsPortfolioGen/> : <h2 id={css.insideStatus}> {portfolio.statusPortolio===LOADING_0 ? "Loading..." : "Error 404..."} </h2>}
            </div>
            <p id={css.buttonStatus}> {portfolio.post.length? (portfolio.statusPortolio===LOADING_0? "Loading More...": "Error Loading More...") : "" } </p>
            <button onClick={handleMore} id={css.loadMore}>Load More</button>
        </div>
    )
}