import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Top from "../components/Top";
import Sidebar from "../components/Sidebar";
import Middle from "../components/Middle";
import { Layout, Card } from "antd";
import axios from "axios";
const { Content } = Layout;

const Profile = () => {
  const params = useParams();

  console.log(params.id, "params");
  const [id] = useState(params.id);
  console.log(id, "iduser");

  const [viewingEmployee, setViewingEmployee] = useState(null);

  useEffect(() => {
    console.log(id, "userid");
    viewEmployee(id);
  }, []);

  const viewEmployee = async (id) => {
    console.log(id);

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${id}`)
      .then((res) => {
        console.log(res, "api response");
        setViewingEmployee(res?.data?.myData);
        console.log(viewingEmployee, "viewingEmployee");
      });
  };

  return (
    <>
      <Card title="General Information" bordered={false} style={{ width: 300 }}>
        <p>Name: {viewingEmployee?.name}</p>
        <p>Email: {viewingEmployee?.email}</p>
        <p>Contact: {viewingEmployee?.contact}</p>
        <p>Gender: {viewingEmployee?.gender}</p>
        <p>Role: {viewingEmployee?.role}</p>
      </Card>
    </>
  );
};

export default Profile;
