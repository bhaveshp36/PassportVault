/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Card, Modal, message, Button } from "antd";
import { Link } from "react-router-dom";

import AddTravelPlan from "./modals/create/AddTravelPlan.jsx";
import UpdateTravelPlan from "./modals/update/UpdateTravelPlan.jsx";

const handleAdd = () => {
  Modal.info({
    title: "Add New Travel Plan",
    content: <AddTravelPlan />,
    onOk: () => {
      Modal.destroyAll();
    },
    width: "60vw",
    closable: true,
    okText: "Close",
  });
};

const handleEdit = (id) => {
  Modal.info({
    title: "Edit Travel Plan",
    content: (
      <UpdateTravelPlan
        travelPlansId={id}
        onSubmit={(data) => {
          console.log(data);
          axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/travel-plans/${id}`, data)
            .then((response) => {
              console.log("Travel Plan Record Updated: ", response.data);
              message.success("Travel Plan Record Updated Successfully");
              Modal.destroyAll();
            })
            .catch((error) => {
              console.error("Error in Updating Travel Plan Record", error);
              message.error("Error Updating Travel Plan Record");
            });
        }}
      />
    ),
    onOk: () => {
      Modal.destroyAll();
    },
    width: "60vw",
    closable: true,
    okText: "Close",
  });
};

const handleDelete = (id) => {
  Modal.confirm({
    title: "Are you sure you want to delete this Travel Plan?",
    content: "This action cannot be undone.",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk: async () => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/travel-plans/${id}`
        );
        // Refresh the page or fetch the data again here after deletion
        message.success("Travel Plan Deleted Successfully");
      } catch (error) {
        message.error("Error Deleting Travel Plan");
        console.error(error);
      }
    },
  });
};

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
          <a
            onClick={(event) => {
              console.log("getExtra:Clicked", event.altKey);
              console.log("Item:", record);
              // If you don't want click extra trigger collapse, you can prevent this:
              event.stopPropagation();
            }}
          >
            Edit
          </a>
          <a
            onClick={(event) => {
              console.log("getExtra:Clicked", event.altKey);
              console.log("Item:", record);
              // If you don't want click extra trigger collapse, you can prevent this:
              event.stopPropagation();
            }}
          >
            Delete
          </a>
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
      <Card
        title="Travel Plans"
        extra={
          <Button type="primary" onClick={handleAdd}>
            Create New Travel Plan
          </Button>
        }
      >
        <Table
          rowKey={(record) => record._id}
          pagination={{ position: ["bottomRight"] }}
          columns={columns}
          dataSource={TravelPlans}
          onChange={onChange}
        />
      </Card>
    </>
  );
};
export default TravelPlans;
