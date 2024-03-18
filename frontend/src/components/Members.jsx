/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, FloatButton, Modal } from "antd";
import { Link } from "react-router-dom";
import AddMember from "./Modals/AddMember";

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
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      </>
    ),
  },
];
const NewMember = () => {
  Modal.info({
    title: "Add New Member",
    content: <AddMember />,
    onOk() {},
  });
};
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
      <Table
        rowKey={(record) => record._id}
        pagination={{ position: ["bottomRight"] }}
        columns={columns}
        dataSource={members}
        onChange={onChange}
      />
      <FloatButton onClick={NewMember} />
    </>
  );
};
export default Members;
