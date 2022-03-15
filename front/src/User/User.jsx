import React from 'react';
import { Link, useLocation } from "react-router-dom";
import CardPost from '../CardPost/CardPost.jsx';

export default function User(propss){
    const props = {
        backgroundPhoto: "https://pbs.twimg.com/profile_banners/1321799557542531073/1608500632/600x200",
        profilePhoto: "https://pbs.twimg.com/profile_images/1340770555306373120/JjTyTFOF_400x400.jpg",
        username: "alejofschlegel",
        fullName: "alejo schlegel",
        birthday: "29-10-2001",
        following: [{username: "ivana"},{username: "lucas"}, {username: "dana"}],
        followers: [{username: "ivana"},{username: "lucas"}, {username: "dana"}],
        posts: [{image: "https://pbs.twimg.com/media/FNthreYWYAU5Ghr?format=jpg&name=small", title: "homero"}],
        favorites: [{image: "https://pbs.twimg.com/media/FNthreYWYAU5Ghr?format=jpg&name=small", title: "homero"}, {image: "https://pbs.twimg.com/media/FNtT8itXMAIt48K?format=jpg&name=small", title:"burns"}],
    }

    const URL = useLocation()
    console.log(URL.pathname)
    let illustrations = []
    let position = URL.pathname.indexOf("favorites")
    if (position !== -1)
        illustrations = props.favorites
    else illustrations = props.posts

    return(
        <div>
            <img src={props.backgroundPhoto} alt="backgroundPhoto not found" width="1100px" height="200"/>

            <div>
                <img src={props.profilePhoto} alt="profilePhoto not found" width="100" height="100"/>
                <h1>{props.fullName}</h1>
                <p>{props.username}</p>
                <p>{props.birthday}</p>

                <div>
                    <Link to={"/:user/following"}>following</Link>
                    <Link to={"/:user/followers"}>followers</Link>
                </div>

                <div>
                    <Link to={"/:user"}>posts</Link>
                    <Link to={"/:user/favorites"}>favorites</Link>
                </div>
            </div>

            <div>
                {illustrations? illustrations.map((e) => {
                    return (
                        <CardPost props = {e}/>
                    )
                }): null}
            </div>
        </div>
    )
}