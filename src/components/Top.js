import { message } from "antd";
import React from "react";
import { useState, useEffect } from "react";

import { Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";
import Drop from "./Drop.js";
const { Header } = Layout;

const Top = () => {
  let user = JSON.parse(localStorage.getItem("user-info"));

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);


  function logOut() {
    localStorage.clear();
    navigate("/");
    // window.location.reload(false);
  }

  const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: "1st menu item",
          key: "1",
          icon: <UserOutlined />,
        },
        {
          label: "2nd menu item",
          key: "2",
          icon: <UserOutlined />,
        },
        {
          label: "3rd menu item",
          key: "3",
          icon: <UserOutlined />,
        },
      ]}
    />
  );

  return (
    <>
      <div>
        <Layout>
          <Header className="header" style={{ backgroundColor: "#d22d2d" }}>
            <div className="logo" />
            <Menu mode="horizontal" className="Headermenu">
              <Menu.Item
                key="1"
                style={{ color: "White", fontStyle: "normal" }}
              >
                Ebullient Soft
              </Menu.Item>
              <div
                className="tool"
                style={{
                  display: "flex",
                  marginTop: "2px",
                  float: "right",
                  marginLeft: "80%",
                }}
              >
                <Drop />
              </div>
            </Menu>
            
          </Header>
        </Layout>
      </div>
    </>
  );
};

export default Top;
