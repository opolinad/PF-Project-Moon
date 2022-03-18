import React from "react";
import { Link } from "react-router-dom";

export default function Menu(props)
{
    return(
        <div id="MenuCont">
            {/* <div className="menuOptionShell"><Link to={"/user/self"} className="menuOption">Account</Link></div>
            <div className="menuOptionShell"><Link to={"/user/settings"} className="menuOption">Settings</Link></div>
            <div className="menuOptionShell"><Link to={"/user/favorites"} className="menuOption">Favorites</Link></div> */}
            <div className="menuOptionShell"><p  className="menuOption">Account</p></div>
            <div className="menuOptionShell"><p  className="menuOption">Settings</p></div>
            <div className="menuOptionShell"><p  className="menuOption">Favorites</p></div>
        </div>
    )
}