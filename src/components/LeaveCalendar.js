import { Calendar, Badge } from "antd";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import LeavesDate from '../components/LeavesDate';




const LeaveCalendar = () => {
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  const [employeeLeavelisiting, setEmployeeLeaveLisiting] = useState([]);
  // console.log("employeeLeavelisiting", employeeLeavelisiting)
  const [together, setTogether] = useState();








  useEffect(() => {
    const AllLeaveData = () => {

      fetch(`${process.env.REACT_APP_BASE_URL}/leave`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data?.leaveData?.length > 0) {
            setEmployeeLeaves(data?.leaveData);
            console.log("no need to wait for data")
            console.log("employeeLeaves", data?.leaveData)

          }


          for (let i = 0; i < data?.leaveData?.length; i++) {
            // console.log("leaves", data?.leaveData?.length)
            // console.log("leaves", data?.leaveData)
            // console.log("leaves", data?.leaveData[i])
            function getDates(startDate, endDate) {
              const dates = []
              let currentDate = startDate
              const addDays = function (days) {
                const date = new Date(this.valueOf())
                date.setDate(date.getDate() + days)
                return date
              }
              while (currentDate <= endDate) {
                // let text = currentDate.toString();
                var MyDate = new Date(currentDate);
                var MyDateString;
                MyDate.setDate(MyDate.getDate());
                MyDateString =
                  MyDate.getFullYear() +
                  "-" +
                  ("0" + (MyDate.getMonth() + 1)).slice(-2) +
                  "-" +
                  ("0" + MyDate.getDate()).slice(-2);
                dates.push({ "leavedatelist": MyDateString, "EmployeeName": data?.leaveData[i].EmployeeName, "_id": data?.leaveData[i]._id })
                currentDate = addDays.call(currentDate, 1)
              }
              return dates
            }
            const dates = getDates(new Date(LeavesDate?.leaveData[i]?.LeaveDate), new Date(LeavesDate?.leaveData[i]?.ReturnDate))
            // console.log("LeaveDate", LeavesDate?.leaveData[i]?.LeaveDate)

            dates.forEach(function (date) {
            })
            data.leaveData[i].leaveDatesinRange = dates
          }

        });

    };
    AllLeaveData();

  }, []);




  const dateCellRender = (value) => {
    // console.log("value", value)
    const stringValue = value.format("YYYY-MM-DD");
    console.log("stringValue", stringValue)
    var arr = []
    for (let y = 0; y < employeeLeaves?.length; y++) {
      if (employeeLeaves[y]?.leaveDatesinRange.length !== 0) {

        for (let t = 0; t < employeeLeaves[y]?.leaveDatesinRange.length; t++) {

          arr.push(employeeLeaves[y]?.leaveDatesinRange[t])
        }
      }
    }
    console.log("arrr", arr)

    // for (let d = 0; d < employeeLeaves?.length; d++) {
      // console.log("employeeLeavessdgv", employeeLeaves[d])
      var newArray = arr.filter(function (el) {
        // console.log("employeeLeavessdgv", employeeLeaves[d]?.leaveDatesinRange)
        return el.leavedatelist === stringValue

        //  el.EmployeeName &&
        //  el._id;

      }
      )

      // console.log("newArray", newArray)
    // }



    return (
      <>
   
      </>
    )

  };

  return <Calendar dateCellRender={dateCellRender} />;

}

export default LeaveCalendar;
