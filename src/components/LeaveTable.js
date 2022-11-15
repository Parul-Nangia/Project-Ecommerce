import React, { useState, useEffect } from "react";
import { Select, Table } from "antd";
import axios from "axios";


const { Option } = Select;
// const selecthere = (value) => {

//   console.log("status type", value);
// };

const LeaveTable = () => {
  const [dataSource, setDataSource] = useState([]);
  // const[data,setData]=useState([])
  const [leavestatus, setLeaveStatus] = useState("");

  

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
      dataIndex: "inddata",
      render: (_, dataSource) => {
        
       
        return (
          <>
          
            <Select 
              defaultValue={{
                value: "Pending",
              }}
              
               onChange={(value) => leaveapproval(dataSource._id,value)}
              
            >
              <Option value="Approved">Approved</Option>
              <Option value="Denied">Denied</Option>
             

            </Select>
          </>
        );
      },
    },
  ];

 

  const leaveapproval = async (value,optValue) => {
     console.log("id", value);
     console.log("optionvalue", optValue)

     const ApprovalStatus = optValue
    

    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/leave/${value}`, {
        _id: value,
        ApprovalStatus,
      })

      .then((res) => {
        setLeaveStatus(res?.data?.leave);
        console.log("status", res);
      });
  };


  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(dataSource) => {
          const id = dataSource?.["_id"];
          return id;
        }}
      />
    </>
  );
};

export default LeaveTable;
