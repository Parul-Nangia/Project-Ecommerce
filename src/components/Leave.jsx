import React  from 'react';
import { Link, useNavigate } from 'react-router-dom'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';





const Leave = (props) => {
  const navigate = useNavigate();
  const views = ["tableview" , "calendarview"];
     
       
return (
    <>
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
    </>
  );
};

export default Leave;
