/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import AddMemberModal from "./AddMemberModal";
import Members from "./Members";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Breadcrumb, Layout, Menu, theme, Input } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  getItem("Members", "2", <DesktopOutlined />),
  getItem("Travel Plan", "3", <TeamOutlined />),
  getItem("Files", "4", <FileOutlined />),
  getItem("Settings", "5", <UserOutlined />),
];

console.log("items:", items);
console.log("Backend-Url:", import.meta.env.VITE_BACKEND_URL);
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
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
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div>
            <Input.Search
              size="small"
              placeholder="Search"
              style={{ textAlign: "center" }}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {(() => {
            switch (selectedMenu) {
              case "1":
                return <Members />;
              case "2":
                return <AddMemberModal />;
              case "3":
                return <h1>Travel Plan</h1>;
              case "4":
                return <h1>Files</h1>;
              case "5":
                return <h1>Settings</h1>;
              default:
                return (
                  <>
                    <Breadcrumb
                      style={{
                        margin: "16px 0",
                      }}
                    >
                      <Breadcrumb.Item>User</Breadcrumb.Item>
                      <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                      style={{
                        padding: 24,
                      }}
                    />
                  </>
                );
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
