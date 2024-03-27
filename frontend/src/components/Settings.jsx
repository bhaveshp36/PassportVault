/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Space, Descriptions } from "antd";
import axios from "axios";
import LayoutContext from "./LayoutContext";

const { Meta } = Card;

const App = () => {
  const { setSelectedMenu } = useContext(LayoutContext);
  const [organization, setOrganization] = useState(null);
  const [users, setUsers] = useState([]);

  const handleMenu = () => {
    setSelectedMenu(5);
  };

  useEffect(() => {
    handleMenu();
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/organizations/65ffef798e735331738cd320`
      )
      .then((response) => {
        setOrganization(response.data);

        // Fetch users after the organization data is fetched
        return axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/users/parent/${response.data._id}`
        );
      })
      .then((response) => {
        setUsers(response.data); // assuming you have a state variable for users
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      {organization && (
        <Card title={organization.organizationName}>
          <Descriptions title="Organization Info" bordered>
            <Descriptions.Item label="Owner">
              {organization.ownerName}
            </Descriptions.Item>
            <Descriptions.Item label="Entity Type">
              {organization.legalEntityType}
            </Descriptions.Item>
            <Descriptions.Item label="Billing Address">
              {organization.billingInfo.billingAddress}
            </Descriptions.Item>
            <Descriptions.Item label="Contact Person">
              {organization.billingInfo.contactPersonName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {organization.billingInfo.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {organization.billingInfo.phone}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
      <br></br>
      <Card title="Users">
        <Space direction="horizontal" size="middle">
          {users.map((user, index) => (
            <Card
              key={index}
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                }
                title={user.username} // replace with actual user property
                description={user.accessLevel + "\n" + user.email} // replace with actual user property
              />
            </Card>
          ))}
        </Space>
      </Card>
    </>
  );
};
export default App;
