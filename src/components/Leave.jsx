import React  from 'react';
import { Link, useNavigate } from 'react-router-dom'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';

import Sidebar from '../components/Sidebar';

import Navbar from '../components/Navbar';

import { Button } from 'antd';





const Leave = (props) => {
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
              <Button type='primary' onClick={()=> navigate('/leaveform')}>Apply Leave</Button>
              <br/>
              <br/>
            <Button type='primary' onClick={()=> navigate('/leavecalendar')}>Calendarview</Button>
              
            {views ? <LeaveTable/> : <LeaveCalendar/>}
          
        </div>

    </Sidebar>
    </>
  );
};

export default Leave;