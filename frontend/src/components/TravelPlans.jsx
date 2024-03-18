/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space } from "antd";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "Travel Plan Name",
    dataIndex: "travelPlanName",
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "Date Of Departure",
    dataIndex: "dateOfDeparture",
  },
  {
    title: "Date of Arrival",
    dataIndex: "dateOfArrival",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      console.log("record:", record),
      (
        <Space size="middle">
          <Link to={`/travel-plan/${record._id}`}>View</Link>
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      )
    ),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TravelPlans = () => {
  const [TravelPlans, setTravelPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/travel-plans`
      );
      if (response.data) {
        response.data.map((item) => {
          item.dateOfArrival = item.dateOfArrival.split("T")[0];
          item.dateOfDeparture = item.dateOfDeparture.split("T")[0];
        });
      }

      setTravelPlans(response.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Table
        rowKey={(record) => record._id}
        pagination={{ position: ["bottomRight"] }}
        columns={columns}
        dataSource={TravelPlans}
        onChange={onChange}
      />
    </>
  );
};
export default TravelPlans;
