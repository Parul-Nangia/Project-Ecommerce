import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import Sidebar from './Sidebar';
import Header from '../components/Header';




const Attendance = () => {
  return (
    <>
    <Header/>
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
