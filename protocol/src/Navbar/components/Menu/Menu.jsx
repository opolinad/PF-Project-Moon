import React from "react";
import { Link } from "react-router-dom";
import MenuCss from "./Menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog, faBookmark } from "@fortawesome/free-solid-svg-icons";

export default function Menu(props)
{
    return(
        <div id={MenuCss.MenuCont}>
            {/* <div className="menuOptionShell"><Link to={"/user/self"} className="menuOption">Account</Link></div>
            <div className="menuOptionShell"><Link to={"/user/settings"} className="menuOption">Settings</Link></div>
            <div className="menuOptionShell"><Link to={"/user/favorites"} className="menuOption">Favorites</Link></div> */}
            <div className={MenuCss.menuOptionShell}> <p className={MenuCss.menuImg}><FontAwesomeIcon icon={faHome}/></p> <p  className={MenuCss.menuOption}>Home</p></div>
            <div className={MenuCss.menuOptionShell}> <p className={MenuCss.menuImg}><FontAwesomeIcon icon={faUser}/></p> <p  className={MenuCss.menuOption}>Account</p></div>
            <div className={MenuCss.menuOptionShell}> <p className={MenuCss.menuImg}><FontAwesomeIcon icon={faCog}/></p> <p  className={MenuCss.menuOption}>Settings</p></div>
            <div className={MenuCss.menuOptionShell}> <p className={MenuCss.menuImg}><FontAwesomeIcon icon={faBookmark}/></p> <p  className={MenuCss.menuOption}>Favorites</p></div>
        </div>
    )
}