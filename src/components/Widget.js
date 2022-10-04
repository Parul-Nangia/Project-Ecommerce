import React from 'react';
import "./widget.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import { useState, useEffect } from "react";

const Widget = ({ type }) => {

  const [employs, setEmploys] = useState([]);
  let data;


  // temp

  // const leave = 10;
  // const diff = 5;



  const employeeList = () => {
    fetch("http://localhost:1999/employee")

      .then((response) => {
        return response.json();
      }).then((data) => {

        let emp = data.employeeData


        setEmploys(emp)
      })

  }
  useEffect(() => {
    employeeList();

  }, [])





  switch (type) {
    case "user":
      data = {
        title: "Employees",
        // isLeave: false,
        link: "View",
        icon: <PersonOutlinedIcon className="Icon" />,
      };
      break;
    case "leave":
      data = {
        title: "LEAVE",
        // isLeave: true,
        link: "View leave",
        icon: <LocalPharmacyIcon className="Icon" />,
      };
      break;
    case "holiday":
      data = {
        title: "HOLIDAY",
        // isLeave: true,
        link: "See all holidays",
        icon: <HolidayVillageIcon className="Icon" />,
      };
      break;
    case "status":
      data = {
        title: "STATUS",
        // isLeave: true,
        link: "See all status",
        icon: <RunningWithErrorsIcon className="Icon" />,
      };
      break;
    default:
      break;
  }

  return (

    <>

      <div className="widget">
        <div className="left">
          <span className="title">{data.title}</span>
          <span className="counter">{employs.length}</span>
          <span className="link">View</span>
        </div>
        <div className="right">
          {data.icon}
        </div>
      </div>





    </>


  );
};

export default Widget
