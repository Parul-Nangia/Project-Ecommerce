import {
  MinusCircleTwoTone,
  PlusCircleTwoTone,
  SearchOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, DatePicker, Form, Modal } from "antd";
import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import moment from "moment";
import { FcCalendar } from "react-icons/fc";
import { Calendar, Badge } from "antd";
import jwt_decode from "jwt-decode";

const AttendanceTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [attendancesingle, setAttendanceSingle] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isopenmodal, setIsOpenModal] = useState(false);
  const [EmployeeCalendar, setEmployeeCalendar] = useState([]);
  const [singleAttendance, setSingleAttendance] = useState([]);
  const [state, setState] = useState([]);
  console.log("state", state);

  const getCalendarSingleRowData = async (record) => {
    console.log("record", record._id);
    setState(record.name.toUpperCase() + "'s" + " " + "ATTENDANCE RECORD");
    console.log("record", record);

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/attendance/single/${record._id}`)
      .then((res) => {
        setEmployeeCalendar(res?.data?.SingleAttendance);
      });

    setIsOpenModal(true);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const dateCellRender = (value) => {
    // console.log("value", value)
    const stringValue = value.format("YYYY-MM-DD");
    var newArray = EmployeeCalendar?.filter(function (el) {
      return el.TodayDate === stringValue;
    });
    // console.warn("dataSource", dataSource)

    return (
      <>
        {/* <ul className="events"> */}
        {newArray.map((item) => (
          <li key={item._id}>
            <Badge className="calendarcell" />
          </li>
        ))}
        {/* </ul> */}
      </>
    );
  };

  useEffect(() => {
    const getAllData = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/attendance`)
        .then((res) => {
          setDataSource(res?.data?.attendanceData);
          for (let f = 0; f < res?.data?.attendanceData.length; f++) {
            if (res?.data?.attendanceData[f].Breaks.length === 0) {
              console.warn("any of the breaks are null");
            } else if (res?.data?.attendanceData[f].Breaks.length !== "") {
              for (
                let i = 0;
                i < res?.data?.attendanceData[f].Breaks.length;
                i++
              ) {
                if (res?.data?.attendanceData[f].Breaks[i]?.start === "") {
                  console.warn("click break first");
                } else if (res?.data?.attendanceData[f].Breaks[i]?.end === "") {
                  console.warn("resume first");
                } else {
                  const start = moment(
                    res?.data?.attendanceData[f].Breaks[i]?.start,
                    "HH:mm:ss a"
                  );
                  // console.log("starttime", start);
                  const end = moment(
                    res?.data?.attendanceData[f].Breaks[i]?.end,
                    "HH:mm:ss a"
                  );
                  // console.log("endtime", end);
                  const milliSeconds = moment.duration(end.diff(start));
                  const seconds = Math.floor((milliSeconds / 1000) % 60);
                  const minutes = Math.floor((milliSeconds / 1000 / 60) % 60);
                  const hours = Math.floor(
                    (milliSeconds / 1000 / 60 / 60) % 24
                  );
                  // console.log("mill", milliSeconds);

                  const formattedTime = [
                    hours.toString().padStart(2, "0"),
                    minutes.toString().padStart(2, "0"),
                    seconds.toString().padStart(2, "0"),
                  ].join(":");

                  res.data.attendanceData[f].Breaks[i].timeconsume =
                    formattedTime;
                }
              }
            }
            res.data.attendanceData[f].key = Math.floor(
              Math.random() * 978587456
            );
          }
        });
    };
    getAllData();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
    console.log(selectedKeys[0], "pp");
    console.log(dataIndex, "bv");

    const payload = selectedKeys[0];

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/attendance`, { name: payload })
      .then((res) => {
        console.log(res, "kj");
      });
  };

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

    moment(selectedKeys[0]);
    setSearchColumnDate(dataIndex);
    console.log("selectedKeys res", selectedKeys[0]);
    console.log("dataIndex res", dataIndex);

    const TodayDate = { Start: selectedKeys[0][0], End: selectedKeys[0][1] };
    console.log("data/payload = ", TodayDate);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/attendance`, { TodayDate })
      .then((res) => {
        console.log("daterange res", res);
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
      title: "Check-in",
      dataIndex: "CheckIn",
      key: "CheckIn",
      width: "150px",
    },
    {
      title: "Check-out",
      dataIndex: "CheckOut",
      key: "CheckOut",
      width: "150px",
    },
    {
      title: "Date",
      dataIndex: "TodayDate",
      key: "TodayDate",
      width: "150px",
      ...columnSearch("TodayDate"),
    },
    {
      title: "View",
      width: "100px",
      render: (record) => {
        return (
          <>
            <Button style={{ color: "black", borderColor: "white" }}>
              <FcCalendar
                className="calendarviewattendancebtn"
                onClick={() => {
                  getCalendarSingleRowData(record);
                }}
              ></FcCalendar>
            </Button>
          </>
        );
      },
    },
  ];

  const nestedColumns = [
    {
      title: "No.",
      key: "index",
      render: (text, record, index) => index + 1,
      width: "20px",
    },
    {
      title: "Start",
      dataIndex: "start",
      key: "start",
      width: "30px",
    },
    {
      title: "End",
      dataIndex: "end",
      key: "end",
      width: "30px",
    },
    {
      title: "Time Consumed",
      dataIndex: "timeconsume",
      key: "timeconsume",
      width: "30px",
    },
  ];
  return (
    <>
      <Table
        rowKey="key"
        columns={columns}
        dataSource={dataSource}
        expandable={{
          rowExpandable: (record) => true,
          expandedRowRender: (record) => {
            return (
              <Table
                columns={nestedColumns}
                dataSource={record?.Breaks}
                pagination={false}
              />
            );
          },
        }}
      />
      <Modal
        title={state}
        cancelButtonProps={{ style: { display: "none" } }}
        onCancel={handleCancel}
        open={isopenmodal}
        width={1000}
      >
        {/* <h>{EmployeeCalendar?.name}</h> */}
        <br />
        <Calendar dateCellRender={dateCellRender} />
      </Modal>
    </>
  );
};

export default AttendanceTable;
