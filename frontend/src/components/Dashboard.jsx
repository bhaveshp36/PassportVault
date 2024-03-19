/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Card } from "antd";

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
    dataIndex: "memberType",
  },
  {
    title: "Status",
    dataIndex: "joiningDate",
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
    dataIndex: "givenName",
  },
  {
    title: "Country",
    dataIndex: "surname",
  },
  {
    title: "Type",
    dataIndex: "memberType",
  },
  {
    title: "Date of Expiry",
    dataIndex: "joiningDate",
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

const Dashboard = () => {
  const [expiringVisaData, setExpiringVisaData] = useState([]);
  const [expiringPassportData, setExpiringPassportData] = useState([]);
  const [upcomingTravelData, setUpcomingTravelData] = useState([]);
  const [visaApplicationStatusData, setVisaApplicationStatusData] = useState(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const expiringVisaResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/members`
      );
      if (expiringVisaResponse.data) {
        expiringVisaResponse.data.map((member) => {
          if (member.joiningDate) {
            member.joiningDate = member.joiningDate.split("T")[0];
          }
        });
        setExpiringVisaData(expiringVisaResponse.data);
      }

      const expiringPassportResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/expiringPassports`
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
              size="small"
              scroll={{ y: 300 }}
              rowKey={(record) => record._id}
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

export default Dashboard;
