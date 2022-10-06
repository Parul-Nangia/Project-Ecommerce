import React, { useState } from 'react'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import { Link, useNavigate } from 'react-router-dom'
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
import { Button } from 'antd';





const Leave = (props) => {
  const navigate = useNavigate();
  const [size, setSize] = useState('small');

  const [view, setView] = useState(false);

  return (

    <>


      <div>

        <LeaveCards />
        <Link to="/leaveform"></Link>
        <br />
        <Button type="primary" size={size} onClick={() => navigate('/leaveform')}>Apply Leave</Button>


        <h1>{view}</h1>
        <div>
          <Button type="primary" size={size} onClick={() => setView(!view)}>LeaveCalendar</Button>
 
          <Button type="primary" size={size} onClick={() => setView(!view)}>LeaveTable</Button>
        </div>

        {view ? <LeaveTable /> : <LeaveCalendar />}
      </div>


    </>
  );
};

export default Leave;