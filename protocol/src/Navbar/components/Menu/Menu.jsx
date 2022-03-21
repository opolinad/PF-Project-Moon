import React from "react";
import { Link } from "react-router-dom";
import MenuCss from "./Menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function Menu(props)
{
    const user = useSelector((state) => state.user); //user.currentUser._id
    return(
        <div id={MenuCss.MenuCont}>
            {/* <div className="menuOptionShell"><Link to={"/user/self"} className="menuOption">Account</Link></div>
            <div className="menuOptionShell"><Link to={"/user/settings"} className="menuOption">Settings</Link></div>
            <div className="menuOptionShell"><Link to={"/user/favorites"} className="menuOption">Favorites</Link></div> */}
            <div className={MenuCss.menuOptionShell}> <Link className={MenuCss.menuOption} to={"/home"}><p className={MenuCss.menuImg}><FontAwesomeIcon icon={faHome}/></p> Home</Link></div>
            <div className={MenuCss.menuOptionShell}> <Link className={MenuCss.menuOption} to={"users/"+user.currentUser._id}><p className={MenuCss.menuImg}><FontAwesomeIcon icon={faUser}/></p> Account</Link></div>
            <div className={MenuCss.menuOptionShell}> <Link className={MenuCss.menuOption} to={"users/"+user.currentUser._id+"/edit"}><p className={MenuCss.menuImg}><FontAwesomeIcon icon={faCog}/></p> Settings</Link></div>
            <div className={MenuCss.menuOptionShell}> <Link className={MenuCss.menuOption} to={"users/"+user.currentUser._id+"/favorites"}> <p className={MenuCss.menuImg}><FontAwesomeIcon icon={faBookmark}/></p>Favorites</Link> </div>
        </div>
    )
}