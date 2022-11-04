import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, DatePicker, Form } from "antd";
import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
const AttendanceTable = () => {
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
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  // useEffect(() => {
  //   getData();
  // }, []);
  // const getData = async () => {
  //   await axios.get("http://localhost:1999/attendance").then((res) => {
  //     console.log(res, "kj");
  //     setDataSource(res?.data?.attendanceRecord);
  //     console.log(dataSource, "data");
  //   });
  // };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    console.log(selectedKeys[0],"pp")
    console.log(dataIndex,"bv")
    const payload={selectedKeys}
    // console.log(payload,"lll")
    // const payload =selectedKeys[0]
    // const a={}
    // a.append(payload)
    // console.log(a)
    // const payload="sudhir"
    // axios.get("http://localhost:1999/attendance/employeeName",{name:payload}).then((res) => {
    //   console.log(res, "kj");
    //   setDataSource(res?.data?.attendanceDataByEmpID.selectedKeys[0]);
    //   console.log(dataSource, "data");
    // });

  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters,  }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
      onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : false,
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "150px",
      ...getColumnSearchProps('name'),
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
    // {
    //   title: "Breaks",
    //   dataIndex: "Breaks",
    //   width: '150px',
    // },
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

      <Table columns={columns} attendanceAllData={attendanceAllData} />
    </>
  );
};

export default AttendanceTable;



