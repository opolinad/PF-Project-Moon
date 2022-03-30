import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import css from "./UserFollows.module.css"
import DefaultProfile from '../assets/default_profile_photo.svg'
import { followCall } from '../ReduxToolkit/apiCalls/followUser.js';
import { getUser } from '../ReduxToolkit/apiCalls/userCall.js';

export default function Follows() {
    // const user = useSelector(state => state.user.currentUser)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.currentUser);
    const currentUser = useSelector(state => state.userData.currentUser)
    const followers = useSelector(state => state.userData.currentUser?.followers)
    const following = useSelector(state => state.userData.currentUser?.following)

    // useEffect(() => {
    //     getUser(dispatch(user._id))
    // }, [dispatch])

    // const following = [{ user: "barto", name: "bart simpson", image: "" }, { user: "lisa", name: "lisa simpson", image: "" }, { user: "march", name: "march simpson", image: "" }]
    // const followers = [{ user: "lisa", name: "bart simpson", image: "" }, { user: "march", name: "march simpson", image: "" }]

    const URL = useLocation();
    let displaying = currentUser?.followings;
    if (URL.pathname.includes("followers")) displaying = currentUser?.followers;
    console.log(displaying)
    return (
        <>
            <div id={css.container}>
                {displaying?.length ? displaying.map((e,i) => {
                    return (
                        <div key={"follows_"+i} id={css.card}>
                            <img src={e.profilePhoto || DefaultProfile} alt={e.username || "photo"} />
                            <div>
                                {/* <span className={css.followName}>{e.username}</span> */}
                                <span className={css.followUsername}>@{e.username}</span>
                            </div>
                            {user?._id === e?._id ? <button>You</button> : <button onClick={()=>followCall(user?._id,e?._id,user?.followings.includes(e?._id) ? "following" : "follow",dispatch,user)}>{user?.followings.includes(e?._id) ? "Following" : "Follow"}</button>}  
                        </div>
                    )
                }) : (<p id={css.status}>{URL.pathname.includes("followers") ? "No followers" : "No followings"}</p>)}
            </div>
        </>
    )
}