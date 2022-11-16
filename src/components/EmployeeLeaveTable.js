import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";

const Employeeleavetable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    employeedata();
  }, []);

  const employeedata = async () => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/leave/${decoded._id}`)
      .then((res) => {
        console.log(res, "hello");

        setData(res?.data?.leaveEmpByID);

        console.log("leavedata", data);
      });
  };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "EmployeeName",
    },
    {
      title: "Supervisor Name",
      dataIndex: "SupervisorName",
    },
    {
      title: "Department",
      dataIndex: "Department",
    },
    {
      title: "Reason",
      dataIndex: "LeaveType",
    },
    {
      title: "From",
      dataIndex: "LeaveDate",
    },
    {
      title: "To",
      dataIndex: "ReturnDate",
    },
    {
      title: "Hours",
      dataIndex: "Hours",
    },
    {
      title: "Days",
      dataIndex: "Days",
    },
    {
      title: "Status",
      dataIndex: "Approvalstatus",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Employeeleavetable;
