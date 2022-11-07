// export default AttendanceTable;
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, DatePicker, Form } from "antd";
import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
const AttendanceTable = () => {
  const [state, setState] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [queryData, setQueryData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [name, setName] = useState("");
  const [attendanceAllData, setAttendanceAllData] = useState([]);
  const [attendanceByDateRange, setAttendanceByDateRange] = useState([]);
  const [attendanceDataByName, setAttendanceDataByName] = useState([]);

  console.log("Start date", startDate);

  const [endDate, setEndDate] = useState("");
  console.log("End date", endDate);

  useEffect(() => {
    getFilteredDataByName();
  }, []);
  const getFilteredDataByName = async () => {
    const empName = { name: name };
    console.log("name filter", empName);

    await axios
      .post(`http://localhost:1999/attendance`, empName)
      .then((res) => {
        setAttendanceDataByName(res);
        console.log("Filter By name", res);
      });
  };

  useEffect(() => {
    getDataByDateRange();
  }, []);
  const getDataByDateRange = async () => {
    const data = { startDate: startDate, endDate: endDate };
    console.log("start/end Date", data);

    await axios.post(`http://localhost:1999/attendance`, data).then((res) => {
      setAttendanceByDateRange(res);
      console.log("Filter By daterange", res);
    });
  };

  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = async () => {
    await axios.post(`http://localhost:1999/attendance`).then((res) => {
      setAttendanceAllData(res?.data?.attendanceRecord);
      console.log("Attendance All Data", attendanceAllData);
    });
  };

  const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "name",
      width: "150px",
      // ...getColumnSearchProps('name'),
    },
    {
      title: "CheckIn",
      dataIndex: "CheckIn",
      key: "CheckIn",
      width: "150px",
    },
    {
      title: "CheckOut",
      dataIndex: "CheckOut",
      key: "CheckOut",
      width: "150px",
    },

    {
      title: "Date",
      dataIndex: "TodayDate",
      key: "TodayDate",
      width: "150px",
    },
  ];

  return (
    <>
      <Form>
        <Form.Item>
          <DatePicker
            onChange={(e) => {
              setStartDate(e.format("YYYY-MM-DD"));
            }}
            allowClear={true}
          />

          <DatePicker
            onChange={(e) => {
              setEndDate(e.format("YYYY-MM-DD"));
            }}
            allowClear={true}
          />

          <Button onClick={getDataByDateRange} type="primary">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Form>
        <Form.Item>
          <Input
            placeholder="Enter Name"
            style={{ width: "20%" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button onClick={getFilteredDataByName} type="primary">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={attendanceAllData} />
    </>
  );
};

export default AttendanceTable;

// const [filterDate, setFilterDate] = useState("");

// const [state, setState] = useState([]);

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

// useEffect(() => {
//   EmployeeDateData();
// }, []);

// const EmployeeDateData = async () => {
//   await axios
//     .get(`http://localhost:1999/attendance/daterange`)
//     .then((res) => {
//       setQuery(res?.data?.data);
//       console.log("Date range data", res);
//     });
//   console.log("filter data", query);
// };

// useEffect(() => {
//   EmployeeDateData();
// }, []);

// const EmployeeDateData = async () => {

//   await axios
//     .get(
//       `http://localhost:1999/attendance/daterange`,

//     )
//     .then((res) => {
//       setQuery(res?.data?.data);
//       console.log("Date range data", res);

//     });
//     console.log("filter data", query);

// }
