import React, { useState, useEffect } from "react";
import { Select, Table } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const { Option } = Select;
// const selecthere = (value) => {

//   console.log("status type", value);
// };

const LeaveTable = () => {
  const [dataSource, setDataSource] = useState([]);
  // const[data,setData]=useState([])
  const [leavestatus, setLeaveStatus] = useState("");

  // const params = useParams();

  // console.log(params.id, "params");
  // const [id] = useState(params.id);
  // console.log(id, "iduser");

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
        // console.log("id",dataSource)
       
        return (
          <>
          
            <Select 
              defaultValue={{
                value: "Pending",
              }}
              
               onChange={() => leaveapproval(dataSource._id)}
              
            >
              <Option value="Approved">Approved</Option>
              <Option value="Denied">Denied</Option>
              <Option value="Pending">Pending</Option>
            </Select>
          </>
        );
      },
    },
  ];

 

  const leaveapproval = async (value) => {
     console.log("id", value);

     const ApprovalStatus = ""
    

    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/leave/${value}`, {
        _id: value,
        ApprovalStatus,
      })

      .then((res) => {
        setLeaveStatus(res?.data?.leave);
        //  console.log("status type", value);
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
