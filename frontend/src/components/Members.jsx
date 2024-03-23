/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, FloatButton, Modal } from "antd";
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
      })
      .catch((error) => {
        // handle error response
        console.error("Error in Updating Member Record", error);
      });
  };

  Modal.info({
    title: "Edit Member",
    content: <UpdateMember memberId={memberId} onSubmit={onSubmit} />,
    //onOk() {},
    width: "80vw", // set the width of the modal to 600 pixels
  });
};

const NewMember = () => {
  Modal.info({
    title: "Add New Member",
    content: <AddMember />,
    //onOk() {},
    width: "60vw",
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
          <a>Delete</a>
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
        <Table
          rowKey={(record) => record._id}
          pagination={{ position: ["bottomCenter"] }}
          bordered
          loading={members.length === 0}
          columns={columns}
          dataSource={members}
          onChange={onChange}
          rowSelection
          style={{ width: "100%", padding: "10px", height: "100%" }}
        />
        <FloatButton onClick={NewMember} />
      </div>
    </>
  );
};
export default Members;
