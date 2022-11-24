import { Calendar, Badge } from "antd";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import jwt_decode from 'jwt-decode';





const LeaveCalendar = () => {
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  const [employeeLeavelisiting, setEmployeeLeaveLisiting] = useState([]);
  // console.log("employeeLeavelisiting", employeeLeavelisiting)
  const [together, setTogether] = useState();








  useEffect(() => {
    const employeeleavedata = () => {

      const token = localStorage.getItem("access_token1");
      var decoded = jwt_decode(token);
      console.log("decoded", decoded._id)

      fetch(`${process.env.REACT_APP_BASE_URL}/leave/${decoded._id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data?.leaveByEmpID?.length > 0) {
            setEmployeeLeaves(data?.leaveByEmpID);
            console.log("employeeLeaves", data?.leaveByEmpID)

          }

          for (let i = 0; i < data?.leaveByEmpID?.length; i++) {
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
                dates.push({ "leavedatelist": MyDateString, "EmployeeName": data?.leaveByEmpID[i].EmployeeName, "_id": data?.leaveByEmpID[i]._id })
                currentDate = addDays.call(currentDate, 1)
              }
              return dates
            }
            const dates = getDates(new Date(data?.leaveByEmpID[i]?.LeaveDate), new Date(data?.leaveByEmpID[i]?.ReturnDate))

            console.log("LeaveDate", data?.leaveByEmpID[i]?.LeaveDate)
            dates.forEach(function (date) {
            })
            data.leaveByEmpID[i].leaveDatesinRange = dates
          }

        });

    };
    employeeleavedata();

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


    var newArray = arr.filter(function (el) {
      // console.log("employeeLeavessdgv", employeeLeaves[d]?.leaveDatesinRange)
      return el.leavedatelist === stringValue

      //  el.EmployeeName &&
      //  el._id;

    }
    )
    // console.log("newArray", newArray)




    return (
      <>

        {/* <ul className="events"> */}
        {newArray.map((item) => (
          <li key={item._id}>
            <Badge status="error" text={item.EmployeeName} />
          </li>
        ))}
        {/* </ul> */}

      </>
    )

  };

  return <Calendar dateCellRender={dateCellRender} />;

}

export default LeaveCalendar;
