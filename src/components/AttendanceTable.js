import React from "react";
import { Table } from "antd";
import { useState } from "react";

const AttendanceTable = () => {
  const [data, setData] = useState([{
  name:"abcd",
  Date:"",
  CheckIn:"",
  CheckOut:"",
  Resume:"",
  Break:""
  
  },
  {
    name:"xyz",
    Date:"",
    CheckIn:"",
    CheckOut:"",
    Resume:"",
    Break:""
    
    },
    {
      name:"xy",
      Date:"",
      CheckIn:"",
      CheckOut:"",
      Resume:"",
      Break:""
      
      }]);

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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: 'abcd',
          value: 'abcd',
        },
        {
          text: 'xyz',
          value: 'xyz',
        },
        {
          text: 'xy',
          value: 'xy',
        },
      ],
    //   filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '30%',

    },
    {
      title: "Date",
      dataIndex: "Date",
    },
    {
      title: "CheckIn Time",
      dataIndex: "CheckIn ",
    },
    {
      title: "CheckOut Time",
      dataIndex: "CheckOut ",
    },
    {
      title: "Resume",
      dataIndex: "Resume",
    },
    {
      title: "Break",
      dataIndex: "Break",
    },
  ];

  return (
    <>
      <Table 
      columns={columns}
      dataSource={data} />
    </>
  );
};

export default AttendanceTable;
