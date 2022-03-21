import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./components/Categories/Categories.jsx";
import Feed from "./components/Feed/Feed.jsx";
import Actions from "../redux/actions/index.js";
import Filter from "./components/Filters And Order/Filter.jsx";
import Ordering from "./components/Filters And Order/Ordering.jsx";
import { useNavigate } from "react-router-dom";

import HomeCss from "./Home.module.css";
import { useEffect } from "react";
import { loginUser } from "../ReduxToolkit/apiCalls/loginCall.js";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(state => state.user.currentUser)

    useEffect(() => {
        if (!user?.password ) loginUser(dispatch, { platform: true });
        if (!user) {
            navigate("/");
        }
    }, [])

    useEffect(() => {
        !user && navigate("/");
    }, [user])



    return (
        <div id={HomeCss.homeCont}>
            <div id={HomeCss.filterOrderCont}>
                <Filter />
                <Ordering />
                <button onClick={() => dispatch(Actions.resetOptions())} id={HomeCss.resetOption}>Reset</button>
            </div>
            <div id={HomeCss.InfoCont}>
            <Categories />     
              <Feed />
             
            </div>
            <button id={HomeCss.nextPageBut} onClick={() => dispatch(Actions.nextPageAction())} >Load More</button>
        </div>
    )
}