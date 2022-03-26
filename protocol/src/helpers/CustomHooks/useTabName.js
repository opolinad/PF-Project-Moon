import React, {useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router"; 

export default function useTabName()
{

    const userData = useSelector((state) => state.userData);
    const [tabName, setTabName] = useState("Protocol Moon °°");
    const location = useLocation();

    function titleScroller() 
    {
        // if(tabName === "Protocol Moon °°") 
        // {
        //     document.title = text;
        // }
        // else 
        // {
        //     document.title = tabName;
        // }
        // setTimeout(function () {
        //     titleScroller(text.substr(1) + text.substr(0, 1));
        // }, 500);
    }

    useEffect(()=>
    {
        
        let raw = location.pathname.split("/");
        let out="Protocol Moon | ";
        if(raw[1]==="users")
        {
            console.log(userData.currentUser)
            out = out + raw[1] + " | " + userData.currentUser?.fullname;
            if(raw.length>3)
            {
                out = out + " | " + raw[3];
            }
        }
        else if (raw[1]==="home")
        {
            out = out + raw[1];
        }  
        
        //console.log("location changed",out,raw)
        
        document.title = out;
        setTabName(out);

    },[location])

   
}