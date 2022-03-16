import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Actions from "../redux/actions/index.js";
import Menu from "./components/Menu/Menu.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";

export default function Navbar()
{

    const [showMenu,setShowMenu] = useState(false);
    const [showNotifications,setShowNotifications] = useState(false);
    const [search,setSearch] = useState("");
    const [searchErr,setSearchErr] = useState("");
    const dispatch = useDispatch();

    function searching()
    {
        
        dispatch(Actions.resetForSearch());  //resetea filter, order y selectedCategory cuando se hace search 
        dispatch(Actions.searchingAction(search)); //setea search en redux
        dispatch(Actions.setSearchingToLoading()); //setea feed a loading
        dispatch(Actions.searchingDataBaseAction(search)); //envia pedido a back
    }

    function showNotification()
    {
        setShowNotifications(!showNotifications);
        dispatch(Actions.setNotificationsToLoading());
        dispatch(Actions.getNotificationsAction());
    }

    let menu;
    let notifications;
    let searchbut;
    if(showMenu) menu=<Menu/>
    if(showNotifications) notifications=<Notifications/>;
    search.length>3 ? searchbut=<Link to={"/home?search="+search} onClick={searching} id="searchLink">owo!</Link> : searchbut=<p onClick={()=>setSearchErr("owo small, >3 pls uwu")}>owo</p>;
    
    return(
        <div id="navbarShell">
            <div id="menuIcon">
                <div id="menuShell" onClick={()=>setShowMenu(!showMenu)}>Menu</div>
                {menu}
            </div>
            
            <div id="SearchContainer">
                <div id="inputSearchShell"><input type="text" value={search} name="searchInput" id="searchInput" onChange={(e)=>setSearch(e.target.value)} placeholder={"Search"} /></div>
                <div id="inputButtonShell"><button  id="searchButton">{searchbut}</button></div>
                <small>{searchErr}</small>
            </div>

            <div id="notificationsShell">
            <div id="notificationIcon" onClick={showNotification}>Notis</div>
                {notifications}
            </div>
        </div>
    )
}