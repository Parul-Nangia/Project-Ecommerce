import React, { useState, useEffect } from "react";
import { Dropdown, Input, Table } from "antd";
import axios from "axios";
import { Button, Icon, Menu, menu } from "antd";
import { LoginOutlined } from "@mui/icons-material";

const LeaveTable = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/leave`).then((res) => {
      console.log(res, "bhvhv");
      setDataSource(res?.data?.leaveData);
      console.log(dataSource, "data");
    });
  };

  // const items = [
  //   { dataIndex: "Item1", key: "1" },
  //   { dataIndex: "item2", key: "2" },
  // ];
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
      dataIndex: "ApprovalStatus",
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
      {/* <Dropdown menu={{ items }}>
        <a>Hover me</a>
      </Dropdown> */}
    </>
  );
};

export default LeaveTable;
