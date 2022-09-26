import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import Header from '../components/Header';



const Attendance = () => {
  return (
    <>
    <Header/>
    <div>
      <AttendanceCards/>
      <AttendanceTable/>
     </div>
    </>
  );
};

export default Attendance;
