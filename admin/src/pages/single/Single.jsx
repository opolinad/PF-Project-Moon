import React, { useEffect, useState } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import { useLocation } from "react-router-dom";
import { getUserById } from "../../redux/apiCalls/usersCall/userByIdCall";
import { useDispatch, useSelector } from "react-redux";

const Single = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userById.user);
  const location = useLocation();
  const userId = location.pathname.split("/").reverse()[0];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserById(dispatch, userId).then((response) => setIsLoading(false));
  }, [dispatch, userId]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={
                  user.profilePhoto ||
                  "http://panel.guerreroyroaconsultores.com/inc/fle/abog/abog_06e75ab7666cb5bb2dfbee89a9c0c693ab94debf.jpg"
                }
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.username || "Username"}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
