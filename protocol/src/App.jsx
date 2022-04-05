import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import Post from "./Post/Post.jsx";
import Register from "./Register/Register.jsx";
import User from "./User/User";
import UserBoard from "./User/UserBoard.jsx";
import NotFound from "./NotFound/NotFound";
import Navbar from "./Navbar/Navbar.jsx";
import axios from "axios"
import "./App.css";
import Bandeja from "./Conversations/Bandeja.jsx";
import PasswordReset from "./PasswordReset/PasswordReset.jsx";
import ChangePassword from "./PasswordReset/ChangePassword.jsx";
axios.defaults.baseURL=process.env.REACT_APP_API;

export default function App() {

    return (
        <div id="appCont">
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path="/">
                        <Route  element={<LandingPage />} />
                        <Route index element={<LandingPage />} />
                        <Route path="register" element={<Register />} />
                        <Route path="home" element={ <> <Home /> </> }/>
                        {/* <Route className={"routeCont"} path={"users/:id*"} element={<Fragment><User /><UserBoard /></Fragment>} /> */}

                        <Route path="/post/:id" element={<Post/>} />

                        <Route className={"routeCont"} path={"users/:id/*"} element={ <> <User /> <UserBoard /> </> } />

                        <Route path='/mensajes' element={<Bandeja />}/>
                        <Route path="password_reset" element={<PasswordReset/>}/>
                        <Route path="password_reset/:idUser" element={<ChangePassword/>}/>
                        <Route path="*" element={<NotFound />} />
                        {/* <Route path="CookiesPolicy" element={<CookiesPolicy />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );

}
