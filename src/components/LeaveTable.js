import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import Error from '../components/Error';



const LeaveTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const[name,setName]=useState("");
  
 useEffect(() => {
    getData();
  }, []);



  useEffect(() => {
    userData();

  }, [])


  const userData = ()=> {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token)
    // let token = token;
    var decoded = jwt_decode(token);
    console.log("Decoded token data",decoded);
    setName(decoded)
  }

  if (name.role === "admin"){
    console.log("my role is " ,name.role)
    return (

    <LeaveTable />
  )
  }
  if(name.role==="employee"){
    return(
      <Error />
    )
  
  }
  else{
   
    
  }

  
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