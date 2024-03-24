/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Children } from "react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Input, Space, Avatar, Dropdown } from "antd";

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

const LayoutComponent = (
  { children } // eslint-disable-line
) => {
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
      {/* <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        
      </Sider>
       */}
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />
          <Menu
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="horizontal"
            items={items}
            onClick={menuOnClick}
          />
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Search
              style={{
                borderRadius: borderRadiusLG,
                width: "30vw",
              }}
              allowClear
              margin="auto"
              placeholder="Search"
              enterButton
              size="large"
              onSearch={onSearch}
            />
          </div>

          <Avatar
            shape="square"
            size={"large"}
            icon={<UserOutlined />}
            style={{ margin: 10 }}
          />
        </Header>
        <Content style={{ margin: 0, padding: 16, background: colorSplit }}>
          {children}
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

export default LayoutComponent;
