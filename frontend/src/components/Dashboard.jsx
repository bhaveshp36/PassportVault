/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Card } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "givenName",
  },
  {
    title: "surname",
    dataIndex: "surname",
  },
  {
    title: "Type",
    dataIndex: "memberType",
  },
  {
    title: "Date",
    dataIndex: "joiningDate",
  },
];

const expiringPassportscolumns = [
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

  const cardStyle = {
    width: "100%",
    height: "100%",
    padding: "0px",
    margin: "0",
  };

  const tableStyle = {
    height: "100%",
    width: "100%",
    margin: "0",
    padding: "0",
  };

  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }}>
        <Space style={{ display: "flex" }}>
          <Card bordered={false} title="Expiring Passport" style={cardStyle}>
            <Table
              size="small"
              virtual={true}
              scroll={{ y: true }}
              rowKey={(record) => record._id}
              pagination={false}
              style={tableStyle}
              bordered={true}
              columns={columns}
              dataSource={expiringVisaData}
              onChange={onChange}
            />
          </Card>

          <Card bordered={false} title="Expiring Visa" style={cardStyle}>
            <Table
              virtual={true}
              size="small"
              scroll={{ y: true }}
              rowKey={(record) => record._id}
              pagination={false}
              style={tableStyle}
              bordered={true}
              columns={columns}
              dataSource={expiringVisaData}
              onChange={onChange}
            />
          </Card>
        </Space>
        <Space>
          <Card bordered={false} title="Upcoming Travel Plan" style={cardStyle}>
            <Table
              virtual={true}
              size="small"
              scroll={{ y: true }}
              rowKey={(record) => record._id}
              pagination={false}
              style={tableStyle}
              bordered={true}
              columns={columns}
              dataSource={expiringVisaData}
              onChange={onChange}
            />
          </Card>

          <Card
            bordered={false}
            title="Visa Application Status"
            style={cardStyle}
          >
            <Table
              virtual={true}
              size="small"
              scroll={{ y: true }}
              rowKey={(record) => record._id}
              pagination={false}
              style={tableStyle}
              bordered={true}
              columns={columns}
              dataSource={expiringVisaData}
              onChange={onChange}
            />
          </Card>
        </Space>
      </Space>
    </>
  );
};

export default Dashboard;
