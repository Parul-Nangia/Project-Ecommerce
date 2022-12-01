import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  QuestionOutlined
} from "@ant-design/icons";
import { FcHighPriority, FcApproval, FcCancel, FcInfo, } from "react-icons/fc";

const Employeeleavetable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    employeedata();
  }, []);

  const employeedata = async () => {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);


    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/leave/${decoded._id}`)
      .then((res) => {
        console.log(res, "hello");

        setData(res?.data?.leaveByEmpID);

        console.log("leavedata", res?.data?.leaveByEmpID);
      });
  };



  const columns = [
    {
      title: "Name",
      dataIndex: "EmployeeName",
    },
    {
      title: "Supervisor Name",
      dataIndex: "SupervisorName",
    },
    // {
    //   title: "Department",
    //   dataIndex: "Department",
    // },
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
      title: "Status",
      dataIndex: "ApprovalStatus",
      width: "150px",
      render: (_, record) => record?.ApprovalStatus === "Approved" ? <h>Approved <FcApproval /></h> : record?.ApprovalStatus === "Denied" ? <h>Denied <FcHighPriority /></h> : record?.ApprovalStatus === "Pending" ? <h>Pending <FcInfo /></h> : <QuestionOutlined />
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default Employeeleavetable;
