import React from "react";
import { Table } from "antd";

const AttendanceTable = () => {
  const columns = [
    {
      title: "Employee Id",
      dataIndex: "emp_id",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "CheckIn Date",
      dataIndex: "CheckIn date",
    },
    {
      title: "CheckOut Date",
      dataIndex: "CheckOut date",
    },
    {
      title: "Resume",
      dataIndex: "Resume",
    },
    {
      title: "Break",
      dataIndex:"Break",
    },
    {
      title: "Resume",
      dataIndex: "Resume",
    },
  ];

  return <Table columns={columns}></Table>;
};

export default AttendanceTable;
