import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STARTING_STATUS } from "../redux/consts.js";
import Categories from "./components/Categories/Categories.jsx";
import Feed from "./components/Feed/Feed.jsx";
import Actions from "../redux/actions/index.js";
import Filter from "./components/Filters And Order/Filter.jsx";
import Ordering from "./components/Filters And Order/Ordering.jsx";
import { loginUser } from '../redux/apiCalls/loginCalls'
import { useNavigate } from "react-router-dom";

import HomeCss from "./Home.module.css";

export default function Home(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const navigate = useNavigate();
    useEffect(() => {
        loginUser(dispatch, { platform: true });
        if (!user.currentUser) {
            navigate("/");
        }
    }, [])
    return (
        <div id={HomeCss.homeCont}>
            <div id={HomeCss.filterOrderCont}>
                <Filter />
                <Ordering />
                <button onClick={() => dispatch(Actions.resetOptions())} id={HomeCss.resetOption}>Reset</button>
            </div>
            <div id={HomeCss.InfoCont}>
                {/* <Feed /> */}
                <Categories />
            </div>
            <button id={HomeCss.nextPageBut} onClick={() => dispatch(Actions.nextPageAction())} >Load More</button>
        </div>
    )
}