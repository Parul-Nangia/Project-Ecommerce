import { Calendar, Badge } from 'antd';
// import moment from 'moment';
import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";





const LeaveCalendar = () => {

  const [weekLeave, setweekLeave] = useState([]);
  const [LeaveDate, setLeaveDate] = useState("");
 



  const thisWeekEmployeeLeaveData = () => {
    fetch("http://localhost:1999/leave/MonthData")

      .then((response) => {
        return response.json();
      }).then((empMonthdata) => {

        let empLeave = empMonthdata.data

        console.log("Employee Leave Data", empLeave)


        setweekLeave(empLeave)
        setLeaveDate(empLeave.LeaveDate)

      })

  }
  useEffect(() => {
    thisWeekEmployeeLeaveData();

  }, [])








  // YYYY-MM-DDTHH:mm:ss.sssZ

  const dateCellRender = (value) => {

    const stringValue = value.format("YYYY-MM-DD");
    const listData = weekLeave.filter(({ LeaveDate }) => LeaveDate === stringValue);
    
    for (let i = LeaveDate; i < LeaveDate; i++) {
        function getDatesInRange(startDate, endDate) {
          const date = (startDate.getTime());
        
          const dates = [];
         
          while (date <= endDate) {
            dates.push((date));
            date.setDate(date.getDate() + 1);
          }
        
          return dates;
        }
      
        const d1 = ('2022-10-01');
        const d2 = ('2022-12-30');
        
      console.log(getDatesInRange(d1, d2));
    }



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