import { combineReducers } from "@reduxjs/toolkit";
import ordersReducers from "./ordesReducers";
import usersReducers from "./usersReducers";
import postsReducers from "./postsReducers";
import userReducers from "./userReducers";
import loginReducers from "./loginReducers";

const rootReducer = combineReducers({
  users: usersReducers,
  posts: postsReducers,
  orders: ordersReducers,
  userById: userReducers,
  user: loginReducers
});


export default rootReducer;
