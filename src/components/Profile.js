import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

import moment from "moment";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  Row,
  Col,
  Button,
  Modal,
  message,
  Rate,
  Table,
} from "antd";
import { FcPhone } from "react-icons/fc";
import axios from "axios";
import { Space, Typography } from 'antd';
import { Divider } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { Collapse } from "antd";
import { Tabs } from "antd";
import { Badge, Descriptions } from "antd";
import { EditOutlined, EllipsisOutlined, SettingOutlined, MailOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const { Meta } = Card;

const { Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;


// import { max } from "date-fns";
const { Option } = Select;
// const { Content } = Layout;
const Profile = () => {
  const [form] = Form.useForm();
  const params = useParams();
  //  console.log(params.id, "params");
  const [id] = useState(params.id);
  console.log(id, "iduser");
  const [viewingEmployee, setViewingEmployee] = useState([]);
  // const [form] = Form.useForm();
  // const[joiningDate,setJoiningdate]=useState()
  // const [isEditing, setIsEditing] = useState(false);
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [permanentAddress, setPermanentAddress] = useState();
  const [adharNumber, setAdharNumber] = useState();
  const [panNumber, setPanNumber] = useState();
  const [salary, setSalary] = useState();
  const [appraisal, setAppraisal] = useState();
  const [joiningDate, setJoiningDate] = useState();

  // const[appraisal,setAppraisal]=useState()

  const [isopenmodal, setIsOpenModal] = useState(false);
  const [iseditopenmodal, setIsEditOpenModal] = useState(false);

  const [resetpassword, setResetPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [newpassword, setNewPassword] = useState([]);
  const [empskilldata, setEmpSkillData] = useState("");
  const [myprofilepic, setmyprofilepic] = useState("");
  // console.warn("viewingEmployee", viewingEmployee)

  // console.log("empskilldata", empskilldata);

  const onMyFinish = async () => {
    try {
      console.log("emp id", id);
      const password = confirmpassword;
      console.log("password value", password);

      await axios
        .put(`${process.env.REACT_APP_BASE_URL}/user/${id}`, {
          password,
        })
        .then((res) => {
          setNewPassword(res?.data?.updatedAttendance);
          console.log("Reset Password Value", newpassword);
          // window.location.reload();
          message.success("Password Change Successfully!!!!");
        });
    } catch (error) {
      if (confirmpassword === "") {
        message.error("Please Type Confirm Password");
      } else {
        message.error("Invalid Password");
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onMyFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showEditModal = () => {
    setIsEditOpenModal(true);
  };

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleOk = async () => {
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const handleEditCancel = () => {
    setIsEditOpenModal(false);
  };

  useEffect(() => {
    console.log(id, "userid");
    viewEmployee(id);
  }, []);

  const viewEmployee = async (id) => {
    console.log("hhhhhhhhhhh", id);
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${id}`)
      .then((res) => {
        console.log("employeeDetails", res?.data?.myData);
        if(res?.data?.myData?.profilepicture === ""){

          setmyprofilepic("https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.webp")
        }else {

          setmyprofilepic("https://leave-management-system.glitch.me/images/" + res?.data?.myData?.profilepicture)
        }
        setViewingEmployee(res?.data?.myData);

        form.setFieldsValue({
          fatherName: res?.data?.myData?.fatherName,
          motherName: res?.data?.myData?.motherName,
          bloodGroup: res?.data?.myData?.bloodGroup,
          joiningDate: res?.data?.myData?.joiningDate,
          contactNumber: res?.data?.myData?.contactNumber,
          permanentAddress: res?.data?.myData?.permanentAddress,
          adharNumber: res?.data?.myData?.adharNumber,
          panNumber: res?.data?.myData?.panNumber,
          salary: res?.data?.myData?.salary,
          appraisal: res?.data?.myData?.appraisal,
        });
      });
  };
  const SelectOne = (value) => {
    setBloodGroup(value);
    console.log("Blood Group", value);
  };
  const Submithere = () => {
    //  form.resetFields();
    try {
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
        .then((res) => {
          console.log(res, "response");
          message.success("Information submitted!");
        });
    } catch (error) {
      if (fatherName === "" && motherName === "") {
        message.error("Please fill empty fields!");
      } else {
        message.error("Submission failed!");
      }
    }
    // console.log("form values", form.getFieldsValue());
  };
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };

  const handledate = (value) => {
    setJoiningDate(value.format("YYYY-MM-DD"));
  };
  useEffect(() => {
    userGetskillData(id);
  }, []);

  const userGetskillData = async (id) => {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/skill/emp/${id}`)
      .then((res) => {
        console.log("get api res", res);
        setEmpSkillData(res?.data?.SingleEmpAllData);
        console.log("mydata", res?.data?.SingleEmpAllData);
      });
  };

  const columns = [
    {
      title: "Skills",
      key: "skills",
      dataIndex: "skillname",
    },
    {
      title: "Experience",
      dataIndex: "skillExperience",
      key: "experience",
      // render: (text) => <a>{text}</a>,
    },

    {
      title: "Rating",
      key: "rating",
      render: (record) => {
        return (
          // dataIndex: "skillrating",
          <>
            <span>
              <Rate value={record?.skillrating} />
            </span>
          </>
        );
      },
    },
  ];

  function callback(key) { }

  const collapseValue = (
    <>
      <Card

        // title=" details"
        // extra={<a href="#">More</a>}
        style={{
          width: 1000,
        }}
      >
        {/* <div style={{ display: "flex" }}>

          <div style={{ marginRight: "30px" }}>
            <p style={{ "color": "darkgray" }}>PAN no.</p>
            <Divider />
            <p style={{ "color": "darkgray" }}>Aadhar number</p>
          </div>
          <div>
            <h1 style={{ "color": "black" }}>{viewingEmployee?.panNumber}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.adharNumber}</h1>
          </div>

        </div> */}

      </Card>
      {/* <div>
        <div>
          <Row>
            <Col span={8} style={{ padding: "10px 10px" }}>
              <Card
                title="Default size card"
                style={{
                  width: 300,
                }}
              >
                <div>
                  <img className="emppro" src="ebs.png" />
                  <div
                    style={{
                      display: "flex",
                      fontWeight: "bold",
                      marginTop: "20px",
                      float: "right",
                    }}
                  >
                    {viewingEmployee?.name}
                  </div>
                </div>
              </Card>
            </Col>
            <br />
            <br />
            <Col>
              <Card
                size="small"
                title="Contact"
                style={{
                  width: 300,
                }}
              >
                <div>
                  <p style={{ float: "right" }}>{viewingEmployee?.email}</p>
                </div>
                <div>
                  <p style={{ float: "right" }}>{viewingEmployee?.contact}</p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        <div>
          <Card
            size="small"
            title="Contact"
            style={{
              width: 300,
            }}
          >
            <div>
              <p style={{ float: "right" }}>{viewingEmployee?.email}</p>
            </div>
            <div>
              <p style={{ float: "right" }}>{viewingEmployee?.contact}</p>
            </div>
          </Card>
        </div>
      </div> */}
    </>
  );

  const contactCollapse = (

    <Card>
      <div style={{ display: "flex"}}>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "50px" }}>
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Email</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Mobile no.</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Emergency contact</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Permanent address</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Blood group</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Father's name</p>
            <Divider />
          </div>
          <div style={{marginRight:"90px"}}>
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.email}</h1>
            <Divider />
            <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.contactNumber}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.permanentAddress}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.bloodGroup}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.fatherName}</h1>
            <Divider />
          </div>
        </div>


        <div style={{ display: "flex" }}>

          <div style={{ marginRight: "50px" }}>
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Mother's name</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Salary</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Linkedin</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Designation</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Joining date</p>
            <Divider />
            <p style={{ "color": "darkgray", marginTop: "13px" }}>Appraisel date</p>
          </div>
          <div>
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.motherName}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.salary}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.linkedinprofilelink}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.role}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.joiningDate}</h1>
            <Divider />
            <h1 style={{ "color": "black", marginTop: "13px" }}>{viewingEmployee?.appraisal}</h1>
          </div>

        </div>
      </div>
      {/* <div style={{ display: "flex" }}>

        <div style={{ marginRight: "30px" }}>


          <div style={{ display: "flex" }}>
            <div style={{ marginLeft: "30px", marginRight: "120px"}}> 
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Contact</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>


          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Email</p>
            </div>

            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Emergency contact</p>
            </div>

            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Mobile no.</p>
            </div>

            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Permanent address</p>
            </div>

            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Blood Group</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Contact</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>


          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Father's name</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>


          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Mother's name</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>


          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Salary</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Linkedin</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Salary</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Designation</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Joining date</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{marginLeft: "30px", marginRight: "120px"}}>
              <p style={{ "color": "darkgray", marginRight: "120px" }}>Appraisal date</p>
            </div>
            <div>
              <h1 style={{ "color": "black" }}>{viewingEmployee?.contact}</h1>
            </div>
          </div>
        </div>
        

      </div> */}

    </Card>
  )

  const skillCollapse = (
    <div>
      <Table columns={columns} dataSource={empskilldata} pagination={false} />
    </div>
  );

  const EditProfileForm = (
    <Form
      form={form}
      onFinish={Submithere}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row>
        <Col span={12} style={{ padding: "10px 10px" }}>
          <Form.Item
            label="Father name"
            name="fatherName"
            rules={[
              {
                required: true,
              },
              {
                pattern: new RegExp(
                  /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+\s*[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
                ),
                // pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
                message: "please Input in alphabets only",
              },
            ]}
          >
            <Input
              placeholder="father's name"
              onChange={(e) => {
                setFatherName(e.target.value);
              }}
            ></Input>
          </Form.Item>

          <Form.Item
            label="Mother name"
            name="motherName"
            rules={[
              {
                required: true,
                message: "Please type your  mother's name!",
                whitespace: true,
              },
              {
                pattern: new RegExp(
                  /^[a-zA-Z@~`!@#$%^&*()_=+';:"/?>.<,-]+\s*[a-zA-Z@~`!@#$%^&*()_=+';:"/?>.<,-]+$/i
                ),
                // pattern: /^([A-Z][a-z]+\s)*[A-Z][a-z]+$/,
                message: "please input alphabets only",
              },
            ]}
          >
            <Input
              placeholder="mother's name"
              onChange={(e) => {
                setMotherName(e.target.value);
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="Blood Group"
            name="bloodGroup"
            rules={[
              {
                required: true,
                message: "Select a option ",
              },
            ]}
          >
            <Select placeholder="Select" onChange={SelectOne}>
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
            label="Emergency contact number"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please input 10 digit contact number!",
                max: 10,
                min: 10,
              },
              {
                pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                message: "please input your valid contact number",
              },
            ]}
          >
            <Input
              placeholder="contact number"
              onChange={(e) => {
                setContactNumber(() => {
                  console.log("Contact Number " + e.target.value);
                  return e.target.value;
                });
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="Date of Joining"
            // name="joiningDate"
            rules={[
              {
                required: true,
                message: "Select your date!",
              },
            ]}
          >
            <DatePicker
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                const d = new Date(date).toLocaleDateString("fr-FR");

                setJoiningDate(d);
              }}
            />
          </Form.Item>
        </Col>

        <Col span={12} style={{ padding: "10px 10px" }}>
          <Form.Item
            label="Permanent Address"
            name="permanentAddress"
            rules={[
              {
                required: true,
                message: "Please type Your Permanent Address!",
              },
            ]}
          >
            <TextArea
              placeholder="Permanent Address"
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
            name="adharNumber"
            rules={[
              {
                required: true,
                message: "please input your valid Aadhar card number",
                whitespace: true,
                max: 12,
                min: 10,
              },
              {
                pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                message: " Input only number!",
              },
            ]}
          >
            <Input
              placeholder="Aadhar number"
              onChange={(e) => {
                setAdharNumber(() => {
                  console.log("Aadhar Number " + e.target.value);
                  return e.target.value;
                });
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="PAN card number"
            name="panNumber"
            rules={[
              {
                required: true,
                message: "Please input your PAN card number!",
                whitespace: true,
              },
              {
                pattern: new RegExp(/^[a-zA-Z0-9]*$/),

                message: "Input only string & number",
              },
            ]}
          >
            <Input
              placeholder="Type your pan card number"
              onChange={(e) => {
                setPanNumber(() => {
                  console.log("Pan Number " + e.target.value);
                  return e.target.value;
                });
              }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="Current salary"
            name="salary"
            rules={[
              {
                required: true,
                message: "Input only numbers!",
                whitespace: true,
              },
              {
                pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                message: "Input only numbers!]",
              },
            ]}
          >
            <Input
              placeholder="Current Salary"
              onChange={(e) => {
                setSalary(() => {
                  console.log("Salary" + e.target.value);
                  return e.target.value;
                });
              }}
            ></Input>
          </Form.Item>

          <Form.Item
            label="Last Appraisal Date"
            // name="appraisal"
            rules={[
              {
                required: true,
                message: "Select your date!",
              },
            ]}
          >
            <DatePicker
              defaultValue={moment()}
              dateFormat="dd/MM/yyyy"
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
          <Button className="submitbtn" htmlType="submit">
            submit
          </Button>
        </Row>
      </Form.Item>
    </Form>
  );

  return (
    <>

      <div style={{ display: "flex" }}>
        <h1>DATE :</h1>

        <div style={{ marginLeft: "5px" }}>
          {new Date().toLocaleDateString()}
        </div>

        <h1 style={{ marginLeft: "15px" }}>TIME :</h1>
        <div style={{ marginLeft: "5px" }}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div style={{ marginLeft: "70%" }}>
        <div>
          <Button className="changepasswordemp" onClick={showModal}>
            Change Password
          </Button>

          <Button className="editemp" onClick={showEditModal}>
            Edit Details
          </Button>
        </div>
      </div>

      <Modal
        width="70%"
        title="Edit Details"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        open={iseditopenmodal}
        onCancel={handleEditCancel}
      >
        {EditProfileForm}
      </Modal>

      <Modal
        title="Password Reset"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        open={isopenmodal}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onMyFinish}
          onFinishFailed={onMyFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            // style={{ fontWeight: "bold" }}
            label="New password"
            name="SetPassword"
            rules={[
              {
                required: true,
                message: "Enter new password!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                setResetPassword(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            // style={{ fontWeight: "bold" }}
            label="Confirm password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please confirm new password!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", marginLeft: "105%" }}>
              <Button
                className="cancelpassBtn"
                htmlType="cancel"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button className="okpassBtn" htmlType="Done" onClick={handleOk}>
                Done
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>



      <div className="myprofile">
        <Card
          className="smallprofilecard"

          cover={
            <img
              alt="example"
              src={myprofilepic}
            />
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            // title="Card title"
            description="Full name"
          />
          <p>Sudhir dadwal</p>

          <Meta
            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            // title="Card title"
            description="Designation"
          />
          <p>Admin</p>

          <Meta
            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            // title="Card title"
            description="Mobile no."
          />
          <p>2387246265</p>

          <Meta
            // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            // title="Card title"
            description="Email"
          />
          <p>ebs.sudhir@gmail.com</p>
        </Card>

        {/* <div className="profiledeatils"> */}
        <Card className="profilecard">
          <Tabs defaultActiveKey="1" onChange={callback}>
            <TabPane tab="PERSONAL INFO" key="1">
              {contactCollapse}
            </TabPane>
            <TabPane tab="SKILLS" key="2">
              {skillCollapse}
            </TabPane>
            <TabPane tab="DOCUMENT INFO" key="3">
              {collapseValue}
            </TabPane>
            {/* <TabPane tab="EDIT DETAILS" key="3">
          {EditProfileForm}
        </TabPane> */}
          </Tabs>
        </Card>
      </div>

      {/* </div> */}
    </>
  );
};

export default Profile;
