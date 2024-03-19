/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "antd";
import axios from "axios";
import { SettingOutlined } from "@ant-design/icons";
import { Collapse, Select } from "antd";
const { Option } = Select;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const ViewMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/members/${id}`
        );
        console.log("Response Data:", response.data);
        setMember(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [id]);

  const [expandIconPosition, setExpandIconPosition] = useState("start");
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key) => {
    console.log(key);
  };
  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );
  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: <div>{text}</div>,
      extra: genExtra(),
    },
  ];

  return (
    <>
      <Card title={member.givenName + " " + member.surname}>
        <div style={{ display: "grid" }}>
          {member ? (
            <div>
              <p>ID: {member._id}</p>
              <p>Name: {member.givenName}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Collapse
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition={expandIconPosition}
          items={items}
        />
      </Card>
    </>
  );
};

export default ViewMember;
