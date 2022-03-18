import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers, getFollowing } from "../redux/actions/Follows.js";
import css from "./UserFollows.module.css"

export default function Follows(){
    const {user} = useParams()
    const dispatch = useDispatch()
    const status = useSelector ((state) => state.Status)
    const followingg = useSelector ((state) => state.Following)
    const followerss = useSelector ((state) => state.Followers)
    useEffect (() => {
        dispatch(getFollowers(user))
        dispatch(getFollowing(user))
    },[])

    const following= [{user: "barto", name:"bart simpson", image:""},{user: "lisa", name:"lisa simpson", image:""},{user: "march", name:"march simpson", image:""}]
    const followers= [{user: "lisa", name:"bart simpson", image:""},{user: "march", name:"march simpson", image:""}]

    const URL = useLocation();
    let displaying = following;
    if(URL.pathname.includes("followers")) displaying = followers;

    return(
        <div>
            <div id={css.container}>
                {displaying? displaying.map((e) => {
                    return (
                        <div id={css.card}>
                            <img src="data:image/png;base64,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" alt=""/>
                            <div>
                                <span>{e.name}</span>
                                <span>@{e.user}</span>
                            </div>
                            <button>FOLLOW</button>
                        </div>
                    )
                }): null}
            </div>
        </div>
    )
}