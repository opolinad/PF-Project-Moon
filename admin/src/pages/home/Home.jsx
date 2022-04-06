import React, { useEffect } from "react";
import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/apiCalls/orderCall";

const Home = () => {
  console.log("Home");
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders?.orders);

  useEffect(() => {
    console.log("useEffect/Home");
    getAllOrders(dispatch);
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="post" />
        </div>
        <div className="charts">
        <Featured />
        <Chart title="Last 5 Orders (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table orders={orders? orders : null} />
        </div>
      </div>
    </div>
  );
};

export default Home;
