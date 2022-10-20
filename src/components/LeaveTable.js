import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";





const LeaveTable = () => {
  const [dataSource, setDataSource] = useState([]);
 
  
 useEffect(() => {
    getData();
  }, []);



 
  
  const getData = async () => {
    await axios.get("http://localhost:1999/leave").then((res) => {
      console.log(res, "bhvhv");
     setDataSource(res?.data?.leaveData);
      console.log(dataSource,"jj")
        }
  )
      }
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
      <Table columns={columns} 
       dataSource={dataSource}/>
    </>
  );
        }

export default LeaveTable;