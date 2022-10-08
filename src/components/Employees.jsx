import { makeStyles } from "@material-ui/core";
import React from 'react';
import { useState, useEffect } from "react";
// import Sidebar from './Sidebar';
import { Table } from 'antd';
// import Navbar from './Navbar';
import { Button, Modal, Form, Input, Row } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined, PhoneOutlined, UserSwitchOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import Top from '../components/Top';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import { Layout } from 'antd';
const { Content } = Layout;


const useStyles = makeStyles({

  frmItem: {
    padding: "10px",
    width: "50vh"

  },
  headingColor: {
    backgroundColor: "#87CEEB",
    color: "#000000",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold"

  },
  addEmpColor: {
    backgroundColor: "#87CEEB",
    textAlign: "center",
    marginBottom: "5px",
    color: "#000000",
    marginTop: "30px",
    fontWeight: "bold",
    paddingTop: "1px"


  },
  empListColor: {
    backgroundColor: "#87CEEB",
    color: "#000000",
    textAlign: "center",
    marginTop: "30px",
    fontWeight: "bold"
  },
  tableHeadCell: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16,

  },
  empListColor: {
    backgroundColor: "#87CEEB",
    color: "#000000",
    textAlign: "center",
    marginTop: "30px",
    fontWeight: "bold"
  },
  tableHeadCell: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 16
  },
  btnCenter: {
    padding: "10px",
    width: "50vh",
    height: "60px",
    fontWeight: "bold",
    backgroundColor: "#FF4500",
    "&:hover": {
      borderRadius: 4,
      backgroundColor: "white",
      color: "black"
    },
  },
})




const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  // const [showData, setShowData] = useState(false);
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [view, setView] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
        deleteEmployee(record._id)


      }
    })
  };






  //================================================= START employee delete (GET API==================================================

  function deleteEmployee(_id) {

    fetch(`http://localhost:1999/employee/${_id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

    })

    console.log("Employee Deleted", _id)
    window.location.reload(false);

  }



  // ----------------------------------------axios delete method (delete api)
  // const deleteData = async (_id)=> {
  //   await axios.delete(`http://localhost:1999/employee/${_id}`)
  //     .then((res) => {
  //       console.log(_id, "resif")
  //       setState(
  //         res.data.map(row => ({
  //           id: row.id
  //         }))
  //       );
  //     }
  //     );
  // };




  // //================================================= START employee post (POST API)
  function saveEmployee() {
    console.warn({ name, email, contact, gender });
    let data = { name, email, contact, gender }


    fetch("http://localhost:1999/employee", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((Employee) => {
      console.log("result", Employee);
      window.alert("New Employee added successfully")

    })

  }

  // //================================================= END employee post (POST API)






  // //================================================= START employee put (PUT API)
  // ----------------------------------------axios method (PUT api)
  const editEmployee = async (_id) => {
    console.log("hdghja")
    console.log(_id)



    const name = editingEmployee.name
    console.log(name, "jgj")
    console.log(editingEmployee, "editing Employee")
    console.log(editingEmployee.name, "editingEmpoyee.name")
    const email = editingEmployee.email
    const gender = editingEmployee.gender
    const contact = editingEmployee.contact
    await axios.put(`http://localhost:1999/Employee/${_id}`, { name, email, gender, contact })
      .then(
        res => {



        }
      )
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

  const onEditEmployee = (record) => {
    setIsEditing(true);
    setEditingEmployee({ ...record });
  }
  const resetEditing = () => {
    setIsEditing(false);
    setEditingEmployee(null);

  };
  // //================================================= END employee put (PUT API)


  // //================================================= START employee GET (GET API)
  useEffect(() => {
    employeelist();

  }, [])

  const employeelist = () => {
    fetch("http://localhost:1999/employee").then((response) => {
      return response.json();
    }).then((data) => {
      let emp = data.employeeData
      setState(emp);

      console.log("response", emp);

    })

  }
  console.log(state, "hh")

  // //================================================= END employee GET (GET API)


  // //=================================================START View employee GET (GET API)
  useEffect((_id) => {
    viewEmployee(_id);

  }, [])

  const viewEmployee = (_id) => {
    fetch(`http://localhost:1999/employee/${_id}`).then((response) => {
      return response.json();
    }).then((data) => {
      let ab = data.viewData
      setView(ab)
        ;

      console.log("response", ab);

    })

  }
  console.log(view, "qq")
  // //=================================================END  View employee GET (GET API)



  const columns = [

    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
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
      title: "Actions",
      render: (record) => {
        return (
          <>

            <Button onClick={() => { viewEmployee(record) }}><EyeOutlined /></Button>
            <Button onClick={() => { onEditEmployee(record) }}><EditOutlined /></Button>
            <Button onClick={() => { ondeleteEmployee(record) }}><DeleteOutlined /></Button>


          </>
        );
      }
    }

  ];

  return (

    <>

      <Layout>
        <Top />
        <Layout>
          <Sidebar />

          <Layout style={{ padding: '0 24px 24px', }} >
            <Breadcrumbs />
            <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280, }} >

              <Table
                columns={columns}
                dataSource={state} />

              <Modal
                title="Edit Employee"
                visible={isEditing}
                onText="Save"
                onCancel={() => {
                  resetEditing();
                }}

                onOk=
                {() => {
                  setState((pre) => {
                    console.log(pre, "s")
                    console.log(editingEmployee, "kk")
                    editEmployee(editingEmployee._id);
                    return pre.map((employee) => {
                      console.log(employee, "gdh")
                      if (employee._id === editingEmployee._id) {
                        return editingEmployee;

                      } else {
                        return employee;
                      }
                    });
                  }
                  );
                  setIsEditing(false);

                }
                }

              >
                <Input value={editingEmployee?.name} onChange={(e) => {
                  setEditingEmployee(pre => {
                    return { ...pre, name: e.target.value }
                  })
                }} />
                <Input value={editingEmployee?.email} onChange={(e) => {
                  setEditingEmployee(pre => {
                    return { ...pre, email: e.target.value }
                  })
                }} />
                <Input value={editingEmployee?.contact} onChange={(e) => {
                  setEditingEmployee(pre => {
                    return { ...pre, contact: e.target.value }
                  })
                }} />
                <Input value={editingEmployee?.gender} onChange={(e) => {
                  setEditingEmployee(pre => {
                    return { ...pre, gender: e.target.value }
                  })
                }} />
              </Modal>
              {/* <Modal>

    </Modal> */}

              <Button style={{ float: "right", margin: "50px" }} onClick={showModal}> Add New Employee</Button>
              <Modal title="Employee Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <Row justify="center" style={{ padding: "10%" }}>


                  <Form >


                    <Form.Item rules={[{ required: true }]} >
                      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Employee name" className={classes.frmItem} onChange={(e) => { setName(e.target.value) }} />
                    </Form.Item>

                    <Form.Item rules={[{ required: true }]} >
                      <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" className={classes.frmItem} onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Item>

                    <Form.Item rules={[{ required: true }]} >
                      <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email Address" className={classes.frmItem} onChange={(e) => { setEmail(e.target.value) }} />
                    </Form.Item>

                    <Form.Item rules={[{ required: true }]}>
                      <Input type="number" prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Contact" className={classes.frmItem} onChange={(e) => { setContact(e.target.value) }} />
                    </Form.Item>

                    <Form.Item rules={[{ required: true }]}>
                      <Input prefix={<UserSwitchOutlined className="site-form-item-icon" />} placeholder="Gender" className={classes.frmItem} onChange={(e) => { setGender(e.target.value) }} />
                    </Form.Item>

                    <Form.Item>
                      <Button htmlType="submit" className={classes.btnCenter} onClick={saveEmployee}>Add</Button><br />
                    </Form.Item>

                  </Form>
                </Row>

              </Modal>

            </Content>
          </Layout>
        </Layout>
      </Layout>








    </>
  );
}


export default Employees;