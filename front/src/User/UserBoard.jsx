import React from 'react';
import { Route, Routes } from "react-router";
import Post from '../Post/Post.jsx';
import User from "./User.jsx";


export default function UserBoard() {
    return (
        <div>
            <Routes>
                {/* <Route path= 'favorites' element={<User/>}/> */}
                <Route path= 'posts' element={<Post/>}/>
                {/* <Route path= 'following' element={<User/>}/>
                <Route path= 'followers' element={<User/>}/>
                <Route path= 'messages' element={<Messages/>}/> */}
            </Routes>
        </div>
    )
}