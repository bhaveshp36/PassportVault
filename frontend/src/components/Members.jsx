/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Joining",
    dataIndex: "joiningDate",
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
          return {
            ...member,
            joiningDate: member.joiningDate.split("T")[0],
          };
        });
        console.log("temp", temp);
        setMembers(temp);
      }
    };
    fetchData();
  }, []);
  return <Table columns={columns} dataSource={members} onChange={onChange} />;
};
export default Members;
