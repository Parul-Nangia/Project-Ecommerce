import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  Row,
  Col,
  Button,
  InputNumber,
} from "antd";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
import { max } from "date-fns";
const { Option } = Select;
// const { Content } = Layout;

const Profile = () => {
  const params = useParams();
  //  console.log(params.id, "params");
  const [id] = useState(params.id);
  // console.log(id, "iduser");

  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [joiningDate, setJoiningDate] = useState(
    new Date().toLocaleDateString("fr-FR")
  );
  // const[joiningDate,setJoiningdate]=useState()
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [permanentAddress, setPermanentAddress] = useState();
  const [adharNumber, setAdharNumber] = useState();
  const [panNumber, setPanNumber] = useState();
  const [salary, setSalary] = useState();
  const [appraisal, setAppraisal] = useState(
    new Date().toLocaleDateString("fr-FR")
  );
  // const[appraisal,setAppraisal]=useState()

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
        // console.log(viewingEmployee, "viewingEmployee");
      });
  };
  const SelectOne = (value) => {
    setBloodGroup(value);
    console.log("Blood Group", value);
  };
  const Submithere = () => {
    // e.preventDefault();
    console.log("hello");
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/user/${id}`, {
        fatherName,
        motherName,
        joiningDate,
        bloodGroup,
        permanentAddress,
        adharNumber,
        contactNumber,
        panNumber,
        salary,
        appraisal,
      })
      .then(() => {});
  };
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Card title="General Information" bordered={false} style={{ width: 300 }}>
        <p>Name: {viewingEmployee?.name}</p>{" "}
        <p> Joining Date:{viewingEmployee?.joiningDate}</p>
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
        onFinish={Submithere}
        // onSubmit={Submithere}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={12} style={{ padding: "10px 10px" }}>
            <Form.Item label="Date of Joining">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                //  value={joiningDate}
                onChange={(date) => {
                  const d = new Date(date).toLocaleDateString("fr-FR");
                  console.log(d);
                  setJoiningDate(d);
                }}
              />
            </Form.Item>
            <Form.Item
              label="Father Name"
              name="setFatherName"
              rules={[
                {
                  required: true,
                  message: "Please Input Your Name!",
                  whitespace: true,
                },
                {
                  pattern: new RegExp(
                    /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+\s*[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
                  ),
                  // pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
                  message: "please Input alphabets only",
                },
              ]}
            >
              <Input
                placeholder="Type Your Name"
                value={fatherName}
                onChange={(e) => {
                  setFatherName(() => {
                    console.log("Father Name  " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              label="Mother Name"
              name="setmotherName"
              rules={[
                {
                  required: true,
                  message: "Please Input Your Name!",
                  whitespace: true,
                },
                {
                  pattern: new RegExp(
                    /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+\s*[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
                  ),
                  // pattern: /^([A-Z][a-z]+\s)*[A-Z][a-z]+$/,
                  message: "please Input alphabets only",
                },
              ]}
            >
              <Input
                placeholder="Type your Name"
                value={motherName}
                onChange={(e) => {
                  setMotherName(() => {
                    console.log("Mother Name " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item label="Blood Group">
              <Select
                defaultValue={{
                  value: "Select",
                }}
                onChange={SelectOne}
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
            <Form.Item
              label="Emergency Contact Number"
              name="setContactNumber"
              rules={[
                {
                  // type:"number",
                  required: true,
                 
                  message: "please input your valid number",
                  max: 10,
                  min:10,
                },
                {
                  // pattern:/^[2-9]{2}[0-9]{8}$/,
                  // pattern: new RegExp(/\d+/g),
                  pattern:/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,

                  message: "Please input Valid Contact number!",
                },
              ]}
            >
              <Input
                placeholder="Type your Contact number"
                //  min={0}
                //  style={{width:'100%'}}
                onChange={(e) => {
                  setContactNumber(() => {
                    console.log("Contact Number " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={12} style={{ padding: "10px 10px" }}>
            <Form.Item
              label="Permanent Address"
              name="setPermanentAddress"
              rules={[
                {
                  // required:true,
                  message: "Please Input Your Address!",
                },
              ]}
            >
              <TextArea
                placeholder="Type your Address"
                value={permanentAddress}
                onChange={(e) => {
                  setPermanentAddress(() => {
                    console.log("Permanent Address " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></TextArea>
            </Form.Item>
            <Form.Item
              label="Aadhar card Number"
              name="setAdharNumber"
              rules={[
                {
                  required: true,
                  message: "please input your Aadhar card number",
                  whitespace: true,
                  max: 12,
                  min: 10,
                },
                {
                  // pattern: new RegExp(/\d+/g),
                  pattern:/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                  message: " Input only number!",
                },
              ]}
            >
              <Input
                placeholder="Aadhar Number"
                value={adharNumber}
                onChange={(e) => {
                  setAdharNumber(() => {
                    console.log("Aadhar Number " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              label="PAN card Number"
              name="setPanNumber"
              rules={[
                {
                  required: true,
                  message: "Please Input Your pancard Number!",
                  whitespace: true,
                },
                {
                  pattern: new RegExp(/^[a-zA-Z0-9]*$/),

                  message: "Input only string & number without space",
                },
              ]}
            >
              <Input
                placeholder="Type your pancard number"
                value={panNumber}
                onChange={(e) => {
                  setPanNumber(() => {
                    console.log("Pan Number " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              label="Current Salary"
              name="setSalary"
              rules={[
                {
                  required: true,
                  message: "Input only numbers!",
                  whitespace: true,
                },
                {
                  // pattern: new RegExp(/^[a-zA-Z0-9]*$/),
                  pattern:/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                  message: "Input only number without space",
                },
              ]}
            >
              <Input
                placeholder="Current Salary"
                value={salary}
                onChange={(e) => {
                  setSalary(() => {
                    console.log("Salary" + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item label="Last Appraisal Date">
              <DatePicker
                dateFormat="dd/MM/yyyy"
                //  value={joiningDate}
                onChange={(date) => {
                  const d = new Date(date).toLocaleDateString("fr-FR");
                  console.log(d);
                  setAppraisal(d);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Row justify="center">
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default Profile;
