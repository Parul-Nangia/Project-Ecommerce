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
      dataIndex: "in",
    },
    {
      title: "Resume",
      dataIndex: "punch out",
    },
    {
      title: "Break",
      dataIndex: "break",
    },
    {
      title: "Production",
      dataIndex: "production",
    },
  ];

  return <Table columns={columns}></Table>;
};

export default AttendanceTable;
