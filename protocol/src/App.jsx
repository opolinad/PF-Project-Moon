import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home.jsx";
import LandingPage from "./LandingPage/LandingPage.jsx";
import Post from "./Post/Post.jsx";
import Register from "./Register/Register.jsx";
import User from "./User/User";
import Messages from "./Messages/Messages.jsx";
import UserBoard from "./User/UserBoard.jsx";
import NotFound from "./NotFound/NotFound";
import Navbar from "./Navbar/Navbar.jsx";
import CookiesPolicy from "./CookiesPolicy/CookiesPolicy.jsx";


import "./App.css";

export default function App() {
  return (
    <div id="appCont">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route
              path="home"
              element={
                <>
                  <Navbar />
                  <Home />
                </>
              }
            />
            {/* <Route className={"routeCont"} path={"users/:id*"} element={<Fragment><User /><UserBoard /></Fragment>} /> */}
            {/* <Route path="/post/*" element={<Post/>} /> */}
            <Route
              className={"routeCont"}
              path={"users/:id*"}
              element={
                <Fragment>
                  <User />
                  <UserBoard />
                </Fragment>
              }
            />
            <Route
              className={"routeCont"}
              path={"users/:id*/edit"}
              element={
                <Fragment>
                  <User />
                  <UserBoard />
                </Fragment>
              }
            />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="CookiesPolicy" element={<CookiesPolicy />} /> */}
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
