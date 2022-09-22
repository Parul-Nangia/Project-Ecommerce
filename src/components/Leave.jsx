import React from 'react';
import Sidebar from './Sidebar';
import LeaveTable from '../components/LeaveTable';
import LeaveCards from '../components/LeaveCards';

const Leave = () => {
  return (
    <>
    <div>
      <LeaveCards/>
      <LeaveTable/>
      
    </div>
    </>
  );
};

export default Leave;
