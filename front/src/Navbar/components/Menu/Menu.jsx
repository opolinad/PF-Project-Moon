import React from "react";
import { Link } from "react-router-dom";

export default function Menu(props)
{
    return(
        <div id="MenuCont">
            <div className="menuOptionShell"><Link to={"/user/self"} className="menuOption">Cuenta</Link></div>
            <div className="menuOptionShell"><Link to={"user/settings"} className="menuOption">Settings</Link></div>
            <div className="menuOptionShell"><Link to={"user/saved"} className="menuOption">Saved</Link></div>
        </div>
    )
}