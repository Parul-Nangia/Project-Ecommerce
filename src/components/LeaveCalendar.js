import { Calendar, Badge } from "antd";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";

const LeaveCalendar = () => {
  const [calendarLeaveData, setCalendarLeaveData] = useState([]);

  const MonthLeaveData = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/leave/monthdata`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let employeeLeaves = data.MonthLeaveData;
        setCalendarLeaveData(employeeLeaves);

        console.log("Month Leave Data for Calendar", employeeLeaves);
      });
  };
  useEffect(() => {
    MonthLeaveData();
  }, []);

  // YYYY-MM-DDTHH:mm:ss.sssZ

  const dateCellRender = (value) => {
    const stringValue = value.format("YYYY-MM-DD");
    const listData = calendarLeaveData.filter(
      ({ LeaveDate }) => LeaveDate === stringValue
    );

    const start = calendarLeaveData.LeaveDate;
    console.log("hello calendar start date here", start);
    const end = calendarLeaveData.ReturnDate;
    console.log("hello calendar end date here", end);
    var datelist = "";
    for (let i = "2022-10-01"; i <= "2022-10-30"; i++) {
      datelist += [i];
      console.log("Date List Here", datelist);
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
