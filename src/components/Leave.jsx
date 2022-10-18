import React, { useState } from 'react'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd';





const Leave = (props) => {
//   const navigate = useNavigate();
//   const [size, setSize] = useState('default');

//   const [view, setView] = useState(false);

  return (

    <>
    
                <LeaveCards />
                {/* <br/>
                <LeaveTable />
                <br/>
                <LeaveCalendar /> */}
                

    </>
  );
};

export default Leave;