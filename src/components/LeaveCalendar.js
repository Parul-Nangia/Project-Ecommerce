import { Calendar, Badge } from "antd";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import LeavesDate from '../components/LeavesDate';




const LeaveCalendar = () => {
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  const [employeeLeaveRanges, setEmployeeLeaveRanges] = useState([]);
  const [together, setTogether] = useState([]);

  console.log("LeavesDate?.leaveData?.length", LeavesDate?.leaveData?.LeaveDate)
  for (let i = 0; i < LeavesDate?.leaveData?.length; i++) {

    function getDates(startDate, endDate) {
      const dates = []
      let currentDate = startDate
      const addDays = function (days) {
        const date = new Date(this.valueOf())
        date.setDate(date.getDate() + days)
        return date
      }
      while (currentDate <= endDate) {
        dates.push(currentDate)
        currentDate = addDays.call(currentDate, 1)
      }
      return dates
    }
    const dates = getDates(new Date(LeavesDate?.leaveData[i]?.LeaveDate), new Date(LeavesDate?.leaveData[i]?.ReturnDate))
    console.log("LeaveDate", LeavesDate?.leaveData[i]?.LeaveDate)
    dates.forEach(function (date) {
    })

    LeavesDate.leaveData[i].leaveDatesinRange = dates;
    console.log("LeavesDate.leaveData[i].leaveDatesinRange", LeavesDate.leaveData[i])
  }


  useEffect(() => {
    const AllLeaveData = () => {

      fetch(`${process.env.REACT_APP_BASE_URL}/leave`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          setEmployeeLeaves(data?.leaveData);

          console.log("leaves", data?.leaveData)

        });

    };
    AllLeaveData();
  }, []);



  const dateCellRender = (value) => {
    // console.log("value", value)
    const stringValue = value.format("YYYY-MM-DD");
    // console.log("stringValue",typeof stringValue)

    const listData = employeeLeaves.filter(
      ({ LeaveDate }) => LeaveDate === stringValue);

    console.log("listData", listData)




    return (
      <>
        <ul className="events">
          {/* {listData.map((item) => (
            <li key={item._id}>
              <Badge status={"success"} text={item.EmployeeName} />
            </li>
          ))} */}
        </ul>
      </>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};

export default LeaveCalendar;
