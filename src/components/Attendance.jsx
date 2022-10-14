import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import Clock from '../components/Clock';
import Top from '../components/Top';
import Sidebar from '../components/Sidebar';
import Middle from '../components/Middle';
import { Layout } from 'antd';
const { Content } = Layout;




const Attendance = () => {
  return (
    <>



              <AttendanceCards />
              <br />
              <Clock />
              <br/>
              <AttendanceTable />
             
             





    </>
  );
};

export default Attendance;
