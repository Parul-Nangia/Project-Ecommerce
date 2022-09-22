import React from 'react';
import { Typography, Box, makeStyles, Grid, TextField, Button } from "@material-ui/core"
// import { deepPurple, green } from '@material-ui/core/colors';
import List from "./List";
// import axios from "axios";
// import { useState } from "react";
import Sidebar from './Sidebar';


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
 })


//  Form => State=> api => db

const Employees = () => {
  const classes = useStyles();
  // const [name,setName] =useState("");
  // const [email,setEmail] =useState("");
  // const [phone,setPhone] =useState("");
  // const [gender,setGender] =useState("");
  
  


  
  async function saveEmployeeData() {
    const obj = {
      name:"",
      email:"",
      phone:"",
      gender:""
    }


    const response = await fetch("http://localhost:1999/employee",{
      method:"POST",
      body:JSON.stringify(obj),
      headers:{
        'Content-Type': 'application/json'
      }
    })

    const res = await response.json()
    console.log(res);
  }
  





  return (
    <> 
    
      <Box textAlign="center" className={classes.headingColor} p={2} mb={2}>
        <Typography variant="h4" className={classes.headingColor}>EMPLOYEE DATA</Typography>
      </Box>
      <Grid container justifyContent="center" spacing={4}>
        <Grid item md={6} xs={12}>
          <Box textAlign="center" p={2} className={classes.addEmpColor} mb={2}>
            <Typography variant="h5" className={classes.addEmpColor}>Add Employee</Typography>
          </Box>
          <form noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField autoComplete="name"  variant="outlined" required fullWidth    label="Name" />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="email" variant="outlined" required fullWidth  label="Email Address" />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="phone" variant="outlined" required fullWidth    label="Phone" />
              </Grid>
              <Grid item xs={12}>
                <TextField autoComplete="gender" variant="outlined" required fullWidth    label="Gender" />
              </Grid>
            </Grid>
            <Box m={3}>
              <Button type="button" variant="contained"  onClick={saveEmployeeData} style={{fontWeight: "bold", marginTop:"10px"}}  >Add</Button>
            </Box>
          </form>
        </Grid>

        <Grid item md={6} xs={12}>
          <List />
        </Grid>
      </Grid>

      
      {/* onSubmit={handleFormSubmit} */}
      

    </>
  )
}

export default Employees


// onChange={(e) => setGender(e.target.value)}