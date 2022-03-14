import React, { useState } from "react";
import Menu from "./components/Menu/Menu.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";

export default function Navbar()
{

    const [showMenu,setShowMenu] = useState(false);
    const [showNotifications,setShowNotifications] = useState(false);
    const [search,setSearch] = useState("");

    function searching()
    {
        
    }

    let menu;
    let notifications;
    if(showMenu) menu=<Menu/>
    if(showNotifications) notifications=<Notifications/>;
    return(
        <div id="navbarShell">
            <div id="menuIcon">
                <div id="menuShell" onClick={()=>setShowMenu(!showMenu)}>Menu</div>
                {menu}
            </div>
            
            <div id="SearchContainer">
                <div id="inputSearchShell"><input type="text" value={search} name="searchInput" id="searchInput" onChange={(e)=>setSearch(e.target.value)} placeholder={"Search"} /></div>
                <div id="inputButtonShell"><button onClick={searching} id="searchButton">owo!</button></div>
            </div>
            <div id="notificationsShell">
            <div id="notificationIcon" onClick={()=>setShowNotifications(!showNotifications)}>Notis</div>
                {notifications}
            </div>
        </div>
    )
}