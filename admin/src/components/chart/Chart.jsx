import React from "react";
import "./chart.scss";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* const data = [
  { name: "January", Total: 1200 },
  { name: "February", Total: 2100 },
  { name: "March", Total: 800 },
  { name: "April", Total: 1600 },
  { name: "May", Total: 900 },
  { name: "asd", Total: 1700 },
]; */

const Chart = ({ aspect, title }) => {  
  const orders = useSelector((state) => state.orders?.orders);
  if(orders !== null){


  const arr = orders?.map((order) => {
    return {
      name: order.createdAt.slice(11, 16) + "hs",
      Total: order.amount,
    };
  });

  //funtion that returns last 6 objects of the array
  const last6 = (arr) => {  
    return arr.slice(arr.length - 6);
  };

  const data = last6(arr);

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );

  
  }
};

export default Chart;
