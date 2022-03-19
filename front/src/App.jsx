import React, { Fragment } from "react";

import "./App.css"
import Navbar from "./Navbar/Navbar.jsx";

export default function App()
{
  return(      
    <div id="appCont">
      <BrowserRouter>
        <Routes>
          <Route path= '/'>
            <Route index element={<LandingPage/>}/>
            <Route path= 'register' element={<Register/>}/>
            <Route path= 'home' element={<Home/>}/>
            <Route path={"user/*"} element={<Fragment><User/><UserBoard/></Fragment>}/>
            <Route path="*" element={<NotFound/>} />
          </Route>  
        </Routes>
      </BrowserRouter>
    </div>
  )
}
