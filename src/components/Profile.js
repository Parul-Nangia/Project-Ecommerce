import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, DatePicker, Select, Card, Row, Col, Button } from "antd";

// import Top from "../components/Top";
// import Sidebar from "../components/Sidebar";
// import Middle from "../components/Middle";
import axios from "axios";
const { Option } = Select;
// const { Content } = Layout;

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
      <Form
        name="basic"
        // layout="inline"
        // labelCol={{
        //   span: 12,
        // }}
        // wrapperCol={{
        //   span: 12,
        // }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row >
          <Col span={12} style={{padding:"10px 10px"}}>
            <Form.Item label="Date of Joining">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Father Name">
              <Input />
            </Form.Item>
            <Form.Item label="Mother Name">
              <Input />
            </Form.Item>
            <Form.Item label="Blood Group">
              <Select
                defaultValue={{
                  value: "Select",
                }}
                // onChange={}
              >
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Emergency Contact Number">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} style={{padding:"10px 10px"}}>
            <Form.Item label="Permanent Address">
              <Input />
            </Form.Item>
            <Form.Item label="Aadhar card Number">
              <Input />
            </Form.Item>
            <Form.Item label="PAN card Number">
              <Input />
            </Form.Item>
            <Form.Item label="Current Salary">
            <Input />
          </Form.Item>
          <Form.Item label="Last Appraisal Date">
            <DatePicker />
          </Form.Item>
          </Col>
        </Row>
        <Row justify="center"><Button>submit</Button></Row>

      </Form>
    </>
  );
};

export default Profile;
