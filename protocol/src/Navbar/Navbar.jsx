import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Menu from "./components/Menu/Menu.jsx";
import Notifications from "./components/Notifications/Notifications.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faBell } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../ReduxToolkit/apiCalls/loginCall";
import { useLocation } from "react-router";

import NavbarCss from "./Navbar.module.css";
import useTabName from "../helpers/CustomHooks/useTabName.js";
import { nextPage, resetPage, setFeedToLoading } from "../ReduxToolkit/reducers/homeSlice.js";
import { searchingAction } from "../ReduxToolkit/reducers/navBarSlice.js";

export default function Navbar() {
  
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [state] = useState("");
  const [search, setSearch] = useState("");
  const [searchErr, setSearchErr] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const currentUser = useSelector((state) => state.userData.currentUser);
  console.log(location.pathname.substring(1, 5) !== "home");

  const testingUse= useTabName();

  if (location.pathname.substring(1, 5) !== "home") {
    return "";
  }

  function searching() {
    //dispatch(Actions.resetForSearch());  //resetea filter, order y selectedCategory cuando se hace search
    //dispatch(Actions.searchingAction(search)); //setea search en redux
    //dispatch(Actions.setSearchingToLoading()); //setea feed a loading
    //dispatch(Actions.searchingDataBaseAction(search)); //envia pedido a back
  }

  function showNotification() {
    setShowNotifications(!showNotifications);
    //dispatch(Actions.setNotificationsToLoading());
    //dispatch(Actions.getNotificationsAction());
  }

  let menu = [];
  let notifications;
  let searchbut;
  showMenu
    ? (menu = [NavbarCss.menuOpen, NavbarCss.menuShell])
    : (menu = [NavbarCss.menuClosed, NavbarCss.movedMenuShell]);
  if (showNotifications) notifications = <Notifications />;
  search.length > 3 || search.length === 0
    ? (searchbut = (
        <Link
          to={"/home?search=" + search}
          onClick={searching}
          id={NavbarCss.searchLink}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Link>
      ))
    : (searchbut = (
        <p
          id={NavbarCss.searchLink}
          onClick={() => setSearchErr("owo small, >3 pls uwu")}
        ></p>
      ));

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  const onClickHandler = () => {
    dispatch(setFeedToLoading());
    dispatch(searchingAction(search));
  };

  return (
    <div id={NavbarCss.navbarCont}>
      <div id={NavbarCss.navbarShell}>

        <div id={NavbarCss.paddingIzq} />

        <div id={NavbarCss.menuIcon}>
          <div id={menu[1]} onClick={() => setShowMenu(!showMenu)}>
            <FontAwesomeIcon icon={faBars} />
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
          <div id={NavbarCss.notificationIcon} onClick={showNotification}>
            <FontAwesomeIcon icon={faBell} />
          </div>
          {notifications}
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
    </div>
  );
}
