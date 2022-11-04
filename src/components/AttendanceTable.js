
// export default AttendanceTable;
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, DatePicker, Form } from 'antd';
import React, {  useState,useEffect} from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios';
const AttendanceTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [queryData, setQueryData] = useState([]);
  const [startDate, setStartDate] = useState("");

  console.log("Start date", startDate);

  const [endDate, setEndDate] = useState("");
  console.log("End date", endDate);

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



  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {


    // await axios.get(`http://localhost:1999/attendance`)
    //   .then((res) => {
    //     setQueryData(res?.data);
    //     console.log("attendance record", res);

    //   });

    const data = { startDate: startDate, endDate: endDate };

    axios.get('http://localhost:1999/attendance', data).then(response => {
      console.log(response.data);
      setDataSource({
        dataSource: response.data

      });
      console.log("startDate endDate response", dataSource);

    });



    await axios
      .get(`http://localhost:1999/attendance`, {
        startDate,
        endDate,
      })
      .then((res) => {
        setQueryData(res?.data?.attendanceRecord);
        console.log("attendance record", res);
      });

  };
  // console.log("atten record", dataSource);
  // const onChange = (date, dateString) => {
  //   console.log(date, dateString);
  // };
  // const Reset = (clearFilters) => {
  //   clearFilters();
  //   setSearchDate('');
  // }
//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, }) => (
//       <div style={{ padding: 8, }}>
//         <Input
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ marginBottom: 8, display: 'block', }} />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small" style={{  width: 90,  }}  >
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
//           type="link" 
//           size="small" 
//           onClick={() => {confirm({closeDropdown: false,});setSearchText(selectedKeys[0]);setSearchedColumn(dataIndex);
//             }}>
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
//     onFilter: (value, record) =>
//     record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     render: (text) =>
//     searchedColumn === dataIndex ? (
//       <Highlighter
//         highlightStyle={{
//           backgroundColor: '#ffc069',
//           padding: 0,
//         }}
//         searchWords={[searchText]}
//         autoEscape
//         textToHighlight={text ? text.toString() : ''}
//       />
//     ) : (
//       text
//     ),
// });

   const columns = [
    {
      title: "Employee Name",
      dataIndex: "name",
      key:'name',
      width:'30%',
      // ...getColumnSearchProps('name'),
    },
    {
      title: "CheckIn",
      dataIndex: "CheckIn",

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
      width: "30%",
    },
    {
      title: "CheckOut",
      dataIndex: "CheckOut",
    },
    {
      title: "Break",
      dataIndex: "Break",
    },
    {
      title: "Date",
      dataIndex: "TodayDate",
    },
  ];
  
  return (
    <>
      <Form >
        <Form.Item>

          <DatePicker
            dateFormat="yyyy/MM/dd"
            value={startDate}
            onChange={(date) => {
              const d = new Date(date).toLocaleDateString();
              console.log("startDate ", d);
              setStartDate(d);
            }}
            allowClear={true}
          />

          <DatePicker onChange={(e) => { setEndDate(e.format("YYYY-MM-DD")); }}
            allowClear={true}
          />

          <Button onClick={onsubmit} type="primary">Search</Button>

        </Form.Item>
      </Form>
      <Table columns={columns} queryData={queryData} />
    </>
  )
}

export default AttendanceTable



