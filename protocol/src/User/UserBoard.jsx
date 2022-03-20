import React from 'react';
import { Route, Routes } from "react-router";
import Follows from './UserFollows';
import Messages from "../Messages/Messages.jsx"
import Posts from './UserPosts';

import css from "./User.module.css";

export default function UserBoard() {
    return (
        <div id={css.userBoardCont}>
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