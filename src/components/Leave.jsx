import React from 'react';
import LeaveTable from '../components/LeaveTable';
import LeaveCards from '../components/LeaveCards';
import Sidebar from './Sidebar';



const Leave = () => {
  return (
    <>
      <Sidebar>
      
          <div>
            <LeaveCards/>
            <LeaveTable/>
            
          </div>
        
      </Sidebar>  
    </>
  );
};

export default Leave;
