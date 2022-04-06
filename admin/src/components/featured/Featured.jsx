import React from "react";
import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const Featured = () => {
  const orders = useSelector((state) => state.orders?.orders);

  //funtion that returns all the orders of today
  const lastDay = orders.filter((order) => {
    return order.createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10);
  });
  const lastDayTotal = lastDay.reduce((acc, order) => {
    return acc + order.amount;
  }, 0);
  console.log(lastDayTotal);

  //funtion that return the date of yesterday
  const yesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().slice(0, 10);
  };
  const previousDay = orders.filter((order) => {
    return order.createdAt.slice(0, 10) === yesterday();
  });
  const previousDayTotal = previousDay.reduce((acc, order) => {
    return acc + order.amount;
  }, 0);

  //function that return the dates of the last 7 days
  const last7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().slice(0, 10));
    }
    return dates;
  };
  const Last7DaysOrders = orders.filter((order) => {
    return last7Days().includes(order.createdAt.slice(0, 10));
  });
  const Last7DaysTotal = Last7DaysOrders.reduce((acc, order) => {
    return acc + order.amount;
  }, 0);

  const targetByDay = 5000;

  //function that calculate the percentage of lastDayTotal in targetByDay
  const lastDayPercentage = (lastDayTotal * 100) / targetByDay;

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={lastDayPercentage} text={lastDayPercentage} strokeWidth={5} />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">$ {lastDayTotal}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target by day</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$ {targetByDay}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Yesterday</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$ {previousDayTotal}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small" />
              <div className="resultAmount">$ {Last7DaysTotal}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
