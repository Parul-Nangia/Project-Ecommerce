import React from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Drop from "./Drop.js";
const { Header } = Layout;

const Top = () => {
  return (
    <>
      <div>
        <Layout>
          <Header className="header" style={{ backgroundColor: "#d22d2d" }}>
            <div
              className="Headermenu"
              style={{
                color: "White",
                fontStyle: "normal",
                marginLeft: "20px",
              }}
            >
              EbullientSoft
              <div
                className="tool"
                style={{
                  display: "flex",
                  marginTop: "2px",
                  float: "right",
                }}
              >
                <Drop />
              </div>
            </div>
          </Header>
        </Layout>
      </div>
    </>
  );
};

export default Top;
