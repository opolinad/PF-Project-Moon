import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./components/Categories/Categories.jsx";
import Feed from "./components/Feed/Feed.jsx";
import Filter from "./components/Filters And Order/Filter.jsx";
import Ordering from "./components/Filters And Order/Ordering.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { loginUser } from "../ReduxToolkit/apiCalls/loginCall.js";

import HomeCss from "./Home.module.css";
import { findNextPage } from "../ReduxToolkit/apiCalls/pageCall.js";
import PostPost from "../PostPost/PostPost.jsx";


export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.currentUser);
    const filterAndOrder = useSelector(state => state.filterAndOrder);
    const selectedCategory = useSelector(state => state.selectedCategory);
    const search = useSelector(state => state.search);
    const homePage = useSelector(state => state.homePage);
    const [showCreate,setShowCreate] = useState(false);
   



    useEffect(() => {
        if (!user?.password) loginUser(dispatch, { platform: true });
//         if (!user) {
//             navigate("/");
//         }
        console.log(user);
    }, [])

    useEffect(() => {
        !user && navigate("/");
    }, [user])

    function handleButton()
    {
        findNextPage(dispatch, search, selectedCategory, filterAndOrder.filter, filterAndOrder.ordering, homePage.page, user._id);
    }

    const showWidth = document.documentElement.clientWidth<1025;

    return (
        <div id={HomeCss.homeCont}>
            <div id={HomeCss.filterOrderCont}>
                {/* <Filter /> */}
                <Ordering />
            </div>
            <div id={HomeCss.InfoCont}>
                <Categories />
                {showWidth ? <PostPost/> : ""}
                <Feed />
                {!showWidth ? <PostPost/> : ""}
            </div>
            <button id={HomeCss.nextPageBut} onClick={() => handleButton()} >Load More</button>
        </div>
    )
}
