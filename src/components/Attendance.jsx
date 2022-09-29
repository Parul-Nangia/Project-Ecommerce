import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import Sidebar from './Sidebar';
import Header from '../components/Header';
import Navbar from '../components/Navbar';




const Attendance = () => {
  return (
    <>
      <Navbar />
      <Sidebar>
        <div>           
          <AttendanceCards/>
          <AttendanceTable/>     
      </div>
      </Sidebar>  
    </>
  );
};

export default Attendance;
