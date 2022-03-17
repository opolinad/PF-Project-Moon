import React from 'react';
import { Route, Routes } from "react-router";
import Post from '../Post/Post.jsx';
import User from "./User.jsx";
import CardPost from '../CardPost/CardPost.jsx';
import { useSelector } from 'react-redux';

export default function UserBoard() {

    const userData= useSelector(state=>state.userData);

    let userPosts;
    if(userData.posts){userPosts}

    return (
        <div>
            <Routes>
                {/* <Route path= 'favorites' element={<User/>}/> */}
                {/* <Route path= 'posts' element={<Post/>}/> */}
                {/* <Route path= 'following' element={<User/>}/>
                <Route path= 'followers' element={<User/>}/>
                <Route path= 'messages' element={<Messages/>}/> */}
            </Routes>
        </div>
    )
}