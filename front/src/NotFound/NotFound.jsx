import React from 'react';
import { Link } from "react-router-dom";
export default function NotFound(){

    return(
        <div>
            <h1>404</h1>
            <p>Sorry, the page you are looking for could not be found.</p>
            <Link to={"/home"}></Link>
        </div>
    )
}