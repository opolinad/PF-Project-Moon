import { useState } from "react";
import "./datatablePosts.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Datatable = ({ posts }) => {
  const [data, setData] = useState(posts);

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  const userColumns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "categories",
      headerName: "Categories",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellDate">
            <select className="cellSelect">
              <option>Categories</option>
              {params.row.categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        );
      },
    },
    {
      field: "images",
      headerName: "Images",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellDate">
            <select className="cellSelect">
              <option className="cellSelectOption">Images</option>
              {params.row.images.map((image) => (
                <option className="cellSelectOption" key={image}>
                  {image}
                </option>
              ))}
            </select>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 190,
    },
    // {
    //   field: "profilePhoto",
    //   headerName: "Profile",
    //   width: 70,
    //   renderCell: (params) => {
    //     console.log(params);
    //     return (
    //       <div className="cellWithImg">
    //         <img
    //           className="cellImgPost"
    //           src={
    //             params.row.user ||
    //             "https://png.pngtree.com/background/20210712/original/pngtree-modern-double-colors-neon-lights-on-brick-background-picture-image_1170045.jpg"
    //           }
    //           alt="avatar"
    //         />
    //       </div>
    //     );
    //   },
    // },
    // {
    //   field: "followers",
    //   headerName: "Followers",
    //   width: 100,
    //   renderCell: (params) => {
    //     return <div className="cellDate">{params.row.followers.length}</div>;
    //   },
    // },
    // {
    //   field: "followings",
    //   headerName: "Followings",
    //   width: 100,
    //   renderCell: (params) => {
    //     return <div className="cellDate">{params.row.followings.length}</div>;
    //   },
    // },
    // {
    //   field: "createdAt",
    //   headerName: "Created",
    //   width: 100,
    //   renderCell: (params) => {
    //     return <div className="cellDate">{format(params.row.createdAt)}</div>;
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      width: 140,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
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
