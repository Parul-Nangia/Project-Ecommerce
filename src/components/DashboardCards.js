import { Card, Col, Row } from "antd";
import React from "react";
import { useState, useEffect } from "react";

const DashboardCards = () => {
  const [employs, setEmploys] = useState([]);
  const [todayLeave, setTodayLeave] = useState([]);
  const [weekLeave, setweekLeave] = useState([]);
  const [monthLeave, setMonthLeave] = useState([]);

  //============================================================== Start Total Employees====================================================================================
  const employeeList = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/user`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let emp = data.userData;

        setEmploys(emp);
      });
  };
  useEffect(() => {
    employeeList();
  }, []);
  //============================================================== End Total Employees====================================================================================

  //============================================================== Start Weekly On Leave Employees====================================================================================

  const thisWeekEmployeeLeaveData = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/leave/WeekData`)
      .then((response) => {
        return response.json();
      })
      .then((empWeekdata) => {
        let empWeekLeave = empWeekdata.data;
        console.log("Weekly On Leave", empWeekLeave);

        setweekLeave(empWeekLeave);
      });
  };
  useEffect(() => {
    thisWeekEmployeeLeaveData();
  }, []);
  //============================================================== End Weekly On Leave Employees====================================================================================

  //============================================================== Start Today On Leave Employee====================================================================================
  const todayEmployeeLeaveData = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/leave/TodayData`)
      .then((response) => {
        return response.json();
      })
      .then((empTodaydata) => {
        let empTodayLeave = empTodaydata.data;
        console.log("Today On Leave", empTodayLeave);

        setTodayLeave(empTodayLeave);
      });
  };
  useEffect(() => {
    todayEmployeeLeaveData();
  }, []);
  //===========
  //============================================================== End Today On Leave Employees====================================================================================

  //============================================================== Start Monthly On Leave Employees====================================================================================

  const MonthLeaveData = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/leave/monthdata`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let employeeLeaves = data.MonthLeaveData;
        setMonthLeave(employeeLeaves);

        console.log("Month Leave Data", employeeLeaves);
      });
  };
  useEffect(() => {
    MonthLeaveData();
  }, []);

  //============================================================== End Monthly On Leave Employees====================================================================================

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6} className="dashboardcards">
            <Card title="Employees" bordered={false}>
              {/* {employs.length} */}
            </Card>
          </Col>
          <Col span={6} className="dashboardcards">
            <Card title="Today On Leave" bordered={false}>
              {/* {todayLeave.length} */}
            </Card>
          </Col>
          <Col span={6} className="dashboardcards">
            <Card title="Leave Data(Week)" bordered={false}>
              {/* {weekLeave.length} */}
            </Card>
          </Col>
          <Col span={6} className="dashboardcards">
            <Card title="Leave Data(Month) " bordered={false}>
              {/* {monthLeave.length} */}
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DashboardCards;
