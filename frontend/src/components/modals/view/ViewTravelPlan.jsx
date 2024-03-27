/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Space, Table } from "antd";
import axios from "axios";

const ViewTravelPlan = () => {
  const { id } = useParams();
  const [travelPlan, settravelPlan] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/travel-plans/${id}`
        );
        console.log("Response Data:", response.data);
        settravelPlan(response.data);

        console.log("Data fetched successfully!");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  const travelPlanDescriptionItems = [
    {
      key: 1,
      label: "Travel Plan Name",
      children: travelPlan.travelPlanName,
    },
    {
      key: 2,
      label: "Country",
      children: travelPlan.country,
    },
    {
      key: 3,
      label: "Date of Departure",
      children: travelPlan.dateOfDeparture,
    },
    {
      key: 4,
      label: "Date of Arrival",
      children: travelPlan.dateOfArrival,
    },
    {
      key: 5,
      label: "Documents",
      children: travelPlan.documents,
    },
    {
      key: 6,
      label: "Other Info",
      children: travelPlan.otherInfo,
    },
  ];

  const handleEdit = (id) => {};
  const handleDelete = (id) => {};

  const columns = [
    {
      title: "Member Name",
      dataIndex: "givenName",
    },
    {
      title: "Surname",
      dataIndex: "surname",
    },
    {
      title: "Application ID",
      dataIndex: "memberType",
    },
    {
      title: "Status",
      dataIndex: "joiningDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Space size="middle">
            <a onClick={() => handleEdit(record._id)}>Edit</a>
            <a onClick={() => handleDelete(record._id)}>Delete</a>
          </Space>
        </>
      ),
    },
  ];

  return (
    <>
      <Card title={travelPlan.travelPlanName}>
        {travelPlan ? (
          <div>
            <Descriptions
              title="Travel Plan Details"
              column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
              bordered
              items={travelPlanDescriptionItems}
            />
            <br />
            <Table
              rowKey={(record) => record._id}
              pagination={{ position: ["bottomCenter"] }}
              bordered
              loading={travelPlan.length === 0}
              columns={columns}
              //dataSource={travelPlan}
              //onChange={onChange}
              rowSelection
              style={{ width: "100%", padding: "10px", height: "100%" }}
            />
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Card>
    </>
  );
};

export default ViewTravelPlan;
