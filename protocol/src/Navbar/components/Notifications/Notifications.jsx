import React, { useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { Link } from "react-router-dom";
import { getNotificationsAction, setNotificationsToLoading } from "../../../redux/actions/Navbar";
import { STARTING_STATUS } from "../../../redux/consts";


const dummy=[]
export default function Notifications(props)
{
    const notifications= useSelector(state=>state.notifications);

    useEffect(()=>
    {
        if(notifications.status===STARTING_STATUS)
        {
            setNotificationsToLoading();
            getNotificationsAction();
        }
    },[]);

    let notificationArr;
    notifications.posts ? notifications.posts.map((element,index)=><Link to={element.link} key={"notification_"+index} className="notificationInners">{element.description}</Link>) : "Loading owo..."
    return(
        <div id="NotificationCont">
            {notificationArr}
        </div>
    )
}