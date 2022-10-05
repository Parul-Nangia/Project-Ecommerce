import { Calendar, Badge } from 'antd';
// import moment from 'moment';
import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";





const LeaveCalendar = () => {

  const [weekLeave, setweekLeave] = useState([]);
 



  const thisWeekEmployeeLeaveData = () => {
    fetch("http://localhost:1999/leave/MonthData")

      .then((response) => {
        return response.json();
      }).then((empMonthdata) => {

        let empLeave = empMonthdata.data

        console.log("Employee Leave Data", empLeave)


        setweekLeave(empLeave)
        
      


      })

  }
  useEffect(() => {
    thisWeekEmployeeLeaveData();

  }, [])










  // YYYY-MM-DDTHH:mm:ss.sssZ

  const dateCellRender = (value) => {

    const stringValue = value.format("YYYY-MM-DD");
    const listData = weekLeave.filter(({ LeaveDate }) => LeaveDate === stringValue);

    return (
       
      <>
        <ul className="events">

          {listData.map((item) => (

         
              <li key={item.EmployeeName}>
                
                <Badge status={"success"} text={item.EmployeeName} />
              </li>
         
          ))}
            </ul>



      </>
        );
  };

        return <Calendar dateCellRender={dateCellRender} />;
};

        export default LeaveCalendar;