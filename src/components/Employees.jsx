import { makeStyles} from "@material-ui/core";
import React from 'react';
<<<<<<< Updated upstream
// import { Grid, TextField } from "@material-ui/core"
// import List from "./List";
import { useState, useEffect } from "react";
import Sidebar from './Sidebar';
// // import Edit from "./Edit";
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
=======

import { useState, useEffect } from "react";
import Sidebar from './Sidebar';

>>>>>>> Stashed changes
import { Table } from 'antd';
import Navbar from './Navbar';
import { Button, Modal, Form, Input, Row} from 'antd';
import axios from "axios";
import { LockOutlined, UserOutlined , MailOutlined ,PhoneOutlined ,UserSwitchOutlined, CalendarOutlined ,StarOutlined ,EyeOutlined ,EditOutlined,DeleteOutlined} from '@ant-design/icons';


const columns = [
  
  {
     title: "Id",
     dataIndex: "id",
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
     title: "Phone",
     dataIndex: "phone",
   },
    {
     title: "Gender",
     dataIndex: "gender",
   },
 

    {
      title: "Actions",
      render:(record) => {
        return (
          <>
            <EyeOutlined />
            <EditOutlined />
            <DeleteOutlined />
          </>
        );
        }
    }
   
];
 

const useStyles = makeStyles({

    frmItem: {
      padding:"10px",
      width:"50vh"
         
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
    padding:"10px",
    width:"50vh",
    height:"60px",
    fontWeight:"bold",
    backgroundColor:"#FF4500",
    "&:hover": {
      borderRadius: 4,
      backgroundColor: "white",
      color:"black"
    },
  },
})




const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
  const classes = useStyles();
  const [dataSource, setDataSource] = useState([]);
  const [employs, setEmploys] = useState([])
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");

<<<<<<< Updated upstream
  


  useEffect(() => {
    employeelist();

  }, [])




  // //================================================= START employee post (POST API)================================================================================ 
  // function saveEmployee() {
  //   console.warn({ name, email, contact, gender });
  //   let data = { name, email, contact, gender }

  

  //   fetch("http://localhost:1999/employee", {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   }).then((Employee) => {
  //     console.warn("result", Employee);
  //     window.alert("New Employee added successfully")
      
  //   })
    
  // }
 

  //================================================= END employee post (POST API)================================================================================



=======
  

>>>>>>> Stashed changes

  useEffect(() => {
    employeelist();

<<<<<<< Updated upstream

  //=================================================START employee delete (GET API)================================================================================   
  // function deleteEmployee(_id) {
  //   if (window.confirm("Are you sure you want to to delete", _id)) {
  //     fetch(`http://localhost:1999/employee/${_id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       }
  //     })
  //     console.log("Employee Deleted", _id)
  //   }
  // }
  //================================================= END employee delete (GET API================================================================================

=======
  }, [])
>>>>>>> Stashed changes





<<<<<<< Updated upstream
  //================================================= START employee listing (GET API)================================================================================ 
=======
  const employeelist = async () => {
    await axios.get("http://localhost:1999/employee").then((res) => {
      console.log(res, "bhvhv");
      console.log(setDataSource, "hhr");
      console.log(dataSource, "sb");
      setDataSource(
        res.data.map((row) => ({
          Id:row.id,
          Name:row.name,
          Email:row.email,
          Phone:row.contact,
          Gender:row.gender,
        }))
      );
    });
  };


>>>>>>> Stashed changes

  // const employeeList = async () => {
  //   await axios.get("http://localhost:1999/employee").then((res) => {
  //     console.log(res, "bhvhv");
      
  //   });
  // };

  const employeelist = async () => {
    await axios.get("http://localhost:1999/employee").then((res) => {
      console.log(res, "bhvhv");
      console.log(setDataSource, "hhr");
      console.log(dataSource, "sb");
      setDataSource(
        res.data.map((row) => ({
          Id:row.id,
          Name:row.name,
          Email:row.email,
          Phone:row.contact,
          Gender:row.gender,
        }))
      );
    });
  };



  // const employeeList = () => {
  //   fetch("http://localhost:1999/employee") .then((response) => {
  //     return response.json();
  //   }).then((data) => {
  //     let emp = data.employeeData
  //     setEmploys(emp)
  //     console.log("response",emp);
  //     })
      
  //   }

  
  
   return (

    <>
    <Navbar />
   

    <Sidebar>
  
    <Button style ={{float:"right", margin:"50px"}}onClick={showModal}> Add New Employee</Button>
      <Modal title="Employee Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    
        <Row justify="center" style={{ padding: "10%" }}>

        <Form >
        

          <Form.Item rules={[{ required: true }]} >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Employee name" className={classes.frmItem}  onChange={(e) => { setName(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]} >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" className={classes.frmItem}  onChange={(e) => { setPassword(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true}]} >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email Address" className={classes.frmItem}  onChange={(e) => { setEmail(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input type="password" prefix={<PhoneOutlined  className="site-form-item-icon" />} placeholder="Contact" className={classes.frmItem} onChange={(e) => { setContact(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input type="password" prefix={<UserSwitchOutlined  className="site-form-item-icon" />} placeholder="Gender" className={classes.frmItem} onChange={(e) => { setGender(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input type="password" prefix={<CalendarOutlined  className="site-form-item-icon" />} placeholder="Department" className={classes.frmItem} onChange={(e) => { setDepartment(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input type="password" prefix={<StarOutlined  className="site-form-item-icon" />} placeholder="Designation" className={classes.frmItem} />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" className={classes.btnCenter}>Add</Button><br />
         
          </Form.Item>
        </Form>
      </Row>
  
      </Modal>

      

        
        </Sidebar>
   

       <Table columns={columns} dataSource={dataSource} ></Table>
     </>
     );
}
      

export default Employees;