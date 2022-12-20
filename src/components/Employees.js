import { makeStyles } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { Table,message } from "antd";
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
  // const [ignored, forceUpdate] = useReducer(x=>x+1, 0);

  // const [profile, setProfile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [state, setState] = useState([]);
  // const [view, setView] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [linkedinprofilelink, setLinkedinProfileLink] = useState("");
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

  // if(employeename.role==="employee"){
  //   return(

  //   )

  // }
  // const data = "Hello Everyone";
  const profile = (record) => {
    // navigate("/profile/" + record._id ,data={data});
    navigate("/profile/" + record._id);
    // navigate("/profile/" + record._id, {queryParams: record});
    // navigate("/profile/",<Profile />)
    console.log(record, "User_iddddd");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    console.log(handleOk,"hhhhh")
    try{
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
      .then((res) => {
        console.log("response", res);
        console.log(res?.data,"princeeeeee")
        console.log(res?.data?.newuser,"kahollll")
        
        // const array=[]
        // array.append(as)
        // console.log(as,"ggggg")
      });
    message.success("Employee added successfully!")
    // window.location.reload();
    setIsModalOpen(false);
    }
    catch(error){
      message.open({
        type: 'error',
        content: 'email already existed',
        duration: 2,
        // style: {
        //   marginTop: '11vh',
          
        // },
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

  //================================================= START employee delete ( API==================================================
  
  //   fetch(`${process.env.REACT_APP_BASE_URL}/user/${_id}`, {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   console.log("Employee Deleted", _id);
  //   // forceUpdate();
  //   window.location.reload(false);
  // }

  // function deleteEmployee(_id) {
  //   fetch(`${process.env.REACT_APP_BASE_URL}/user/empdel/${_id}`, {
  //     method: "DELETE",
  //   }).then((res) => {
  //     console.log(_id,"IDDDDDDD")
  //     console.log(" delete", res);
  //     employeeData(res.data.map((row)=>{
  //       _id:row._id
  //     }))
  //     // window.alert("Employee Deleted successfully");
  //     // window.location.reload(false);
  //   });
  // }
  const deleteEmployee = async (_id) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/user/empdel/${_id}`)
      .then((res) => {
        console.log(_id,"IDDDDDDD")
      console.log(" delete", res);
      // setEmployeeData(
      //     res.data.map((row) => ({
      //       _id: row._id,
      //     }))
      //   );
      });
  };

 
  // //================================================= START employee post (POST API)
  // function saveEmployee() {
  //   console.warn({ name, password, email, contact, gender, role, linkedinprofilelink
  //    });
  //   let data = { name, password, email, contact, gender, role, linkedinprofilelink };

  //   fetch(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((Employee) => {
  //     console.log("result", Employee);
  //     window.alert("New Employee added successfully");
  //   });
  // }
  // const saveEmployee =async () =>{

  //   await axios
  //   .post(`${process.env.REACT_APP_BASE_URL}/user/signup`, {
  //     name, password, email, contact, gender, role, linkedinprofilelink

  //   })
  //   .then((result) => {

  //     console.log("user data", result);

  //   });
  // }

  // //================================================= END employee post (POST API)

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
      .then((res) => {});
    setIsEditing(false);
  };
  // ----------------------------------------fetch method (PUT api)
  //  function editEmployee(_id) {
  //   console.warn({ name, email, contact, gender });
  //   let data = { name, email, contact, gender }
  //   fetch(`http://localhost:1999/employee/${_id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }).then((Employee) => {
  //     console.warn("result", Employee);
  //     // setState((pre)=>{
  //     //   return[...pre,editEmployee]
  //     // })

  //   })
  //   setIsEditing(false);
  // }
  // const viewEmployee =()=>{

  // }

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

  // //================================================= END employee GET (GET API)

  // //=================================================START View employee GET (GET API)
  // useEffect((_id) => {
  //   viewEmployee(_id);

  // }, [])

  // const viewEmployee = (_id) => {
  //   fetch(`http://localhost:1999/employee/${_id}`).then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     let ab = data.viewData;
  //     setView(ab)

  //     console.log("response", ab);

  //   })

  // }
  // console.log(view, "qq")
  // //=================================================END  View employee GET (GET API)
  // const onViewEmployee = (record) => {
  //   viewEmployee = (record._id)

  // }

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
              rules={
                [{ required: true },
                  {
                    pattern: new RegExp(
                      /^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+\s*[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i
                    ),
                    // pattern: new RegExp(/^[a-zA-Z@~`!@#$%^&*()_=+\\\\';:\"\\/?>.<,-]+$/i),
                    message: "please Input in alphabets only",
                  },
                ]
                }>
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder=" Full Name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
              name="password"
              rules={[
                { required: true }
                ]}>
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
               rules={[{ required: true,
                message:"Please enter your email"
                },{type:'email'}]}>
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
              rules={[{ required: true , message:"Please enter your valid contact number",max: 10,
              min: 10,}]}>
                <Input
                  type="number"
                  prefix={<PhoneOutlined className="site-form-item-icon" />}
                  placeholder="Contact"
                  onChange={(e) => {
                    setContact(e.target.value);
                  }}
                />
              </Form.Item>

              {/* <Form.Item rules={[{ required: true }]}> */}
              {/* <Input
                  prefix={
                    <UserSwitchOutlined className="site-form-item-icon" />
                  }
                  placeholder="Gender"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                /> */}
              {/* </Form.Item> */}
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
                {/* <Select
                  prefix={
                    <UserSwitchOutlined className="site-form-item-icon" />
                  }
                  placeholder=" Select your Gender"
                  onChange={SelectGender}
                >
                  <Option value="male">male</Option>
                  <Option value="female">female</Option>
                </Select> */}
                  <Select
               placeholder=" Select your Gender"
                onChange={SelectGender}
                
              >
                <Select.Option value="male">male</Select.Option>
                <Select.Option value="female">female</Select.Option>
              </Select>
              </Form.Item>
              <Form.Item 
              name="role" rules={[{ required: true,  message: "Select your Role "}]}>
                {/* <Input
                  // defaultValue="Employee"
                  // disabled="true"
                  prefix={
                    <UserSwitchOutlined className="site-form-item-icon" />
                  }
                  // placeholder="Employee"
                  // value="Employee"
                  placeholder="Role"
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                /> */}
                <Select
                  // prefix={
                  //   <UserSwitchOutlined className="site-form-item-icon" />
                  // }
                  placeholder="Select your Role"
                  onChange={SelectRole}
                >
                  {/* <Select.Option value="employee">employee</Select.Option>
                  <Select.Option value="admin">admin</Select.Option> */}
                  <Option value="employee">employee</Option>
                  <Option value="admin">admin</Option>
                </Select>
              </Form.Item>
              <Form.Item 
              label="Id"
              requiredMark="optional"
              >
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
