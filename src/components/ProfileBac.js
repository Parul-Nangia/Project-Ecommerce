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
} from "antd";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
// import { max } from "date-fns";
const { Option } = Select;
// const { Content } = Layout;

const Profile = () => {
  const params = useParams();
  //  console.log(params.id, "params");
  const [id] = useState(params.id);
  // console.log(id, "iduser");

  const [viewingEmployee, setViewingEmployee] = useState(null);
  // const [form] = Form.useForm();
  // const [joiningDate, setJoiningDate] = useState( );
  // const[joiningDate,setJoiningdate]=useState()
  const [editingName, setEditingName] = useState();
  // const [motherName, setMotherName] = useState();
  // const [bloodGroup, setBloodGroup] = useState();
  // const [contactNumber, setContactNumber] = useState();
  // const [permanentAddress, setPermanentAddress] = useState();
  // const [adharNumber, setAdharNumber] = useState();
  // const [panNumber, setPanNumber] = useState();
  // const [salary, setSalary] = useState();
  // const [appraisal, setAppraisal] = useState();
  // const[appraisal,setAppraisal]=useState()

  useEffect(() => {
    console.log(id, "userid");
    viewEmployee(id)
;
  }, []);

  const viewEmployee = async (id) => {
    console.log(id)
;

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${id}`)
      .then((res) => {
        console.log(res, "api response");
        setViewingEmployee(res?.data?.myData);
        // setFatherName(res?.data?.myData);
        
        // console.log(setViewingEmployee, "viewingEmployee");
      });
  };
  const SelectOne = (value) => {
    setEditingName(value);
    console.log("Blood Group", value);
  };
  const Submithere = () => {
     // form.resetFields();
    // e.preventDefault();
    const fatherName = editingName.fatherName;
    const motherName = editingName.motherName;
    const joiningDate = editingName.joiningDate;
    const bloodGroup = editingName.bloodGroup;
    const permanentAddress = editingName.permanentAddress;
    const adharNumber = editingName.adharNumber;
    const contactNumber = editingName.contactNumber;
    const panNumber = editingName.panNumber;
    const salary = editingName.salary;
    const appraisal = editingName.appraisal;
    
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
      .then((res) => {console.log(res, "response");});
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
        <p>Email: {viewingEmployee?.email}</p>
        <p>Contact: {viewingEmployee?.contact}</p>
        <p>Gender: {viewingEmployee?.gender}</p>
        <p>Role: {viewingEmployee?.role}</p>
      </Card>
      <Form
        name="basic"
         // form={form}
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
           <Form.Item 
            label="Date of Joining"
            name="setEditingName"
            rules={[
              {
                required: true,
                message: "Select Your Date!",
              },
            ]}
            >
              
              <DatePicker
                dateFormat="dd/MM/yyyy"
                //  value={joiningDate}
                // onChange={(date) => {
                //   const d = new Date(date).toLocaleDateString("fr-FR");
                //   console.log(d);
                onChange={(e)=>{
                  setEditingName([e.format("dd/MM/yyyy")]);
                }}
              />
              
            </Form.Item>
            <Form.Item
              label="Father Name"
              name="setEditingName"
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
                value={editingName?.fatherName}
                // value={viewingEmployee?.fatherName}
                onChange={(e) => {
                  setEditingName((pre) => {
                    console.log("Father Name  " + e.target.value);
                    return { ...pre, fatherName:e.target.value};
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              label="Mother Name"
              name="setEditingName"
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
                value={editingName?.motherName}
                onChange={(e) => {
                  setEditingName(() => {
                    console.log("Mother Name " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item
             label="Blood Group"
             name="setEditingName"
                          rules={[{
                           required:true,
                           message:"Select a option "
                          }]}>
              <Select
              placeholder="Select"
                // defaultValue={{
                //   value: "Select",
                // }}
                // value={editingName?.bloodGroup}
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
              name="setEditingName"
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
                  // pattern:/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                  pattern:/^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,

                  message: "Please input Valid Contact number!",
                },
              ]}
            >
              <Input
               value={editingName?.contactNumber}
                placeholder="Type your Contact number"
                //  min={0}
                //  style={{width:'100%'}}
                onChange={(e) => {
                  setEditingName(() => {
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
              name="setEditingName"
              rules={[
                {
                  required: true,
                  message: "Please Fill Your Address!",
                },
              ]}
            >
              <TextArea
                placeholder="Type your Address"
                value={editingName?.permanentAddress}
                onChange={(e) => {
                  setEditingName(() => {
                    console.log("Permanent Address " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></TextArea>
            </Form.Item>
            <Form.Item
              label="Aadhar card Number"
              name="setEditingName"
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
                  // pattern:/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                  pattern:/^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                  message: " Input only number!",
                },
              ]}
            >
              <Input
                placeholder="Aadhar Number"
                value={editingName?.adharNumber}
                onChange={(e) => {
                  setEditingName(() => {
                    console.log("Aadhar Number " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              label="PAN card Number"
              name="setEditingName"
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
                value={editingName?.panNumber}
                onChange={(e) => {
                  setEditingName(() => {
                    console.log("Pan Number " + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item
              label="Current Salary"
              name="seteditingName"
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
                value={editingName?.salary}
                onChange={(e) => {
                  setEditingName(() => {
                    console.log("Salary" + e.target.value);
                    return e.target.value;
                  });
                }}
              ></Input>
            </Form.Item>
            <Form.Item 
            label="Last Appraisal Date"
            name="setEditingName"
            rules={[
              {
                required: true,
                message: "Select Your Date!",
              },
            ]}>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                // onChange={(date) => {
                //   const d = new Date(date).toLocaleDateString("fr-FR");
                //   console.log(d);
                //   setEditingName(d);
                // }}
                onChange={(e)=>{
                  setEditingName([e.format("dd/MM/yyyy")]);
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