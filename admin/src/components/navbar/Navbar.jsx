import React from "react";
import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
// import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
// import ListOutlinedIcon from "@mui/icons-material/ListOutlined";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  console.log(user)
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
            {
              user.currentUser.fullName && 
              <div className="item">
                {user.currentUser.fullName}
              </div>
            }
          <div className="item">
            <img
              src={user.currentUser.profilePhoto? user.currrentUser.profilePhoto : "/default_profile_photo.svg"}
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
