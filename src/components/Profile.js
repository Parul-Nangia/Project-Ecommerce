import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "antd";
import axios from "axios";
import TextArea from "antd/lib/input/TextArea";
// import { max } from "date-fns";
const { Option } = Select;
// const { Content } = Layout;

const Profile = (props) => {
  const params = useParams();
  //  console.log(params.id, "params");
  const [id] = useState(params.id);
  console.log(id, "iduser");

  const [viewingEmployee, setViewingEmployee] = useState("null");
  // const [form] = Form.useForm();

  // const[joiningDate,setJoiningdate]=useState()
  // const [isEditing, setIsEditing] = useState(false);
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [salary, setSalary] = useState("");
  const [appraisal, setAppraisal] = useState("");
  const [joiningDate, setJoiningDate] = useState("");

  // const[appraisal,setAppraisal]=useState()

  const [isopenmodal, setIsOpenModal] = useState(false);
  const [resetpassword, setResetPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [newpassword, setNewPassword] = useState([]);

  const customValue = {
    fatherName: { fatherName },
    motherName: { motherName },
  };

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

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleOk = async () => {
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
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
        console.log(res, "api response");
        setViewingEmployee(res?.data?.myData);
        console.log(res?.data?.myData?.fatherName, "fathername");
        setFatherName(res?.data?.myData?.fatherName);
        setMotherName(res?.data?.myData?.motherName);
        setBloodGroup(res?.data?.myData?.bloodGroup);
        setContactNumber(res?.data?.myData?.contactNumber);
        setPermanentAddress(res?.data?.myData?.permanentAddress);
        setAdharNumber(res?.data?.myData?.adharNumber);
        setPanNumber(res?.data?.myData?.panNumber);
        setSalary(res?.data?.myData?.salary);
        setJoiningDate(res?.data?.myData?.joiningDate);
        setAppraisal(res?.data?.myData?.appraisal);

        // console.log(fatherName,"dgfjsghgh")

        // console.log(viewingEmployee, "viewingEmployee");
      });
  };
  const SelectOne = (value) => {
    setBloodGroup(value);
    console.log("Blood Group", value);
  };
  const Submithere = () => {
    //  form.resetFields();
    // e.preventDefault();

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
      });
    // console.log("form values", form.getFieldsValue());
  };
  // const onFinish = (values) => {
  //   console.log('Success:', values);
  // };

  const handledate = (value) => {
    setJoiningDate(value.format("YYYY-MM-DD"));
  };

  const onFinish = (values) => {
    console.log(values, "13312321312");
  };
  return (
    <>
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
            style={{ fontWeight: "bold" }}
            label="Set Password"
            name="SetPassword"
            rules={[
              {
                required: true,
                message: "set your password!",
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
            style={{ fontWeight: "bold" }}
            label="Confirm Password"
            name="password"
            rules={[
              {
                required: true,
                message: "confirm  your password!",
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
                style={{ marginRight: "4px", backgroundColor: "red" }}
                type="primary"
                htmlType="cancel"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="Done" onClick={handleOk}>
                Done
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <Card title="General Information" bordered={false} style={{ width: 300 }}>
        <p>Name: {viewingEmployee?.name}</p>{" "}
        <p>Email: {viewingEmployee?.email}</p>{" "}
        <p>Father Name: {viewingEmployee?.fatherName}</p>
        <p>Contact: {viewingEmployee?.contact}</p>
        <p>Gender: {viewingEmployee?.gender}</p>
        <p>Role: {viewingEmployee?.role}</p>
        <Link style={{ display: "flex", marginTop: "1px" }} onClick={showModal}>
          Change Password
        </Link>
      </Card>

      <Form
        name="pro"
        onFinish={Submithere}
        rules={[
          {
            required: "true",
          },
        ]}
        // onSubmit={Submithere}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col span={12} style={{ padding: "10px 10px" }}>
            <Form.Item
              label="Father Name"
              name="fathername"
              // defaultValue={viewingEmployee?.fatherName}
              // name="dadyy"
              rules={[
                {
                  required: true,

                  // whitespace: true,
                },
                {
                  pattern: new RegExp(
                    /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+\s*[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
                  ),
                  // pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
                  message: "please Input fullname & alphabets only",
                },
              ]}
              // value={fatherName}
              // initialValue={fatherName}
            >
              <Input
                value={fatherName}
                placeholder="Type Father Name "
                onChange={(e) => {
                  setFatherName(e.target.value);
                }}
              ></Input>
            </Form.Item>

            <Form.Item
              label="Mother Name"
              name="mother name"
              rules={[
                {
                  required: true,
                  message: "Please Input Your Name!",
                  whitespace: true,
                },
                {
                  pattern: new RegExp(
                    /^[a-zA-Z@~`!@#$%^&*()_=+';:"/?>.<,-]+\s*[a-zA-Z@~`!@#$%^&*()_=+';:"/?>.<,-]+$/i
                  ),
                  // pattern: /^([A-Z][a-z]+\s)*[A-Z][a-z]+$/,
                  message: "please Input alphabets only",
                },
              ]}
            >
              <Input
                placeholder="Type your Name"
                onChange={(e) => {
                  setMotherName(() => {
                    console.log("Mother Name " + e.target.value);
                    return e.target.value;
                  });
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
              label="Emergency Contact Number"
              name="contactNumber"
              rules={[
                {
                  // type:"number",
                  required: true,
                  message: "Please input 10 digit number!",
                  max: 10,
                  min: 10,
                },
                {
                  // pattern:/^[2-9]{2}[0-9]{8}$/,
                  // pattern: new RegExp(/\d+/g),
                  // pattern:/^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                  pattern: /^-?(0|[0-9][0-9]*)(\.[0-9]*)?$/,
                  message: "please input your valid number",
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
            <Form.Item
              label="Date of Joining"
              name="setJoiningDate"
              rules={[
                {
                  required: true,
                  message: "Select Your Date!",
                },
              ]}
            >
              <DatePicker
                dateFormat="dd/MM/yyyy"
                onChange={(date) => {
                  const d = new Date(date).toLocaleDateString("fr-FR");
                  console.log(date, "Dateeee");
                  console.log(d);
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
                  message: "Please Fill Your Address!",
                },
              ]}
            >
              <TextArea
                placeholder="Type your Address"
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
                placeholder="Aadhar Number"
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
              name="panNumber"
              rules={[
                {
                  required: true,
                  message: "Please Input Your pancard Number!",
                  whitespace: true,
                },
                {
                  pattern: new RegExp(/^[a-zA-Z0-9]*$/),

                  message: "Input only string & number",
                },
              ]}
            >
              <Input
                placeholder="Type your pancard number"
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
              name="salary"
              rules={[
                {
                  required: true,
                  message: "Input only numbers!",
                  whitespace: true,
                },
                {
                  // pattern: new RegExp(/^[a-zA-Z0-9]*$/),
                  pattern: /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/,
                  message: "Input only number ",
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
              name="setAppraisal"
              rules={[
                {
                  required: true,
                  message: "Select Your Date!",
                },
              ]}
            >
              <DatePicker
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
