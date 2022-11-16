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
          // console.log("Leave Date", leaves.LeaveDate)
          // console.log("Return Date", leaves.ReturnDate)
          // console.log("leave length", leaves.length)

          // let text = ""
          // for (let a = leaves[i].LeaveDate; a < leaves[i].ReturnDate; i++) {
          //   text += leaves[i];
          //   console.log("text", text)
          // }

        });
    };

    MonthLeaveData();
  }, []);


  const dateCellRender = (value) => {
    // var daysOfYear = [];
    // console.log("value", value)
    const stringValue = value.format("YYYY-MM-DD");
    // console.log("stringValue", stringValue)
    const listData = employeeLeaves.filter(
      ({ LeaveDate }) => LeaveDate === stringValue);
    // const list = employeeLeaves.filter(
    //   ({ ReturnDate }) => ReturnDate === stringValue);


    // for (var d = empleaveDate; d <= empreturnDate; d.setDate(d.getDate() + 1)) {
    //   daysOfYear.push(new Date(d));
    // }
    // console.log("daysOfYear", daysOfYear)

    // var now = new Date();
    // var daysOfYear = [];
    // for (var d = new Date(2012, 0, 1); d <= now; d.setDate(d.getDate() + 1)) {
    //   daysOfYear.push(new Date(d));
    // }
    // // console.log("daysOfYear", daysOfYear)

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
