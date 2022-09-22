import React from 'react';
import Sidebar from './Sidebar';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';



const Attendance = () => {
  return (
    <>
    <div>

      <Sidebar />
      

      <AttendanceCards/>
      <AttendanceTable/>
    
  
    </div>
    </>
  );
};

export default Attendance;
