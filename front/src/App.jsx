import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home/Home.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import Post from "./Post/Post.jsx";
import Register from "./Register/Register.jsx";
import User from "./User/User.jsx";
import Messages from "./Messages/Messages.jsx";
import UserBoard from "./User/UserBoard.jsx";

import "./App.css";
import Navbar from "./Navbar/Navbar.jsx";

export default function App()
{


    return(      
        <div id="appCont">
            <Navbar/>
        </div>
    )
}

