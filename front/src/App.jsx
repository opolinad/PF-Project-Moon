import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import LandingPage from "./LandingPage";
import Post from "./Post";
import Register from "./Register";
import User from "./User";
import Messages from "./Messages";

export default function App()
{
    return(
        <BrowserRouter>
            <div id="appCont">
            <Routes>
                <Route exact path= '/' element={<LandingPage/>}/>
                <Route exact path= '/register' element={<Register/>}/>
                <Route exact path= '/home' element={<Home/>}/>
                <Route exact path= '/:user' element={<User/>}/>
                <Route exact path= '/:user/favorites' element={<User/>}/>
                <Route exact path= '/:user/posts/:postId' element={<Post/>}/>
                <Route exact path= '/:user/following' element={<User/>}/>
                <Route exact path= '/:user/followers' element={<User/>}/>
                <Route exact path= '/messages/:user' element={<Messages/>}/>
            </Routes>
            </div>
        </BrowserRouter>
    )
}
