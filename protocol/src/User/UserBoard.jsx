import React from "react";
import { Route, Routes } from "react-router";
import Follows from "./Follows/UserFollows";
import UserWallet from "./Wallet/UserWallet";
import Posts from "./Posts/UserPosts";
import UserEdit from "./Edit/UserEdit";
import Portfolio from "./Portfolio/UserPorfolio";

import css from "./User.module.css";


export default function UserBoard() {
    return (
        <div id={css.userBoardCont}>
            <Routes>
                <Route index element={<Posts />} />
                <Route path="favorites" element={<Posts />} />
                <Route path="posts" element={<Posts />} />
                <Route path="following" element={<Follows />} />
                <Route path="followers" element={<Follows />} />
                <Route path="wallet" element={<UserWallet />} />
                <Route path="edit" element={<UserEdit />} />
                <Route path="portfolio" element={<Portfolio />} />
            </Routes>
        </div>
    );
}
