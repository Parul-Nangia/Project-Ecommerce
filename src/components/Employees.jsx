import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core";
import React from 'react';
import { Grid, TextField } from "@material-ui/core"
// import List from "./List";
import { useState, useEffect } from "react";
import Sidebar from './Sidebar';
// import Edit from "./Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Navbar from './Navbar';
import { Button, Checkbox, Form, Input, Row} from 'antd';

import { LockOutlined, UserOutlined , MailOutlined ,PhoneOutlined ,UserSwitchOutlined, CalendarOutlined ,StarOutlined  } from '@ant-design/icons';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { padding } from "@mui/system";









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


//  Form => State=> api => db

const Employees = () => {
  const classes = useStyles();
  const [employs, setEmploys] = useState([])
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");








  //================================================= START employee post (POST API)================================================================================ 
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
      console.warn("result", Employee);
      window.alert("New Employee added successfully")
      
    })
    
  }
 

  //================================================= END employee post (POST API)================================================================================






  //=================================================START employee delete (GET API)================================================================================   
  function deleteEmployee(_id) {
    if (window.confirm("Are you sure you want to to delete", _id)) {
      fetch(`http://localhost:1999/employee/${_id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      console.log("Employee Deleted", _id)
    }
  }
  //================================================= END employee delete (GET API================================================================================






  //================================================= START employee listing (GET API)================================================================================ 
  const employeeList = () => {
    fetch("http://localhost:1999/employee")

      .then((response) => {
        return response.json();
      }).then((data) => {

        let emp = data.employeeData


        setEmploys(emp)
      })

  }
  useEffect(() => {
    employeeList();

  }, [])






  return (
    <>

      <Navbar />
      <Sidebar>

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
              <Button htmlType="submit"  className={classes.btnCenter}>Add</Button><br />
           
            </Form.Item>
          </Form>
        </Row>





        <Box textAlign="center" p={2} className={classes.empListColor}>
          <Typography variant="h5" className={classes.empListColor}>EMPLOYEE LIST</Typography>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#DCDCDC" }}>
                <TableCell align="center" className={classes.tableHeadCell}>ID</TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>Phone</TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>Gender</TableCell>
                <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                employs.map((item, i) =>

                  <TableRow key={i}>
                    <TableCell align="center">{item._id}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.phone}</TableCell>
                    <TableCell align="center">{item.gender}</TableCell>
                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton><Link to={`/view/${item._id}`}><VisibilityIcon color="primary" /></Link></IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton><Link to={`/edit/${item._id}`}><EditIcon /></Link></IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => deleteEmployee(item._id)}><DeleteIcon color="secondary" /></IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>

                )
              }

            </TableBody>
          </Table>
        </TableContainer>


      </Sidebar>
    </>
  )
}

export default Employees