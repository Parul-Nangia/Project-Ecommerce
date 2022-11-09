import {
  DashboardOutlined,
  HomeOutlined,
  PaperClipOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
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
          { label: "DASHBOARD", key: "/dashboard", icon: <HomeOutlined /> },
          {
            label: "ATTENDANCE",
            key: "/attendance",
            icon: <DashboardOutlined />,
          },
          {
            label: "EMPLOYEES",
            key: "/employees",
            icon: <UserOutlined />,
            children: [
              {
                label: "EMPLOYEES DATA ",
                key: "/employees",
                icon: <UserOutlined />,
              },
            ],
          },
          { label: "LEAVE", key: "/leave", icon: <PaperClipOutlined /> },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
