import React, { useState, useEffect } from "react";
import { Table, Input, Button } from "antd";
import axios from "axios";
import { DatePicker, Space } from "antd";
// import Highlighter from "react-highlight-words";
// import { SearchOutlined } from "@ant-design/icons";
// import { DatePicker, Space } from 'antd';

const AttendanceTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  // const [state, setState] = useState([]);
  console.log("atten rec", dataSource);
  // const [attendancedata, setAttendanceData] = useState([]);

  // useEffect(() => {
  //   employeetime();
  // }, []);

  // const employeetime = (emp_id) => {
  //   fetch(`http://localhost:1999/attendance/emp_id`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       let emptime = data.attendanceRecord;
  //       setAttendanceData(emptime);
  //       console.log("response", emptime);

  //     });
  // };
  // console.log(attendancedata, "hh")
  // useEffect(() => {
  //   attendancelist();
  // }, []);

  // const attendancelist = () => {
  //   fetch("http://localhost:1999/attendance")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       let emp = data.userData;
  //       setState(emp);

  //       console.log("response", emp);
  //     });
  // };
  // console.log(state, "hh");
  useEffect(() => {
    getData();
  },[] );

  useEffect(() => {
    EmployeeDateData();
  }, []);

  const EmployeeDateData = async () => {
    await axios
      .get(
        `http://localhost:1999/attendance/Daterange`,
        console.log("Filter Data is")
      )
      .then((res) => {
        setFilterDate(res?.data?.attendanceDataByEmpID);
        console.log("Logged In Employee Attendance", filterDate);
      });
  };

  const getData = async () => {
    await axios.get(`http://localhost:1999/attendance`).then((res) => {
      console.log(res, "bhvhv");
      setDataSource(res?.data?.attendanceRecord);
      console.log("attendance record", dataSource);
    });
  };
  // const onChange = (date, dateString) => {
  //   console.log(date, dateString);
  // };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Text here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => {
                confirm();
              }}
              onBlur={() => {
                confirm();
              }}
            ></Input>
            <Button
              onClick={() => {
                confirm();
              }}
              type="primary"
            >
              Search
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
              type="danger"
            >
              Reset
            </Button>
          </>
        );
      },
      onFilter: (value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      },
      width: "30%",
    },

    {
      title: "CheckIn",
      dataIndex: "CheckIn",
      // filterDropdown:({setSelectedKeys,selectedKeys,confirm,clearFilters})=>{
      //   return(
      //   <>
      //     <Space>
      //     <DatePicker
      //       // format={"DD-MM-YY"}
      //       onChange={(e) => {
      //         setSelectedKeys([e.format("YYYY-MM-DDT00:00:00Z")]);
      //       }}

      //       allowClear={false}
      //     />

      //   <Space>
      //   <Button onClick={()=>{confirm()}} type='primary'>Search</Button>
      //   <Button onClick={()=>{clearFilters()}} type='danger'>Reset</Button>
      //   </Space>
      //   </Space>
      //   <Input autoFocus
      //   value={selectedKeys[0]}
      //   onChange={(e)=>{setSelectedKeys(e.target.value?[e.target.value]:[])
      //   confirm({closeDropdown:false})}}
      //   onPressEnter={() => {confirm()}}
      //   onBlur={() => {confirm()}} >

      //   </Input>
      //   </>
      //   )
      // },
      //     onFilter:(value,record)=>{
      //       return (
      //         record[CheckIn]
      //         ? record[CheckIn]
      //             .toString()
      //             .toLowerCase()
      //             .includes(value.toLowerCase())
      //         : ""

      //       )
      //  },
      //  width: '30%',
    },
    {
      title: "CheckOut",
      dataIndex: "CheckOut",
    },
    {
      title: "Break",
      dataIndex: "Break",
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default AttendanceTable;
