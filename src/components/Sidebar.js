import {
  DashboardOutlined,
  HomeOutlined,
  PaperClipOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token1");
  var decoded = jwt_decode(token);

  if (decoded.role === "admin") {
    return (
      <Sider width={200} className="site-layout-background">
        <Menu
          className="Sidemenubar"
          onClick={({ key }) => {
            if (key === "dashboard") {
            } else {
              navigate(key);
            }
          }}
          mode="inline"
          items={[
            {
              label: "DASHBOARD",
              key: "/dashboard",
              icon: <HomeOutlined />
            },
            {
              label: "ATTENDANCE",
              key: "/attendance",
              icon: <DashboardOutlined />,
            },
            {
              label: "EMPLOYEES",
              key: "/employees",
              icon: <UserOutlined />,
            },
            {
              label: "LEAVE",
              key: "/leave",
              icon: <PaperClipOutlined />
            },
          ]}
        />
      </Sider>
    );
  } else if (decoded.role === "employee") {
    return (
      <Sider width={200} className="site-layout-background">
        <Menu
          className="Sidemenubar"
          onClick={({ key }) => {
            if (key === "dashboard") {
            } else {
              navigate(key);
            }
          }}
          mode="inline"
          items={[
            {
              label: "DASHBOARD",
              key: "/dashboard",
              icon: <HomeOutlined />
            },
            {
              label: "ATTENDANCE",
              key: "/attendance",
              icon: <DashboardOutlined />,
            },
            {
              label: "LEAVE",
              key: "/leave",
              icon: <PaperClipOutlined />
            },
          ]}
        />
      </Sider>
    );
  } else {
    console.log("Not admin/ Not employee")
  }
};

export default Sidebar;
