import React from "react";
import { Link } from "react-router-dom";


const dummy=[]
export default function Notifications(props)
{

    let notificationArr=dummy.map((element,index)=><div key={"notification_"+index} className="notificationInners">{element.description}</div>)
    return(
        <div id="NotificationCont">
            {notificationArr}
        </div>
    )
}