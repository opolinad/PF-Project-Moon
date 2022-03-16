import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home/Home.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import Post from "./Post/Post.jsx";
import Register from "./Register/Register.jsx";
import User from "./User/User.jsx";
import Messages from "./Messages/Messages.jsx";

export default function App()
{
    return(
        <BrowserRouter>
            <div id="appCont">
            <Routes>
                <Route path= '/front/public/index.html' element={<User/>}>
                    <Route path= '/front/public/index.html/register' element={<Register/>}/>
                    <Route path= '/front/public/index.html/home' element={<Home/>}/>
                </Route>
                <Route path={"/user"} element={<Fragment><User/><UserBoard/></Fragment>}/>
                <Route path="*" element={<User/>} />
            </Routes>
            </div>
        </BrowserRouter>
    )
}

function UserBoard () {
    return (
        <div>
            <Routes>
                <Route path= '/favorites' element={<User/>}/>
                <Route path= '/posts/:postId' element={<Post/>}/>
                <Route path= '/following' element={<User/>}/>
                <Route path= '/followers' element={<User/>}/>
                <Route path= '/messages' element={<Messages/>}/>
            </Routes>
        </div>
    )
}