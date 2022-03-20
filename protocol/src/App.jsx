import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home/Home.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import Post from "./Post/Post.jsx";
import Register from "./Register/Register.jsx";
import User from "./User/User";
import Messages from "./Messages/Messages.jsx";
import UserBoard from "./User/UserBoard.jsx";
import NotFound from "./NotFound/NotFound";
import Navbar from "./Navbar/Navbar.jsx"
import "./App.css"

export default function App()
{
  return(      
    <div id="appCont">
      <BrowserRouter>
        <Routes>
          <Route path= '/'>
            <Route index element={<LandingPage/>}/>
            <Route path= 'register' element={<Register/>}/>
            <Route path= 'home' element={<><Navbar/><Home/></>}/>
            <Route className={"routeCont"} path={"user/*"} element={<Fragment><Navbar/><User/><UserBoard/></Fragment>}/>
            <Route path="*" element={<NotFound/>} />
          </Route>  
        </Routes>
      </BrowserRouter>
    </div>
  )
}
