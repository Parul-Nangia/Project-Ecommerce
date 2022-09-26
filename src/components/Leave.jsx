import React from 'react';
import Sidebar from './Sidebar';
import LeaveTable from '../components/LeaveTable';
import LeaveCards from '../components/LeaveCards';
import Header from '../components/Header';

const Leave = () => {
  return (
    <>
    <Sidebar />
    <Header/>
    <div>
      <LeaveCards/>
      <LeaveTable/>
      
    </div>
    </>
  );
};

export default Leave;
