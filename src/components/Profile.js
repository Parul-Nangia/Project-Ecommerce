import React, { useState, useEffect } from "react";
// import { Col, Row } from "antd";
import Top from "../components/Top";
import Sidebar from "../components/Sidebar";
import Middle from "../components/Middle";
import { Layout } from "antd";
import axios from "axios";
const { Content } = Layout;

const Profile = ({ dataSource }) => {
  // const [view, setView] = useState([]);
  console.log(dataSource, "dataSource");
  const [viewingEmployee, setViewingEmployee] = useState(null);

  useEffect((_id) => {
    viewEmployee(_id);
  }, []);

  const viewEmployee = async (_id) => {
    console.log("hdghja");
    console.log(_id);

    const name = viewingEmployee.name;
    console.log(name, "abc");
    console.log(viewingEmployee, "viewing Employee");
    console.log(viewingEmployee.name, "viewingEmployee.name");
    const email = viewingEmployee.email;
    const gender = viewingEmployee.gender;
    const contact = viewingEmployee.contact;
    const role = viewingEmployee.role;
    await axios.get(`http://localhost:1999/employee/${_id}`, {name,email,gender,contact,role, })
      .then((res) => {});
  };

  
  return (
    <>
      <Layout>
        <Top />
        <Layout>
          <Sidebar />

          <Layout style={{ padding: "0 24px 24px" }}>
            <Middle />
            <Content
              className="site-layout-background"
              style={{ padding: 24, margin: 0, minHeight: 280 }}
            >
              {viewingEmployee?.name}
              {viewingEmployee?.email}
              {viewingEmployee?.contact}
              {viewingEmployee?.gender}
              {viewingEmployee?.role}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Profile;
