import React  from 'react';
import { Link, useNavigate } from 'react-router-dom'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';

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
  })



const Leave = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const views = ["tableview" , "calendarview"];
       
return (
    <>
    <Navbar />
    <Sidebar>
        <div>
        
          <LeaveCards/>
          
              <Link to="/leaveform"></Link>
              <br/>
              <Button className={classes.btnCenter} onClick={()=> navigate('/leaveform')}>Apply Leave</Button>
              <br/>
              <br/>
            <Button className={classes.btnCenter} onClick={()=> navigate('/leavecalendar')}>Calendarview</Button>
              
            {views ? <LeaveTable/> : <LeaveCalendar/>}
          
        </div>

    </Sidebar>
    </>
  );
};

export default Leave;