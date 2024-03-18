/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
import ViewMember from "./Modals/ViewMember.jsx";

const { Header, Content, Footer, Sider } = Layout;

function getItem(path, label, key, icon, children) {
  return {
    path,
    key,
    icon,
    children,
    label,
  };
}
const { Search } = Input;

const items = [
  getItem("dashboard", "Dashboard", "1", <PieChartOutlined />),
  getItem("members", "Members", "2", <TeamOutlined />),
  getItem("travel-plan", "Travel Plan", "3", <DesktopOutlined />),
  getItem("files", "Files", "4", <FileOutlined />),
  getItem("settings", "Settings", "5", <UserOutlined />),
];

const onSearch = (value, _e, info) => console.log(info?.source, value);

const LayoutComponent = () => {
  const {
    token: { colorBgContainer, borderRadiusLG, colorSplit },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");

  const navigate = useNavigate();

  const menuOnClick = (e) => {
    setSelectedMenu(e.key);
    navigate(`/${items[e.key - 1].path}`);
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
        <Content style={{ margin: 0, padding: 16, background: colorSplit }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/travel-plan" element={<TravelPlan />} />
            <Route path="/files" element={<Files />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/members/:id" element={<ViewMember />} />
          </Routes>
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
const App = () => {
  return (
    <Router>
      <LayoutComponent />
    </Router>
  );
};
export default App;
