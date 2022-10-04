import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import Sidebar from './Sidebar';
import Navbar from '../components/Navbar';




const Attendance = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
        <div>           
          <AttendanceCards/>
          <AttendanceTable/>     
      </div>
    
    </>
  );
};

export default Attendance;
