import React from "react";
import { Link } from "react-router-dom";


const dummy=[]
export default function Notifications(props)
{

    let notificationArr;
    dummy ? dummy.map((element,index)=><Link to={element.link} key={"notification_"+index} className="notificationInners">{element.description}</Link>) : "Loading owo..."
    return(
        <div id="NotificationCont">
            {notificationArr}
        </div>
    )
}