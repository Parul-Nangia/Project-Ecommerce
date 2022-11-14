import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, DatePicker, Form } from "antd";
import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import moment from "moment";
// import * as moment from 'moment'
const AttendanceTable = () => {
  const [dataSource, setDataSource] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  useEffect(() => {
    getAllData();
  }, []);
  const getAllData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/attendance`)
      .then((res) => {
        setDataSource(res?.data?.attendanceData);
        console.log("Attendance All Data", res);
      });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    console.log(selectedKeys[0], "pp");
    console.log(dataIndex, "bv");
    // const payload={selectedKeys}
    // console.log(payload,"lll")
    const payload = selectedKeys[0];
    // const a={}
    // a.append(payload)
    // console.log(a)
    // const payload="sudhir"
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/attendance`, { name: payload })
      .then((res) => {
        console.log(res, "kj");
        // setDataSource(res?.data?.attendanceDataByName);
        // setDataSource(res?.data?.attendanceDataByEmpID.selectedKeys[0]);
        // console.log(dataSource, "data");
      });
  };
  // const handleReset = (clearFilters) => {
  //   clearFilters();
  //   setSearchText('');
  // };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
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
            onClick={() => {
              clearFilters();
            }}
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
          color: filtered ? "#1890ff" : undefined,
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
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const [searchDate, setSearchDate] = useState("");
  const [searchColumnDate, setSearchColumnDate] = useState("");
  const Search = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchDate(selectedKeys[0]);

    moment(selectedKeys[0]);
    setSearchColumnDate(dataIndex);
    console.log("selectedKeys res", selectedKeys[0]);
    console.log("dataIndex res", dataIndex);
    // const payload = selectedKeys[0]
    const TodayDate = { Start: selectedKeys[0][0], End: selectedKeys[0][1] };
    console.log("data/payload = ", TodayDate);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/attendance`, { TodayDate })
      .then((res) => {
        console.log("daterange res", res);
        // setDataSource

        console.log(dataSource, "data");
      });
  };
  const Reset = (clearFilters) => {
    clearFilters();
    setSearchDate("");
  };
  const columnSearch = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Space>
          <DatePicker.RangePicker
            onChange={(e) => {
              setSelectedKeys(e.length ? [e] : []);
            }}
            placeholder={["Start", "End"]}
            value={selectedKeys[0]}
            format="YYYY-MM-DD"
          />
        </Space>
        <Space>
          <Button
            type="primary"
            onClick={() => Search(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && Reset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    // onFilter: (value, record) => {
    //   return (
    //     moment(record[dataIndex]).format("DD-MM-YYYY") ===
    //     value.format("DD-MM-YYYY")
    //   );
    // },
    onFilter: (value, record) =>
      record[dataIndex]
        ? moment(record[dataIndex]).isBetween(
            moment(value[0]),
            moment(value[1])
          )
        : "",
    render: (text) =>
      searchColumnDate === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchDate]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
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
      ...getColumnSearchProps("name"),
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
      ...columnSearch("TodayDate"),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataSource} />
    </>
  );
};

export default AttendanceTable;

// import { SearchOutlined } from '@ant-design/icons';
// import { Button, Input, Space, Table, DatePicker, Form } from 'antd';
// import React, { useState, useEffect } from 'react';
// import Highlighter from 'react-highlight-words';
// import axios from 'axios';
// import moment from 'moment'
// // import * as moment from 'moment'
// const AttendanceTable = () => {
// const [dataSource, setDataSource] = useState([]);
// const [queryData, setQueryData] = useState([]);
// const [startDate, setStartDate] = useState("");
// const[endDate,setEndDate] =useState("");
// const [attendanceByDateRange, setAttendanceByDateRange] = useState([]);
// const [attendanceDataByName, setAttendanceDataByName] = useState([]);

// //   console.log("Start date", startDate);

// //   const [endDate, setEndDate] = useState("");
// //   console.log("End date", endDate);

//   // useEffect(() => {
//   //   getFilteredDataByName();
//   // }, []);
//   // const getFilteredDataByName = async () => {

//   //   const empName = { name: name };
//   //   console.log("name filter dddddd", empName)

//   //   await axios.post(`http://localhost:1999/attendance`, empName)
//   //     .then((res) => {
//   //       setAttendanceDataByName(res);
//   //       console.log("Filter By name", res);
//   //     });
//   // };

//   // const getDataByDateRange = async () => {

//   //   await axios.post(`http://localhost:1999/attendance`, data)
//   //     .then((res) => {
//   //       setAttendanceByDateRange(res);
//   //       console.log("Filter By daterange", res);
//   //     });
//   // };
//   useEffect(() => {
//     getDataByDateRange();
//   }, []);
//   const getDataByDateRange = async () => {
//     const data = { startDate: startDate, endDate: endDate };
//     console.log("start/end Date", data);

//     await axios.post(`http://localhost:1999/attendance`, data).then((res) => {
//       setAttendanceByDateRange(res);
//       console.log("Filter By daterange", res);
//     });
//   };

//   useEffect(() => {
//     getAllData();
//   }, []);
//   const getAllData = async () => {
//     await axios.post(`http://localhost:1999/attendance`).then((res) => {
//       setDataSource(res?.data?.attendanceRecord);
//       console.log("Attendance All Data", dataSource);
//     });
//   };
//   const [searchText, setSearchText] = useState('');
//   const [searchedColumn, setSearchedColumn] = useState('');
//   // useEffect(() => {
//   //   getData();
//   // }, []);
//   // const getData = async () => {
//   //   await axios.get("http://localhost:1999/attendance").then((res) => {
//   //     console.log(res, "kj");
//   //     setDataSource(res?.data?.attendanceRecord);
//   //     console.log(dataSource, "data");
//   //   });
//   // };
//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//     console.log(selectedKeys[0],"pp")
//     console.log(dataIndex,"bv")
//     // const payload={selectedKeys}
//     // console.log(payload,"lll")
//     const payload =selectedKeys[0]
//     // const a={}
//     // a.append(payload)
//     // console.log(a)
//     // const payload="sudhir"
//     axios.post("http://localhost:1999/attendance",{name:payload}).then((res) => {
//       console.log(res, "kj");
//       // setDataSource(res?.data?.attendanceDataByEmpID.selectedKeys[0]);
//       // console.log(dataSource, "data");
//     });

//   };
//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText('');
//   };
//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters,  }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//       >
//         <Input
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: 'block',
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({
//                 closeDropdown: false,
//               });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? '#1890ff' : undefined,
//         }}
//       />
//     ),
//       onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex]
//             .toString()
//             .toLowerCase()
//             .includes(value.toLowerCase())
//         : false,
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: '#ffc069',
//             padding: 0,
//           }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });
//   const [searchDate,setSearchDate]=useState("");
//   const [searchColumnDate,setSearchColumnDate]=useState("")
//   const Search = (selectedKeys, confirm, dataIndex)=>{
//     confirm();
//     // setSearchDate(selectedKeys[0]);
//     // moment(selectedKeys[0])
//     setSearchColumnDate(dataIndex);
//     console.log(selectedKeys[0],"pp")
//     console.log(dataIndex,"bv")
//     const payload =selectedKeys[0]
//     axios.post("http://localhost:1999/attendance",{date:payload}).then((res) => {
//       console.log(res, "kj");
//       // setDataSource(res?.data?.attendanceDataByEmpID.selectedKeys[0]);
//       console.log(dataSource, "data");
//     });
//   }
//   const Reset = (clearFilters)=>{
//     clearFilters();
//     setSearchDate('');
//   }
//   const columnSearch = (dataIndex) => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters,  }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//       >
//          <Space>
//       {/* <DatePicker
//         format={"DD-MM-YYYY"}
//         onChange={(e) => {
//           setSelectedKeys([e]);
//         }}
//         allowClear={true}
//       /> */}
//        <DatePicker.RangePicker
//           onChange={e => {
//             setSelectedKeys(e.length ? [e] : [])
//           }}
//           placeholder={["Start", "End"]}
//           value={selectedKeys[0]}
//           format="YYYY-MM-DD "
//         />
//     </Space>
//         <Space>
//           <Button
//             type="primary"
//             onClick={() =>Search(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && Reset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>

//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? '#1890ff' : undefined,
//         }}
//       />
//     ),
//     // onFilter: (value, record) => {
//     //   return (
//     //     moment(record[dataIndex]).format("DD-MM-YYYY") ===
//     //     value.format("DD-MM-YYYY")
//     //   );
//     // },
//     onFilter: (value, record) => record[dataIndex] ? moment(record[dataIndex]).isBetween(moment(value[0]), moment(value[1])) : "",
//     render: (text) =>
//     searchColumnDate === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: '#ffc069',
//             padding: 0,
//           }}
//           searchWords={[searchDate]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: "150px",
//       ...getColumnSearchProps('name'),
//     },
//     {
//       title: "CheckIn",
//       dataIndex: "CheckIn",
//       key: "CheckIn",
//       width: "150px",
//     },
//     {
//       title: "CheckOut",
//       dataIndex: "CheckOut",
//       key: "CheckOut",
//       width: "150px",
//     },
//     // {
//     //   title: "Breaks",
//     //   dataIndex: "Breaks",
//     //   width: '150px',
//     // },
//     {
//       title: "Date",
//       dataIndex: "TodayDate",
//       key: "TodayDate",
//       width: "150px",
//       ...columnSearch("TodayDate")
//     },
//   ];

//   return (
//     <>
//        <Form>
//         <Form.Item>
//           <DatePicker
//             onChange={(e) => {
//               setStartDate(e.format("YYYY-MM-DD"));
//             }}
//             allowClear={true}
//           />

//           <DatePicker
//             onChange={(e) => {
//               setEndDate(e.format("YYYY-MM-DD"));
//             }}
//             allowClear={true}
//           />

//           <Button onClick={getDataByDateRange} type="primary">
//             Search
//           </Button>
//         </Form.Item>
//       </Form>

//       <Table columns={columns} dataSource={dataSource} />
//     </>
//   );
// };

// export default AttendanceTable;
