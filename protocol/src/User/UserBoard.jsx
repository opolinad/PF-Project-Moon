import React from 'react';
import { Route, Routes } from "react-router";
import Post from '../Post/Post.jsx';
import User from "./User.jsx";
import Follows from './UserFollows';
import Messages from "../Messages/Messages.jsx"
import Posts from './UserPosts';


export default function UserBoard() {
    return (
        <div>
            <Routes>
                <Route path= 'favorites' element={<Posts/>}/>
                <Route path= 'posts' element={<Posts/>}/>
                <Route path= 'following' element={<Follows/>}/>
                <Route path= 'followers' element={<Follows/>}/>
                <Route path= 'messages' element={<Messages/>}/>
            </Routes>
        </div>
    )
}