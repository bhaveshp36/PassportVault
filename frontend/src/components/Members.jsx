/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, FloatButton, Modal, Card, Button, message, Form } from "antd";
import { Link } from "react-router-dom";
import AddMember from "./modals/create/AddMember.jsx";
import UpdateMember from "./modals/update/UpdateMember.jsx";

const handleEdit = (memberId) => {
  console.log(memberId);

  const onSubmit = (data) => {
    console.log(data);
    // handle submit logic here
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/members/${memberId}`, data)
      .then((response) => {
        // handle success response
        console.log("Member Record Updated: ", response.data);
        message.success("Member Record Updated Successfully");
      })
      .catch((error) => {
        // handle error response
        console.error("Error in Updating Member Record", error);
        message.error("Error Updating Member Record");
      });
  };

  Modal.info({
    title: "Edit Member",
    content: <UpdateMember memberId={memberId} onSubmit={onSubmit} />,
    onOk: () => {
      Modal.destroyAll();
    },
    width: "80vw", // set the width of the modal to 600 pixels
  });
};

const NewMember = () => {
  Modal.info({
    title: "Add New Member",
    content: <AddMember />,
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
    title: "Are you sure you want to delete this member?",
    content: "This action cannot be undone.",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk: async () => {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/members/${id}`);
        // Refresh the page or fetch the data again here after deletion
        message.success("Member Deleted Successfully");
      } catch (error) {
        message.error("Error Deleting Member");
        console.error(error);
      }
    },
  });
};

const columns = [
  {
    title: "Name",
    dataIndex: "givenName",
  },
  {
    title: "Surname",
    dataIndex: "surname",
  },
  {
    title: "Member Type",
    dataIndex: "memberType",
  },
  {
    title: "Joining",
    dataIndex: "joiningDate",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <>
        <Space size="middle">
          <Link to={`/members/${record._id}`}>View</Link>
          <a onClick={() => handleEdit(record._id)}>Edit</a>
          <a onClick={() => handleDelete(record._id)}>Delete</a>
        </Space>
      </>
    ),
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const Members = () => {
  const [members, setMembers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/members`
      );
      if (response.data) {
        const temp = response.data.map((member) => {
          if (member.joiningDate) {
            return {
              ...member,
              joiningDate: member.joiningDate.split("T")[0],
            };
          }
        });
        console.log("temp", temp);
        setMembers(temp);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <Card
          title="Members"
          style={{ width: "100%", height: "100%" }}
          extra={
            <Button type="primary" onClick={NewMember}>
              Create New Member
            </Button>
          }
        >
          <Table
            rowKey={(record) => record._id}
            pagination={{ position: ["bottomCenter"] }}
            bordered
            loading={members.length === 0}
            columns={columns}
            dataSource={members}
            //onChange={onChange}
            rowSelection
            style={{ width: "100%", padding: "10px", height: "100%" }}
          />
        </Card>
      </div>
    </>
  );
};
export default Members;
