import React, { useEffect, useState } from "react";
import "./usersList.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableUser from "../../components/datatableUser/DatatableUser";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/apiCalls/usersCall/userCall";

const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getAllUsers(dispatch).then((response) => setisLoading(false));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableUser users={users} />
      </div>
    </div>
  );
};

export default UsersList;
