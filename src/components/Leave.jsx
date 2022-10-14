import React, { useState } from 'react'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd';







const Leave = (props) => {
  const navigate = useNavigate();
  const [size, setSize] = useState('default');

  const [view, setView] = useState(false);

  return (

    <>
      
              <div>

                <LeaveCards />
                <Link to="/leaveform"></Link>
                <br />
                <Button style={{ background: "MediumSeaGreen" }} type="primary" size={size} onClick={() => navigate('/leaveform')}>Apply Leave</Button>


                <h1>{view}</h1>
                <div>
                  <Button type="dashed" size={size} onClick={() => setView(!view)}>CalendarView</Button>

                  <Button type="dashed" size={size} onClick={() => setView(!view)}>ListView</Button>
                </div>
                <br />
                {view ? <LeaveTable /> : <LeaveCalendar />}
              </div>

           



    </>
  );
};

export default Leave;