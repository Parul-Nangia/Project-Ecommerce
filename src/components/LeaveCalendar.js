import { Calendar, Badge } from 'antd';
// import moment from 'moment';
import React, { useState, useEffect } from 'react';
import "antd/dist/antd.css";





const LeaveCalendar = () => {

  const [calendarLeaveData, setCalendarLeaveData] = useState([]);
  // console.log(" check LeaveDate here", calendarLeaveData.LeaveDate)







  const MonthLeaveData = () => {
    fetch("http://localhost:1999/leave/monthdata").then((response) => {
      return response.json();
    }).then((data) => {
      let employeeLeaves = data.MonthLeaveData
      setCalendarLeaveData(employeeLeaves);

      console.log("Month Leave Data for Calendar", employeeLeaves);

    })

  }
  useEffect(() => {
    MonthLeaveData();

  }, [])








  // YYYY-MM-DDTHH:mm:ss.sssZ

  const dateCellRender = (value) => {

    const stringValue = value.format("YYYY-MM-DD");
    const listData = calendarLeaveData.filter(({ LeaveDate }) => LeaveDate === stringValue);
  
    const start = calendarLeaveData.LeaveDate;
    console.log("hello calendar start date here", start)
    const end = calendarLeaveData.ReturnDate;
    console.log("hello calendar end date here", end)
    var datelist = ""
    for (let i = "2022-10-01" ; i <= "2022-10-30" ; i++) {
      datelist += [i]
      console.log("Date List Here",datelist)
    }

    // let loop = start;
    // while (loop <= end) {
    //   console.log(loop);
    //   let newDate = loop.setDate(loop.getDate() + 1);
    //   loop = new Date(newDate);
    // }







    // for (let i = LeaveDate; i < LeaveDate; i++) {
    //   function getDatesInRange(startDate, endDate) {
    //     const date = (startDate.getTime());

    //     const dates = [];

    //     while (date <= endDate) {
    //       dates.push((date));
    //       date.setDate(date.getDate() + 1);
    //     }

    //     return dates;
    //   }

    //   const d1 = ('2022-10-01');
    //   const d2 = ('2022-12-30');

    //   console.log(getDatesInRange(d1, d2));
    // }



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