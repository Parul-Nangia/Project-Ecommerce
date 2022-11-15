
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, DatePicker, Select, Card, Row, Col, Button } from "antd";
import axios from "axios";
const { Option } = Select;
// const { Content } = Layout;

const Profile = () => {;
  const params = useParams();
  //  console.log(params.id, "params");
  const [id] = useState(params.id);
  // console.log(id, "iduser");

  const [viewingEmployee, setViewingEmployee] = useState(null);
  const [joiningDate,setJoiningDate]=useState(new Date().toLocaleDateString('fr-FR'))
  // const[joiningDate,setJoiningdate]=useState()
  const [fatherName,setFatherName]=useState();
  const [motherName,setMotherName]=useState();
  const [bloodGroup,setBloodGroup]=useState();
  const [contactNumber,setContactNumber]=useState();
  const [permanentAddress,setPermanentAddress]=useState();
  const [adharNumber,setAdharNumber]=useState();
  const [panNumber,setPanNumber]=useState();
  const [salary,setSalary]=useState();
  const [appraisal,setAppraisal]=useState(new Date().toLocaleDateString('fr-FR'));


  useEffect(() => {
    console.log(id, "userid");
    viewEmployee(id);
  },[]);

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
  const SelectOne =(value)=>{
    setBloodGroup(value)
    console.log("Blood Group",value)
  }
  const Submithere =(e)=>{
    e.preventDefault();
    console.log("hello")
    console.log(id,"IDDDDD")
    console.log(fatherName,"FatherName")
    console.log(motherName,"Mother Name")
    console.log(joiningDate,"Joining Date")
    console.log(bloodGroup,"Blood Group")
    console.log(permanentAddress,"Permanent Address")
    console.log(adharNumber,"Aadhar Number")
    console.log(contactNumber,"Contact Number")
    console.log(panNumber,"Pan Number")
    console.log(salary,"Salary")
    console.log(appraisal,"Last Appraisal date")
    axios.put(`${process.env.REACT_APP_BASE_URL}/user/${id}`,
    {fatherName,motherName,joiningDate,bloodGroup,permanentAddress,adharNumber,contactNumber,panNumber,salary,appraisal
    }).then(()=>{
      
    })
  }

  return (
    <>
      <Card title="General Information" bordered={false} style={{ width: 300 }}>
        <p>Name: {viewingEmployee?.name}</p> <p> Joining Date:{viewingEmployee?.joiningDate}</p>
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
            <DatePicker  
                   dateFormat="dd/MM/yyyy"
                  //  value={joiningDate}
                   onChange={(date) => {
                     const d = new Date(date).toLocaleDateString('fr-FR');
                     console.log(d);
                     setJoiningDate(d);
                   }}/>
            </Form.Item>
              <Form.Item label="Father Name" 
              rules={[
                {
                  required: true,
                  message: 'name is required.',
                },
                // {
                //   pattern: /^[a-zA-Z0-9]+$/,
                //   message: 'Name can only include letters and numbers.',
                // },
              ]}>
              <Input
              value={fatherName}
              onChange={(e) => {
                setFatherName(() => {
                  console.log("Father Name  " + e.target.value);
                  return e.target.value;
                });
              }}
            ></Input>
            </Form.Item>
            <Form.Item label="Mother Name">
              <Input 
              value={motherName}
              onChange={(e)=>{
                setMotherName(()=>{
                  console.log("Mother Name " + e.target.value );
                  return e.target.value
                })
              }}></Input>
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
              <Form.Item label="Contact Number" rules={[{type:"number"}]}>
            <Input 
              value={adharNumber}
              onChange={(e)=>{
                setContactNumber(()=>{
                  console.log("Contact Number " + e.target.value);
                  return e.target.value
                })
              }}>
              </Input>
            </Form.Item>
          </Col>
          <Col span={12} style={{padding:"10px 10px"}}>
             <Form.Item label="Permanent Address">
               <Input 
              value={permanentAddress}
              onChange={(e)=>{
                setPermanentAddress(()=>{
                  console.log("Permanent Address " + e.target.value);
                  return e.target.value
                })
              }}>
              </Input>
            </Form.Item>
            <Form.Item label="Aadhar card Number" rules={[{type:"number"}]}>
            <Input 
              value={adharNumber}
              onChange={(e)=>{
                setAdharNumber(()=>{
                  console.log("Aadhar Number " + e.target.value);
                  return e.target.value
                })
              }}>
              </Input>
            </Form.Item>
            <Form.Item label="PAN card Number">
             <Input 
              value={panNumber}
              onChange={(e)=>{
                setPanNumber(()=>{
                  console.log("Pan Number " + e.target.value);
                  return e.target.value
                })
              }}>
              </Input>
            </Form.Item>
            <Form.Item label="Current Salary" rules={[{type : "number"}]}>
            <Input 
              value={salary}
              onChange={(e)=>{
                setSalary(()=>{
                  console.log("Salary" + e.target.value);
                  return e.target.value
                })
              }}>
              </Input>
          </Form.Item>
          <Form.Item label="Last Appraisal Date">
          <DatePicker  
                   dateFormat="dd/MM/yyyy"
                  //  value={joiningDate}
                   onChange={(date) => {
                     const d = new Date(date).toLocaleDateString('fr-FR');
                     console.log(d);
                     setAppraisal(d);
                   }}/>
          </Form.Item>
          </Col>
        </Row>
        <Form.Item>
        <Row justify="center"><Button onClick={Submithere}>submit</Button></Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default Profile;