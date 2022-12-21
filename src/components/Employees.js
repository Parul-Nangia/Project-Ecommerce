import React from "react";
import { useState, useEffect } from "react";
import { Table, message } from "antd";
import { Button, Modal, Form, Input, Row, Select } from "antd";
import {
  FileAddOutlined,
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  UserSwitchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Profile from "./Profile";

const Employees = ({ dataSource }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [state, setState] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [linkedinprofilelink, setLinkedinProfileLink] = useState("Null");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  // console.log("emp name", name);
  const [employeename, setEmployeeName] = useState("");
  const { Option } = Select;

  useEffect(() => {
    LoggedInEmployeeRole();
  }, []);

  const LoggedInEmployeeRole = () => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    // let token = token;
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);
    setEmployeeName(decoded);
  };

  const profile = (record) => {
    navigate("/profile/" + record._id);
    console.log(record, "User_iddddd");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    console.log(handleOk, "hhhhh");
    try {
      const profilepicture = "";
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
          name,
          password,
          email,
          contact,
          gender,
          role,
          linkedinprofilelink,
          profilepicture,
        })
        .then((res) => {});
      message.success("Employee added successfully!");
      // window.location.reload();
      setIsModalOpen(false);
    } catch (error) {
      message.open({
        type: "error",
        content: "Please fill all fields",
        duration: 2,
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const ondeleteEmployee = (record) => {
    Modal.confirm({
      title: "Are you Sure, you want to delete this employee record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteEmployee(record._id);
      },
    });
  };

  const deleteEmployee = async (_id) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/user/empdel/${_id}`)
      .then((res) => {});
    window.location.reload();
  };

  // //================================================= START employee put (PUT API)
  // ----------------------------------------axios method (PUT api)
  const editEmployee = async (_id) => {
    console.log("hdghja");
    console.log(_id);

    const name = editingEmployee.name;
    console.log("editing Employee", editingEmployee);
    console.log(editingEmployee.name, "editingEmployee.name");
    const email = editingEmployee.email;
    const gender = editingEmployee.gender;
    const contact = editingEmployee.contact;
    const role = editingEmployee.role;
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/user/delete${_id}`, {
        name,
        email,
        gender,
        contact,
        role,
      })
      .then((res) => { });
    setIsEditing(false);
  };

  const SelectGender = (value) => {
    setGender(value);
  };

  const SelectRole = (value) => {
    setRole(value);
  };

  const onEditEmployee = (record) => {
    setIsEditing(true);
    setEditingEmployee({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEmployee(null);
  };
  // //================================================= END employee put (PUT API)

  // //================================================= START employee GET (GET API)
  useEffect(() => {
    employeelist();
  }, []);

  const employeelist = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/user`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let emp = data.userData;
        setEmployeeData(emp);

        console.log("list response", emp);
      });
  };

  // const navigate=useNavigate()
  const documentation = (user_id) => {
    navigate("/documentation/" + user_id);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
      width: "200px",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Button
              style={{ color: "black" }}
              onClick={() => {
                documentation(record._id);
              }}
            >
              <FileAddOutlined />
            </Button>
            <Button
              style={{ color: "black" }}
              onClick={() => {
                profile(record);
              }}
            >
              <EyeOutlined />
            </Button>
            <Button
              style={{ color: "black" }}
              onClick={() => {
                onEditEmployee(record);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              style={{ color: "black" }}
              onClick={() => {
                ondeleteEmployee(record);
              }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  if (employeename.role === "admin") {
    console.log("my role is ", employeename.role);

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

        <Button className="addEmpBtn" onClick={showModal}>
          Add New Employee
          <UserAddOutlined />
        </Button>
        <br />

        <Table columns={columns} dataSource={employeeData} />

        <Modal
          title=" Edit Profile"
          visible={isEditing}
          onText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setState((pre) => {
              console.log(pre, "s");
              console.log(editingEmployee, "kk");
              editEmployee(editingEmployee._id);
              return pre.map((employee) => {
                console.log(employee, "gdh");
                if (employee._id === editingEmployee._id) {
                  return editEmployee;
                } else {
                  return employee;
                }
              });
            });
            setIsEditing(false);
          }}
        >
          <Input
            value={editingEmployee?.name}
            onChange={(e) => {
              setEditingEmployee((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingEmployee?.email}
            onChange={(e) => {
              setEditingEmployee((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingEmployee?.contact}
            onChange={(e) => {
              setEditingEmployee((pre) => {
                return { ...pre, contact: e.target.value };
              });
            }}
          />
          <Input
            value={editingEmployee?.gender}
            onChange={(e) => {
              setEditingEmployee((pre) => {
                return { ...pre, gender: e.target.value };
              });
            }}
          />
          <Input
            value={editingEmployee?.role}
            onChange={(e) => {
              setEditingEmployee((pre) => {
                return { ...pre, role: e.target.value };
              });
            }}
          />
        </Modal>

        <Modal
          title="Employee Form"
          open={isModalOpen}
          onOk={handleOk}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          onCancel={handleCancel}
        >
          <Row justify="center" style={{ padding: "10%" }}>
            <Form style={{ width: "300px" }} autoComplete="off">
              <Form.Item
                name="name"
                rules={[
                  { required: true },
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
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder=" Full Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password
                  type="password"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email Address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="contact"
                rules={[
                  {
                    required: true,
                    message: "Please enter your valid contact number",
                    max: 10,
                    min: 10,
                  },
                ]}
              >
                <Input
                  type="number"
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="Contact"
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="gender"
                // defaultValue="Employee"
                rules={[
                  {
                    required: true,
                    message: "Select your Gender ",
                  },
                ]}
              >
                <Select
                  placeholder=" Select your Gender"
                  onChange={SelectGender}
                >
                  <Select.Option value="male">male</Select.Option>
                  <Select.Option value="female">female</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="role"
                rules={[{ required: true, message: "Select your Role " }]}
              >
                <Select placeholder="Select your Role" onChange={SelectRole}>
                  <Option value="employee">employee</Option>
                  <Option value="admin">admin</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Id" requiredMark="optional">
                <Input
                  prefix={
                    <UserSwitchOutlined className="site-form-item-icon" />
                  }
                  placeholder="LinkedinProfileLink"
                  onChange={(e) => {
                    setLinkedinProfileLink(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item style={{ marginTop: "20%" }}>
                <Button
                  style={{
                    display: "flex",
                    marginLeft: "43%",
                  }}
                  type="primary"
                  htmlType="submit"
                  onClick={handleOk}
                >
                  Submit
                </Button>
              </Form.Item>
              <Form.Item style={{ marginLeft: "60%", marginTop: "-19%" }}>
                <Button
                  style={{
                    display: "flex",
                    marginLeft: "43%",
                    background: "red",
                    height: "34px",
                  }}
                  ghost
                  type="secondary"
                  htmlType="cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </Modal>
      </>
    );
  }
};

export default Employees;
