/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space } from "antd";

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
      console.log("record:", record),
      (
        <Space size="middle">
          <a>View</a>
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
        style={{ padding: "20px", width: "100%", height: "80vh" }}
      />
    </>
  );
};
export default Members;
