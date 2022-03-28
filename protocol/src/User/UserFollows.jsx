import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import css from "./UserFollows.module.css"
import DefaultProfile from '../assets/default_profile_photo.svg'
import { followAndUnFollow } from '../ReduxToolkit/apiCalls/followUser.js';
import { getUser } from '../ReduxToolkit/apiCalls/userCall.js';

export default function Follows() {
    // const user = useSelector(state => state.user.currentUser)
    // const dispatch = useDispatch()
    const currentUser = useSelector(state => state.userData.currentUser)
    const followers = useSelector(state => state.userData.currentUser.followers)
    const following = useSelector(state => state.userData.currentUser.following)

    // useEffect(() => {
    //     getUser(dispatch(user._id))
    // }, [dispatch])

    // const following = [{ user: "barto", name: "bart simpson", image: "" }, { user: "lisa", name: "lisa simpson", image: "" }, { user: "march", name: "march simpson", image: "" }]
    // const followers = [{ user: "lisa", name: "bart simpson", image: "" }, { user: "march", name: "march simpson", image: "" }]

    const URL = useLocation();
    let displaying = following;
    if (URL.pathname.includes("followers")) displaying = followers;

    return (
        <>
            <div id={css.container}>
                {displaying ? displaying.map((e) => {
                    return (
                        <div id={css.card}>
                            <img src={e.profilePhoto || DefaultProfile} alt={e.username || "photo"} />
                            <div>
                                {/* <span className={css.followName}>{e.username}</span> */}
                                <span className={css.followUsername}>@{e.username}</span>
                            </div>
                            <button onClick={() => followAndUnFollow(currentUser._id, { userId: e._id })}>FOLLOW</button>
                        </div>
                    )
                }) : (<><p>No tienes followe</p></>)}
            </div>
        </>
    )
}