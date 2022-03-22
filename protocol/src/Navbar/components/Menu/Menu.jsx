import React from "react";
import { Link } from "react-router-dom";
import MenuCss from "./Menu.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUser, faCog, faBookmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Menu(props)
{
    const navigate = useNavigate();
    const user = useSelector((state) => state.user); //user.currentUser._id
    function handleClick(e) {

    }
    return(
        <div id={MenuCss.MenuCont}>
            {/* <div className="menuOptionShell"><Link to={"/user/self"} className="menuOption">Account</Link></div>
            <div className="menuOptionShell"><Link to={"/user/settings"} className="menuOption">Settings</Link></div>
            <div className="menuOptionShell"><Link to={"/user/favorites"} className="menuOption">Favorites</Link></div> */}
            <div className={MenuCss.menuOptionShell}> <div className={MenuCss.menuOption} onClick={()=>navigate("/home")}><p className={MenuCss.menuImg}><FontAwesomeIcon icon={faHome}/></p> Home</div></div>

            <div className={MenuCss.menuOptionShell}> <div className={MenuCss.menuOption} onClick={()=>navigate("users/"+user.currentUser?._id)}><p className={MenuCss.menuImg}><FontAwesomeIcon icon={faUser}/></p> Account</div></div>

            <div className={MenuCss.menuOptionShell}> <div className={MenuCss.menuOption} onClick={()=>navigate("users/"+user.currentUser?._id+"/edit")}><p className={MenuCss.menuImg}><FontAwesomeIcon icon={faCog}/></p> Settings</div></div>

            <div className={MenuCss.menuOptionShell}> <div className={MenuCss.menuOption} onClick={()=>navigate("users/"+user.currentUser?._id+"/favorites")}> <p className={MenuCss.menuImg}><FontAwesomeIcon icon={faBookmark}/></p>Favorites</div> </div>
        </div>
    )
}