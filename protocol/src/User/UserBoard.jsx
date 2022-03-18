import React from 'react';
import { Route, Routes } from "react-router";
import Post from '../Post/Post.jsx';
import User from "./User.jsx";
import { useSelector } from 'react-redux';
import Follows from '../Follows/Follows.jsx';
import Messages from "../Messages/Messages.jsx"


export default function UserBoard() {

    const userData= useSelector(state=>state.userData);

    let userPosts;
    if(userData.posts){userPosts}

    return (
        <div>
            <Routes>
                <Route path= 'favorites' element={<Post/>}/>
                <Route path= 'posts' element={<Post/>}/>
                <Route path= 'following' element={<Follows/>}/>
                <Route path= 'followers' element={<Follows/>}/>
                <Route path= 'messages' element={<Messages/>}/>
            </Routes>
        </div>
    )
}