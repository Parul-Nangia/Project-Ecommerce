import React  from 'react';
import { Link, useNavigate } from 'react-router-dom'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';


const Leave = (props) => {
  const navigate = useNavigate();
  const views = ["tableview" , "calendarview"];
     
       
return (
    <>
    <Sidebar>
      <Header/>
    <div>
    
      <LeaveCards/>
      
          <Link to="/leaveform"></Link>
          <br/>
          <button onClick={()=> navigate('/leaveform')}>Apply Leave</button>
          <br/>
          <br/>
         <button onClick={()=> navigate('/leavecalendar')}>Calendarview</button>
          
         {views ? <LeaveTable/> : <LeaveCalendar/>}
      
    </div>
    </Sidebar>
    </>
  );
};

export default Leave;
