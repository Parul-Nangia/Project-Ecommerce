import { Calendar, Badge } from "antd";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";

const LeaveCalendar = () => {
  const [employeeLeaves, setEmployeeLeaves] = useState([]);

  useEffect(() => {
    const MonthLeaveData = () => {
      fetch(`${process.env.REACT_APP_BASE_URL}/leave/monthdata`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let leaves = data.MonthLeaveData;
          setEmployeeLeaves(leaves);

          // console.log("Calendar Leave Data", employeeLeaves);
          console.log("Leave Date", leaves.LeaveDate)
          console.log("Return Date", leaves.ReturnDate)

          let i = 0;
          while (i < leaves.length) {
            // console.log("leaves", leaves)
            console.log("Leave Array Iterate", leaves[i].LeaveDate);
            i++;
          }
          // let text = ""
          // for (let a = leaves[i].LeaveDate; )
        });
    };

    MonthLeaveData();
  }, []);


  const dateCellRender = (value) => {
    const stringValue = value.format("YYYY-MM-DD");
    const listData = employeeLeaves.filter(
      ({ LeaveDate }) => LeaveDate === stringValue);

    return (
      <>
        <ul className="events">
          {listData.map((item) => (
            <li key={item._id}>
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
