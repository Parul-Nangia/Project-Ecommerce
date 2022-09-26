import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import Sidebar from './Sidebar';



const Attendance = () => {
  return (
    <>
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
