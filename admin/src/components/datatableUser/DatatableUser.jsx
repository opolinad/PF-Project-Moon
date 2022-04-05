import { useState } from "react";
import "./datatableUser.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { editUser } from "../../redux/apiCalls/editUserCall"
import { useDispatch, useSelector } from "react-redux";

const Datatable = ({ users }) => {
  const [data, setData] = useState(users);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleBan = (id) => {
    //setData(data.filter((item) => item._id !== id));
    editUser(dispatch, id, currentUser.accessToken, true);
  };
  const handleUnban = (id) => {
    //setData(data.filter((item) => item._id !== id));
    editUser(dispatch, id, currentUser.accessToken, false);
  };

  const userColumns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "profilePhoto",
      headerName: "Profile",
      width: 70,
      renderCell: (params) => {
        //console.log(params);
        return (
          <div className="cellWithImg">
            <img
              className="cellImg"
              src={
                params.row.profilePhoto ||
                "http://panel.guerreroyroaconsultores.com/inc/fle/abog/abog_06e75ab7666cb5bb2dfbee89a9c0c693ab94debf.jpg"
              }
              alt="avatar"
            />
          </div>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellDate">{params.row.username || "Username"}</div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 190,
    },
    {
      field: "followers",
      headerName: "Followers",
      width: 100,
      renderCell: (params) => {
        return <div className="cellDate">{params.row.followers.length}</div>;
      },
    },
    {
      field: "followings",
      headerName: "Followings",
      width: 100,
      renderCell: (params) => {
        return <div className="cellDate">{params.row.followings.length}</div>;
      },
    },
    {
      field: "createdAt",
      headerName: "Created",
      width: 100,
      renderCell: (params) => {
        return <div className="cellDate">{format(params.row.createdAt)}</div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div className="banButton" onClick={() => handleBan(params.row._id)}>
              ban
            </div>
            <div
              className="unbanButton"
              onClick={() => handleUnban(params.row._id)}
            >
              unban
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New User
        <Link
          to="/users/new"
          style={{ textDecoration: "none" }}
          className="link"
        >
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns}
        pageSize={9}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
