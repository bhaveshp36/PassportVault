/* eslint-disable no-unused-vars */
import React, { useState, useEffect, Children } from "react";
import { useNavigate, useLocation, matchPath } from "react-router-dom";
import LayoutContext from "./LayoutContext";
import axios from "axios";

import Cookies from "js-cookie";

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
import { Layout, Menu, theme, Input, Button, Modal } from "antd";

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

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("1");

  const navigate = useNavigate();

  const menuOnClick = (e) => {
    setSelectedMenu(e.key);
    navigate(`/${items[e.key - 1].path}`);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const confirmLogout = () => {
    Modal.confirm({
      title: "Do you want to logout?",
      onOk: handleLogout,
      okType: "danger",
    });
  };

  const handleSearch = async (value) => {
    console.log(`Search query: ${value}`);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/search?q=${value}`
      );
      console.log(`Search results: ${JSON.stringify(response.data, null, 2)}`);
      setSearchResults(response.data);
      const memberid = response.data[0]._id;
      navigate(`/members/${memberid}`);
    } catch (error) {
      console.error(`Error during search: ${error}`);
    }
  };

  return (
    <LayoutContext.Provider value={{ selectedMenu, setSelectedMenu }}>
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
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Search
                style={{
                  borderRadius: borderRadiusLG,
                  width: "30vw",
                }}
                allowClear
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                margin="auto"
                placeholder="Search"
                enterButton
                size="large"
                onSearch={handleSearch}
              />
            </div>

            <Button
              danger
              size="large"
              style={{ margin: 10 }}
              icon={<LogoutOutlined />}
              onClick={confirmLogout}
            >
              Logout
            </Button>
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
    </LayoutContext.Provider>
  );
};

export default LayoutComponent;
