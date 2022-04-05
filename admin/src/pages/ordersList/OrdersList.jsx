import React, { useEffect, useState } from "react";
import "./ordersList.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/apiCalls/orderCall";
import DatatableOrders from "../../components/datatableOrders/DatatableOrders";

const OrdersList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllOrders(dispatch).then((response) => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableOrders orders={orders} />
      </div>
    </div>
  );
};

export default OrdersList;
