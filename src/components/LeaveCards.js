import React from "react";
import { Card, Col, Row } from "antd";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const LeaveCards = () => {
  const [priviliege, setPriviliege] = useState([]);
  const [sick, setSick] = useState([]);
  const [casual, setCasual] = useState([]);
  const [holiday, setHoliday] = useState([]);

  //============================================================== Start Casual Leave====================================================================================
  useEffect(() => {
  const EmployeeCasualLeave = async () => {
    const token = localStorage.getItem("access_token1");

    var decoded = jwt_decode(token);
    console.log("Employee Casual Decoded token data", decoded);
 
    await axios.get(`${process.env.REACT_APP_BASE_URL}/leave/casual/${decoded._id}`)
    .then((res) => {
      console.log("CasualLeaveData", res);
      if (res?.data?.length === 0) {
        console.warn("Casual not taken yet")
        setCasual(7 - res?.data?.length);
      } else if (res?.data?.length > 7) {
        console.warn("Casual greater 7")

        setCasual("0");
      } else if (res?.data?.length < 7) {
        console.warn("Casual less 7")
        setCasual(7 - res?.data?.length);
      }
    });
       
    
  };
 
    EmployeeCasualLeave();
  }, []);

  //===========
  //============================================================== End Casual Leave====================================================================================

  //============================================================== Start Sick Leave====================================================================================
  useEffect(() => {

  const EmployeeSickLeave = async () => {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
  

    await axios.get(`${process.env.REACT_APP_BASE_URL}/leave/sick/${decoded._id}`)
        .then((res) => {
          console.log("SickLeaveData", res);
          if (res?.data?.length === 0) {
            console.warn("Sick not taken yet")
            setSick(7 - res?.data?.length);

          } else if (res?.data?.length > 7) {
            console.warn("Sick greater 7")

            setSick("0");
          } else if (res?.data?.length < 7) {
            console.warn("Sick less 7")
            setSick(7 - res?.data?.length);
          }
        });
  };
    EmployeeSickLeave();
  }, []);

  //===========
  //============================================================== End Sick Leave====================================================================================

  //============================================================== Start Priviliege Leave====================================================================================
  useEffect(() => {
    const EmployeePriviliegeLeave = async () => {
      const token = localStorage.getItem("access_token1");

      var decoded = jwt_decode(token);
      console.log("Employee Priviliege Decoded token data", decoded);
      let emp_id = decoded._id;
      console.log("Please help ", emp_id);

      await axios.get(`${process.env.REACT_APP_BASE_URL}/leave/priviliege/${decoded._id}`)
        .then((res) => {
          console.log("PriviledgeLeaveData", res);
          if (res?.data?.length === 0) {
            console.warn("Priviliege not taken yet")
            setPriviliege(11- res?.data?.length);

          } else if (res?.data?.length > 11) {
            console.warn("Priviliege greater than 11")
            setPriviliege("0");
          } else if (res?.data?.length < 11) {
            console.warn("Priviliege less than 11")
            setPriviliege(11- res?.data?.length);
          }

        });

    };

    EmployeePriviliegeLeave();
  }, []);

  //===========
  //============================================================== End Priviliege Leave====================================================================================

  //============================================================== Start Holiday API====================================================================================
  useEffect(() => {
  const holidayList = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/holiday`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let userHolidays = data.HolidaysPending;
        setHoliday(userHolidays);

        console.log("HolidaysPending", userHolidays);
      });
  };

    holidayList();
  }, []);

  //===========
  //============================================================== End Holiday API====================================================================================

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6} className="dashboardcards">
            <Card title="Priviliege Pending" bordered={false}>
              {priviliege}
            </Card>
          </Col>
          <Col span={6} className="dashboardcards">
            <Card title="Sick Pending" bordered={false}>
              {sick}
            </Card>
          </Col>
          <Col span={6} className="dashboardcards">
            <Card title="Casual Pending" bordered={false}>
              {casual}
            </Card>
          </Col>
          <Col span={6} className="dashboardcards">
            <Card title="Holidays Pending 2022" bordered={false}>
              {holiday.length}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LeaveCards;
