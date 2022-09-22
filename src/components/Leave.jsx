import React from 'react';
import Sidebar from './Sidebar';
import LeaveTable from '../components/LeaveTable';
import LeaveCards from '../components/LeaveCards';

const Leave = () => {
  return (
    <>
    <div>
      <Sidebar />
      <LeaveCards/>
      <LeaveTable/>
      
    </div>
    </>
  );
};

export default Leave;
