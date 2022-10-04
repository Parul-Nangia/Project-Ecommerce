import React ,{useState} from 'react'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import {Link, useNavigate} from 'react-router-dom'
import Sidebar from '../components/Sidebar';

import Navbar from '../components/Navbar';
import { makeStyles } from "@material-ui/core";

import { Button } from 'antd';

const useStyles = makeStyles({
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
  contain:{
   
    marginTop:"100px",
    marginLeft:"80px"


  }
  })



const Leave = (props) => {
  const navigate = useNavigate();
  const classes = useStyles();
  
  const [view,setView]= useState(false);
  
return (

    <>
  
    <Navbar />
    <Sidebar>
   
        <div className={classes.contain}>
        
          <LeaveCards/>
           <Link to="/leaveform"></Link>
              <br/>
              <Button className={classes.btnCenter} onClick={()=> navigate('/leaveform')}>Apply Leave</Button>
              
            <h1>{view}</h1>
           <Button onClick={()=> setView(!view)}>LeaveCalendar</Button>
           <Button onClick={()=> setView(!view)}>LeaveTable</Button>
           {view ? <LeaveTable/> : <LeaveCalendar/>}
        </div>
             
    </Sidebar>
    </>
  );
};

export default Leave;