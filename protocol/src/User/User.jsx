import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from "react-router-dom";
import CardPost from "../CardPost/CardPost.jsx";
import { getUserData } from "../redux/actions/User.js";
import { useDispatch, useSelector } from "react-redux";
import { userData } from '../../public/dummyStates.js';
import Actions from '../redux/actions/index.js';
    /* const userData = {
        backgroundPhoto: "https://pbs.twimg.com/profile_banners/1321799557542531073/1608500632/600x200",
        profilePhoto: "https://pbs.twimg.com/profile_images/1340770555306373120/JjTyTFOF_400x400.jpg",
        username: "alejofschlegel",
        fullName: "alejo schlegel",
        birthday: "29-10-2001",
        following: [{username: "ivana"},{username: "lucas"}, {username: "dana"}],
        followers: [{username: "ivana"},{username: "lucas"}, {username: "dana"}],
        posts: [{image: "https://pbs.twimg.com/media/FNthreYWYAU5Ghr?format=jpg&name=small", title: "homero"}],
        favorites: [{image: "https://pbs.twimg.com/media/FNthreYWYAU5Ghr?format=jpg&name=small", title: "homero"}, {image: "https://pbs.twimg.com/media/FNtT8itXMAIt48K?format=jpg&name=small", title:"burns"}],
    } */

    /*
        BACKGROUND
        FOTO DE PERFIL
        FULLNAME
        USERNAME
        CUMPLEAÑOS
        FOLLOWING Y FOLLOWERS LINKS
        POSTS Y FAVORITES LINKS 
    */
export default function User(){

    const dispatch = useDispatch()
    const {username} = useParams()
    const userDataA = useSelector ((state) => state.userData)
    //useEffect (() => dispatch(getUserData(username)), [])
    useEffect(()=>
    {
        dispatch(Actions.resetPageUser());
        dispatch(getUserData(username));
        return(()=>{dispatch(Action.resetUserCards())})
    },[]);

    //favorites or myPosts?
    const URL = useLocation()
    let illustrations = []
    let position = URL.pathname.indexOf("favorites")
    if (position !== -1)
        illustrations = userData.favorites
    else illustrations = userData.posts

    return(
        <div>
            <img src={userData.backgroundPhoto} alt="backgroundPhoto not found" width="1100px" height="200"/>

            <div>
                <img src={userData.profilePhoto} alt="profilePhoto not found" width="100" height="100"/>
                <h1>{userData.fullName}</h1>
                <p>{userData.username}</p>
                <p>{userData.birthday}</p>

                <div>
                    <Link to={"following"}>following</Link>
                    <Link to={"followers"}>followers</Link>
                </div>

                <div>
                    <Link to={"posts"}>posts</Link>
                    <Link to={"favorites"}>favorites</Link>
                </div>
            </div>

            <div>
                {illustrations? illustrations.map((e) => {
                    return (
                        <CardPost key={"userCardPost_"+e.id} userData = {e}/>
                    )
                }): null}
            </div>
        </div>
    )
}