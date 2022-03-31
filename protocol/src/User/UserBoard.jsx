import React from "react";
import { Route, Routes } from "react-router";
import Follows from "./UserFollows";
import UserWallet from "./UserWallet";
import Posts from "./UserPosts";
import UserEdit from "./UserEdit";

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
            </Routes>
        </div>
    );
}
