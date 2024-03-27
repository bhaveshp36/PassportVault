/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Card, Tag } from "antd";
import LayoutComponent from "./Layout";

// const columns = [
//   {
//     title: "Name",
//     dataIndex: "givenName",
//   },
//   {
//     title: "surname",
//     dataIndex: "surname",
//   },
//   {
//     title: "Type",
//     dataIndex: "memberType",
//   },
//   {
//     title: "Date",
//     dataIndex: "joiningDate",
//   },
// ];

const visaAppStatusColumns = [
  {
    title: "Name",
    dataIndex: "givenName",
  },
  {
    title: "Country",
    dataIndex: "surname",
  },
  {
    title: "Visa Type",
    dataIndex: "joiningDate",
  },
  {
    title: "Status",
    dataIndex: "memberType",
    render: (status) => {
      let color;
      if (status === "Witch") {
        color = "volcano";
      } else if (status === "Pending") {
        color = "yellow";
      } else if (status === "Wizard") {
        color = "green";
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    },
  },
];

const upcomingTravelColumns = [
  {
    title: "Name",
    dataIndex: "givenName",
  },
  {
    title: "Country",
    dataIndex: "surname",
  },
  {
    title: "Date of Departure",
    dataIndex: "memberType",
  },
  {
    title: "Date of Arrival",
    dataIndex: "joiningDate",
  },
];
const expiringVisaColumns = [
  {
    title: "Name",
    dataIndex: "memberName",
  },
  {
    title: "Country",
    dataIndex: "country",
  },
  {
    title: "Type",
    dataIndex: "visaType",
  },
  {
    title: "Date of Expiry",
    dataIndex: "validUntil",
  },
];

const expiringPassportsColumns = [
  {
    title: "Name",
    dataIndex: "givenName",
  },
  {
    title: "Surname",
    dataIndex: "surname",
  },
  {
    title: "Passport No",
    dataIndex: "passportNo",
  },
  {
    title: "Expiry Date",
    dataIndex: "expiry",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const App = () => {
  const [expiringVisaData, setExpiringVisaData] = useState([]);
  const [expiringPassportData, setExpiringPassportData] = useState([]);
  const [upcomingTravelData, setUpcomingTravelData] = useState([]);
  const [visaApplicationStatusData, setVisaApplicationStatusData] = useState(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const expiringVisaResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/expiring-visas`
      );
      if (expiringVisaResponse.data) {
        expiringVisaResponse.data.map((data) => {
          if (data.validUntil) {
            data.validUntil = data.validUntil.split("T")[0];
          }
        });
        setExpiringVisaData(expiringVisaResponse.data);
      }

      const expiringPassportResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/expiring-passports`
      );
      if (expiringPassportResponse.data) {
        setExpiringPassportData(expiringPassportResponse.data);
      }

      const upcomingTravelResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/members`
      );
      if (upcomingTravelResponse.data) {
        setUpcomingTravelData(upcomingTravelResponse.data);
      }

      const visaApplicationStatusResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/members`
      );
      if (visaApplicationStatusResponse.data) {
        setVisaApplicationStatusData(visaApplicationStatusResponse.data);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
        }}
      >
        {[
          {
            title: "Expiring Passport",
            data: expiringPassportData,
            columns: expiringPassportsColumns,
          },
          {
            title: "Expiring Visa",
            data: expiringVisaData,
            columns: expiringVisaColumns,
          },
          {
            title: "Upcoming Travel Plan",
            data: upcomingTravelData,
            columns: upcomingTravelColumns,
          },
          {
            title: "Visa Application Status",
            data: visaApplicationStatusData,
            columns: visaAppStatusColumns,
          },
        ].map((item, index) => (
          <Card key={index} title={item.title} style={{}}>
            <Table
              loading={item.data.length === 0}
              size="small"
              scroll={{ y: 300 }}
              rowKey={(record) => record.id}
              pagination={false}
              style={{}}
              bordered={true}
              columns={item.columns}
              dataSource={item.data}
              onChange={onChange}
            />
          </Card>
        ))}
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    //<LayoutComponent>
    <App />
    //</LayoutComponent>
  );
};

export default Dashboard;
