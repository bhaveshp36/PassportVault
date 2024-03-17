/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Input, Space } from "antd";


import Members from "./Members";
import Dashboard from "./Dashboard";
import TravelPlan from "./TravelPlan";
import Files from "./Files";
import Settings from "./Settings";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const { Search } = Input;

const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Members", "2", <TeamOutlined />),
  getItem("Travel Plan", "3", <DesktopOutlined />),
  getItem("Files", "4", <FileOutlined />),
  getItem("Settings", "5", <UserOutlined />),
];

const onSearch = (value, _e, info) => console.log(info?.source, value);

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG, colorSplit },
  } = theme.useToken();
  const [selectedMenu, setSelectedMenu] = useState("1");
  const menuOnClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          style={{ marginTop: "2vw" }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={menuOnClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            margin: 0,
            padding: 0,
            background: colorBgContainer,
            width: "auto",
          }}
          align="center"
        >
          <Space direction="vertical" align="center">
            <Search
              style={{
                margin: 10,
                borderRadius: borderRadiusLG,
                width: "50vw",
              }}
              allowClear
              margin="auto"
              placeholder="Search"
              enterButton
              size="large"
              onSearch={onSearch}
            />
          </Space>
        </Header>
        <Content
          style={{
            margin: 0,
            padding: 16,
            background: colorSplit,
          }}
        >
          {(() => {
            switch (selectedMenu) {
              case "1":
                return <Dashboard />;
              case "2":
                return <Members />;
              case "3":
                return <TravelPlan />;
              case "4":
                return <Files />;
              case "5":
                return <Settings />;
            }
          })()}
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Passport Vault ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
