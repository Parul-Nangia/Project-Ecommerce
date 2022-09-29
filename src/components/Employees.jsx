import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core";
import React from 'react';
import { Grid, TextField, Button } from "@material-ui/core"
// import List from "./List";
import { useState, useEffect } from "react";
import Sidebar from './Sidebar';
// import Edit from "./Edit";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate , useParams } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';






const useStyles = makeStyles({
  headingColor: {
    backgroundColor: "#87CEFA",
    color: "#000000",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold"

  },
  addEmpColor: {
    backgroundColor: "#87CEFA",
    textAlign: "center",
    marginBottom: "5px",
    color: "#000000",
    marginTop: "30px",
    fontWeight: "bold"


  },
  empListColor: {
    backgroundColor: "#87CEFA",
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
  empListColor: {
    backgroundColor: "#87CEFA",
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
})


//  Form => State=> api => db

const Employees = () => {
  const classes = useStyles();
  const [employs, setEmploys] = useState([])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");






  //================================================= START employee post (POST API)================================================================================ 
  function saveEmployee() {
    console.warn({ name, email, phone, gender });
    let data = { name, email, phone, gender }
    fetch("http://localhost:1999/employee", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((Employee) => {
      console.warn("result", Employee);
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
  //================================================= END employee delete (GET API)================================================================================






  //================================================= START employee listing (GET API)================================================================================ 
  const employeeList =()=>{
    fetch("http://localhost:1999/employee")
    
    .then((response)=>{
        return response.json();
    }).then((data)=>{
        
        let emp = data.employeeData
        

        setEmploys(emp)
    })

  }
  useEffect(()=>{
    employeeList();

  },[])
  //================================================= END employee listing (GET API)================================================================================





  return (
    <>
      <Navbar />
      <Sidebar>

        <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
          <Typography variant="h4" className={classes.headingColor}>EMPLOYEE DATA</Typography>
          <Typography variant="h5" className={classes.addEmpColor}>Total number of employees : {employs.length}</Typography>
        </Box>
        <Grid container justifyContent="center" spacing={4}>
          <Grid item md={6} xs={12}>
            <Box textAlign="center" p={2} className={classes.addEmpColor} mb={2}>
              <Typography variant="h5" className={classes.addEmpColor}>NEW EMPLOYEE</Typography>
            </Box>
            <form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField autoComplete="name" variant="outlined" required fullWidth value={name} onChange={(e) => { setName(e.target.value) }} label="Name" />
                </Grid>
                <Grid item xs={12}>
                  <TextField autoComplete="email" variant="outlined" required fullWidth value={email} onChange={(e) => { setEmail(e.target.value) }} label="Email Address" />
                </Grid>
                <Grid item xs={12}>
                  <TextField autoComplete="phone" variant="outlined" required fullWidth value={phone} onChange={(e) => { setPhone(e.target.value) }} label="Phone" />
                </Grid>
                <Grid item xs={12}>
                  <TextField autoComplete="gender" variant="outlined" required fullWidth value={gender} onChange={(e) => { setGender(e.target.value) }} label="Gender" />
                </Grid>
              </Grid>
              <Box m={3}>
                <Button type="button" onClick={saveEmployee} variant="contained" style={{ fontWeight: "bold", marginTop: "10px" }}  >Add</Button>
              </Box>
            </form>
          </Grid>
        </Grid>


   

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