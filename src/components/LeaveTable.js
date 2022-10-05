import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";

// let l1={
//   flex:"1",
//   height:"300px",
//   width:"1200px",
//   margin:"20px",

// }

function LeaveTable() {
  const [dataSource, setDataSource] = useState([]);
  

 useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get("http://localhost:1999/leave").then((res) => {
      console.log(res, "bhvhv");
      let leave = res.leavetable;
      setDataSource(leave);
      console.log(dataSource,"jj")
        }
  )
}
  const columns = [
  
    {
      title: "EmployeeName",
      dataIndex: "EmployeeName",
    },

    {
      title: "LeaveType",
      dataIndex: "LeaveType",
    },
    {
      title: "Hours",
      dataIndex: "Hours",
    },
    {
      title: "Days",
      dataIndex: "Days",
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={dataSource}></Table>
    </>
  );
}

export default LeaveTable;