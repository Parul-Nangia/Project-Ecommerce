import React from "react";
import { Table } from "antd";

const AttendanceTable = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "#",
    },
    {
      title: "Employee Name",
      dataIndex: "employee name",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Check In",
      dataIndex: "punch in",
    },
    {
      title: "Check Out",
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
