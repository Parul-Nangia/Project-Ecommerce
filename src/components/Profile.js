import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
// import { Col, Row } from "antd";
import Top from "../components/Top";
import Sidebar from "../components/Sidebar";
import Middle from "../components/Middle";
import { Layout, Card } from "antd";
import axios from "axios";
const { Content } = Layout;

const Profile = () => {
  const params = useParams();
  
  console.log(params.id, "params")
  const [id] = useState(params.id);
  console.log(id, "iduser");
  // const [view, setView] = useState([]);
  // console.log(id, "dataSource");
  const [viewingEmployee, setViewingEmployee] = useState(null);

  useEffect(() => {
    console.log(id, "userid")
    viewEmployee(id);
  }, []);

  const viewEmployee = async (id) => {
    console.log("hdghja");
    console.log(id);

    // const name = viewingEmployee.name;
    // console.log(name, "abc");
    // console.log(viewingEmployee, "viewing Employee");
    // console.log(viewingEmployee.name, "viewingEmployee.name");
    // const email = viewingEmployee.email;
    // const gender = viewingEmployee.gender;
    // const contact = viewingEmployee.contact;
    // const role = viewingEmployee.role;
    await axios.get(`http://localhost:1999/employee/${id}`)
      .then((res) => {
        console.log(res, "api response")
        setViewingEmployee(res?.data?.employee)
        console.log(viewingEmployee, "viewingEmployee")
      });
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
              <Card title="General Information" bordered={false} style={{ width: 300 }}>
                <p>Name: {viewingEmployee?.name}</p>
                <p>Email: {viewingEmployee?.email}</p>
                <p>Contact:  {viewingEmployee?.contact}</p>
                <p>Gender:  {viewingEmployee?.gender}</p>
                <p>Role:  {viewingEmployee?.role}</p>
              </Card>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Profile;
