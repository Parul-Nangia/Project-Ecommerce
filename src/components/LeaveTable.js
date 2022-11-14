import React, { useState, useEffect } from "react";
// import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from "antd";

// import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Table, Button } from "antd";
import axios from "axios";
// import { Button, Icon, Menu, menu } from "antd";
// import { LoginOutlined } from "@mui/icons-material";
const handleButtonClick = (e) => {
  // console.log("click left button", e);
};

const handleMenuClick = (e) => {
  console.log("click", e);
};

const items = [
  {
    label: "Pending",
    key: "1",
  },
  {
    label: "Approved",
    key: "2",
  },
  {
    label: "Denied",
    key: "3",
  },
];
const menuProps = {
  items,
  onClick: handleMenuClick,
};

const LeaveTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [leavestatus, setLeaveStatus] = useState(null);

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
      render: () => {
        return (
          <>
            <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
              Status
            </Dropdown.Button>
          </>
        );
      },
    },
  ];

  const leaveapproval = async () => {
    const ID = leavestatus.attendance[0]._id;
    const EmployeeName = leavestatus.EmployeeName;
    const SupervisorName = leavestatus.SupervisorName;
    const Department = leavestatus.Department;
    const LeaveType = leavestatus.LeaveType;
    const ApprovalStatus = leavestatus.ApprovalStatus;
    const LeaveDate = leavestatus.LeaveDate;
    const ReturnDate = leavestatus.ReturnDate;
    const TotalHoursRequested = leavestatus.TotalHoursRequested;
    const TotalDaysRequested = leavestatus.TotalDaysRequested;

    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/leave/${ID}`, {
        ID,
        EmployeeName,
        SupervisorName,
        Department,
        LeaveType,
        ApprovalStatus,
        LeaveDate,
        ReturnDate,
        TotalHoursRequested,
        TotalDaysRequested,
      })

      .then((res) => {
        setLeaveStatus(res?.data?.leaveData);
        console.log("status", res);
      });
  };

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default LeaveTable;
