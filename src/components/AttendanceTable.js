import {
  MinusCircleTwoTone,
  PlusCircleTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table, DatePicker, Form } from "antd";
import React, { useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import axios from "axios";
import moment from "moment";
import jwt_decode from "jwt-decode";
import ReactDOM from "react-dom";


const AttendanceTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [mydataSource, setmyDataSource] = useState([]);

  const [attend, setAttendan] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [show, setShow] = useState(false);



  // const onExpand = (_, { key }) =>
  //   expandedKey === key ? setExpandedKey(null) : setExpandedKey(key)


  useEffect(() => {
    getAllData();
  }, []);
  
  const getAllData = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/attendance`)
      .then((res) => {
        setDataSource(res?.data?.attendanceData);
        for (let s = 0; s < res?.data?.attendanceData.length; s++) {
          if (res?.data?.attendanceData[s]?.length === 0) {
            console.log("NO DATA")
          } else if (res?.data?.attendanceData[s]?.Breaks?.length === 0) {
            console.log("NO DATA AGAIN")
          } else if (res?.data?.attendanceData[s]?.Breaks?.length !== 0) {
            setmyDataSource(res?.data?.attendanceData[s]?.Breaks)
          }
        }
      });
  };


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
      title: "CheckIn",
      dataIndex: "CheckIn",
      key: "CheckIn",
      width: "150px",
    },
    {
      title: "CheckOut",
      dataIndex: "CheckIn",
      key: "CheckIn",
      width: "150px",
    },
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
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender: record => (
            <p style={{ margin: 0 }}>{record._id}</p>
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <MinusCircleTwoTone onClick={e => onExpand(record, e)} />
            ) : (
              <PlusCircleTwoTone onClick={e => onExpand(record, e)} />
            )
        }}
      />,
    </>
  );
};

export default AttendanceTable;