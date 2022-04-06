import React, { useEffect, useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Menu from "./components/Menu/Menu.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faBell, faStream } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../ReduxToolkit/apiCalls/loginCall";
import { useLocation } from "react-router";
import socket from '../Conversations/socket'
import { useNavigate } from "react-router";
import NavbarCss from "./Navbar.module.css";
import useTabName from "../helpers/CustomHooks/useTabName.js";
import { nextPage, resetPage, setFeedToLoading } from "../ReduxToolkit/reducers/homeSlice.js";
import { searchingAction } from "../ReduxToolkit/reducers/navBarSlice.js";
import { Toast } from "../helpers/alerts/alert";
import Swal from 'sweetalert2';

export default function Navbar() {

  const [showMenu, setShowMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  //const [state] = useState("");
  const [search, setSearch] = useState("");
  const [searchErr, setSearchErr] = useState("");
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.user.currentUser)

  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);


  useEffect(()=> {
    socket.on("getNotification", (data) => {
        setNotifications((prev) => [...prev, data])
    })
  }, [socket])

  useEffect(() => { //
    socket.emit("addUser", user?._id);
  }, [user]);


  //const testingUse= useTabName();

  if (location.pathname.substring(1, 5) !== "home") {
    return "";
  }


  function displayNotifications({ senderName, type }) {
    let action;

    if (type === 1) {
        action= "liked"
    } else if (type === 2) {
        action= "shared"
    } else if (type === 3) {
        action= "commented"
    }

    return (
        <span>{`${senderName} ${action} your post!`}</span>
    )
}

  let menu = [];
  let searchbut;
  showMenu ? (menu = [NavbarCss.menuOpen, NavbarCss.menuShell]) : (menu = [NavbarCss.menuClosed, NavbarCss.movedMenuShell]);
  // if (showNotifications) notifications = <Notifications />;
  search.length > 3 || search.length === 0 ?
  (searchbut = ( <Link to={"/home?search=" + search} id={NavbarCss.searchLink}> <FontAwesomeIcon icon={faSearch} /></Link>))
  :
  (searchbut = (<p id={NavbarCss.searchLink} onClick={() => setSearchErr("owo small, >3 pls uwu")}></p>));

  const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to logout?',
      text: "We will miss you 😥",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser(dispatch);
        navigate('/')
        Toast.fire({
          icon: 'info',
          title: 'Logout successfully',
        })
      }else{
        Toast.fire({
          icon: 'info',
          title: 'We\'re happy that you stay 😀',
        })
      }
    })
  };

  const onClickHandler = () => {
    dispatch(setFeedToLoading());
    dispatch(searchingAction(search));
  };

  function handleRead() {
    setNotifications([])
    setOpen(false)
}

  return (
    <div id={NavbarCss.navbarCont}>
      <div id={NavbarCss.navbarShell}>

        <div id={NavbarCss.paddingIzq} />

        <div id={NavbarCss.menuIcon}>
          <div id={menu[1]} onClick={() => setShowMenu(!showMenu)}>
            <FontAwesomeIcon icon={showMenu? faStream : faBars} />
          </div>
        </div>

        <div id={NavbarCss.SearchContainer}>
          <div id={NavbarCss.inputSearchShell}>
            <input type="text" value={search} name="searchInput" id={NavbarCss.searchInput} onChange={(e) => setSearch(e.target.value)} placeholder={"Search"}/>
          </div>
          <div id={NavbarCss.inputButtonShell}>
            <button onClick={(e) => onClickHandler(e)} id={NavbarCss.searchButton}>{searchbut}</button>
          </div>
          <small>{searchErr}</small>
        </div>

        <div id={NavbarCss.notificationsShell}>
          <div id={NavbarCss.notificationIcon} onClick={()=>setOpen(!open)}><FontAwesomeIcon icon={faBell} /></div>
            { notifications.length > 0 &&
              <div id={NavbarCss.notiNumber}>{notifications.length}</div>
            }
        </div>

        <div id={NavbarCss.paddingDer}>
          <button id={NavbarCss.logoutBut} onClick={() => handleLogout()}>
            LOGOUT
          </button>
        </div>
      </div>
      <div id={menu[0]}>
        <Menu />
      </div>
      {notifications && (
                <div style={{display: open? "flex" : "none"}} id={NavbarCss.notisCont}>
                    <button id={NavbarCss.deletNotisBut} onClick={handleRead}>Delete notifications</button>
                    {notifications.map((n)=> displayNotifications(n))}

                </div>
          )}
    </div>
  );
}
