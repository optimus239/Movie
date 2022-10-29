import React, { useState, useEffect } from "react";
import "./AdminLayout.css";

import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
// import React, { useState } from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useQuanLyNguoiDung } from "../../store/quanLyNguoiDung";

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
  getItem(
    <NavLink to="/admin/users">Users</NavLink>,
    "1",
    <PieChartOutlined />
  ),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Film Manager", "3", <UserOutlined />, [
    getItem(<NavLink to="/admin/films">Films</NavLink>, "31"),
    getItem(<NavLink to="/admin/films/addfilm">Add Film</NavLink>, "32"),
    getItem("Alex", "33"),
  ]),
  getItem("Team", "4", <TeamOutlined />, [
    getItem("Team 1", "41"),
    getItem("Team 2", "42"),
  ]),
  getItem("Files", "5", <FileOutlined />),
];

const AdminLayout = () => {
  const { userLogin } = useQuanLyNguoiDung();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userLogin || userLogin.maLoaiNguoiDung !== "QuanTri") {
      navigate("/home");
    }
  });
  const [collapsed, setCollapsed] = useState(false);
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
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["3"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
