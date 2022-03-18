import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import CardPost from "../CardPost/CardPost.jsx";
import { getUserData } from "../redux/actions/User.js";
import { useDispatch, useSelector } from "react-redux";

import css from "./User.module.css"

const userData = {
    backgroundPhoto: "https://png.pngtree.com/thumb_back/fw800/back_our/20190628/ourmid/pngtree-blue-violet-line-banner-background-image_271519.jpg",
    profilePhoto: "https://pbs.twimg.com/profile_images/725013638411489280/4wx8EcIA_400x400.jpg",
    username: "homerdona",
    fullName: "homero simpson",
    birthday: "29-10-2001",
    following: [{user: "barto", name:"bart simpson", image:""},{user: "lisa", name:"lisa simpson", image:""},{user: "march", name:"march simpson", image:""}],
    followers: [{user: "lisa", name:"lisa simpson", image:""},{user: "march", name:"march simpson", image:""}],
    posts: [{title: "homero", image: "https://pbs.twimg.com/media/FOGGI51XsAA97Y3?format=jpg&name=small"}, {title: "lisa", image: "https://pbs.twimg.com/media/FOFxffqWUAoegHC?format=jpg&name=small"}],
    favorites: [{ title: "bart", image: "https://pbs.twimg.com/media/FOFBicMXIAI2DR5?format=jpg&name=small"}, {title: "apu", image: "https://pbs.twimg.com/media/FOEzsHqWQAUxnO2?format=jpg&name=small"}, {title: "krusty", image: "https://pbs.twimg.com/media/FN8OZ9rXIAIyebn?format=jpg&name=small"}]
}

import { userData } from '../../public/dummyStates.js';


export default function User(){

    const dispatch = useDispatch()
    const {username} = useParams()
    const userDataA = useSelector ((state) => state.userData)
    useEffect (() => dispatch(getUserData(username)), [])

    return(
        <div id={css.container}>
            <img src={userData.backgroundPhoto} alt="backgroundPhoto not found" id={css.banner}/>
            <div id={css.profileSection}>
                <img src={userData.profilePhoto} alt="profilePhoto not found" id={css.profilePhoto}/>
                <div>
                    <h1>{userData.fullName}</h1>
                    <p>@{userData.username}</p>
                    <div>
                        <Link to={"following"} id={css.followsLink}><button>{userData.following.length} following</button></Link>
                        <Link to={"followers"} id={css.followsLink}><button>{userData.followers.length} followers</button></Link>
                    </div>
                </div>
            </div>
            <div id={css.postsButtons}>
                <Link to={"posts"} id={css.postsLink}><button>POSTS</button></Link>
                <Link to={"favorites"} id={css.postsLink}><button>FAVORITES</button></Link>
            </div>
        </div>
    )
}