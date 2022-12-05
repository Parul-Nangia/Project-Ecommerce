import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import EmployeeAttendanceCalendar from '../components/EmployeeAttendanceCalendar';
import Clock from '../components/Clock';
import jwt_decode from 'jwt-decode';
import Error from '../components/Error';
import { useState, useEffect } from "react";
import { FcCalendar } from "react-icons/fc";
import { Button, Modal } from "antd";
import { Calendar, Badge } from "antd";
import axios from "axios";
import {
  ScheduleOutlined 
} from "@ant-design/icons";




const Attendance = () => {

  const [name, setName] = useState("");
  const [isopenmodal, setIsOpenModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    const userData = () => {
      const token = localStorage.getItem("access_token1");
      console.log("token from local storage:", token)
      // let token = token;
      var decoded = jwt_decode(token);
      console.log("Decoded token data", decoded);
      setName(decoded)
    }
    userData();

  }, [])


  useEffect(() => {
    const getAllData = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/attendance`)
        .then((res) => {
          setDataSource(res?.data?.attendanceData);
        });
    };
    getAllData();
  }, []);

  const dateCellRender = (value) => {
    // console.log("value", value)
    const stringValue = value.format("YYYY-MM-DD");
    var newArray = dataSource?.filter(function (el) {

      return el.TodayDate === stringValue

      //  el.EmployeeName &&
      //  el._id;

    }
    )
    console.warn("dataSource", dataSource)

    return (
      <>

        {/* <ul className="events"> */}
        {newArray.map((item) => (
          <li key={item._id}>
            <Badge status="success" text={item.name}/>
          </li>
        ))}
        {/* </ul> */}

      </>
    )

  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const showModal = () => {
    setIsOpenModal(true);

  };

  if (name.role === "admin") {
    console.log("my role is ", name.role)
    return (
      <>
        <div style={{ display: "flex" }}>
          <h1>DATE :</h1>

          <div style={{ marginLeft: "5px" }}>{new Date().toLocaleDateString()}</div>

          <h1 style={{ marginLeft: "15px" }}>TIME :</h1>
          <div style={{ marginLeft: "5px" }}>{new Date().toLocaleTimeString()}</div>
        </div>

        <br />
        <AttendanceCards />
        <br />
        <Button
        onClick={showModal}
        className="calendarbtn2"
        >
        Calendar view{<ScheduleOutlined />}
        </Button>
        <br />
        <Modal

          title="All employees attendance"
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{ style: { display: "none" } }}
          open={isopenmodal}
          onCancel={handleCancel}
          width={1000}
        >
          <Calendar dateCellRender={dateCellRender} />
        </Modal>
        <AttendanceTable />

      </>
    )
  }
  if (name.role === "employee") {
    return (
      <>
        <div style={{ display: "flex" }}>
          <h1>DATE :</h1>

          <div style={{ marginLeft: "5px" }}>{new Date().toLocaleDateString()}</div>

          <h1 style={{ marginLeft: "15px" }}>TIME :</h1>
          <div style={{ marginLeft: "5px" }}>{new Date().toLocaleTimeString()}</div>
        </div>
        <div>
          <EmployeeAttendanceCalendar />
        </div>
      </>
    )

  }
  else {




  }
};

export default Attendance;
