import React, { useState, useEffect } from "react";
import { Select, Table } from "antd";
import axios from "axios";
import { FcHighPriority, FcApproval, FcCancel, FcInfo } from "react-icons/fc";
import { EllipsisOutlined } from "@ant-design/icons";
const { Option } = Select;

const LeaveTable = () => {
  const [dataSource, setDataSource] = useState([]);

  const [leavestatus, setLeaveStatus] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/leave`).then((res) => {
      console.log(res, "bhvhv");

      setDataSource(res?.data?.leaveData);
      console.log(dataSource, "dataSource");
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "EmployeeName",
    },
    {
      title: "Supervisor Name",
      dataIndex: "SupervisorName",
      width: "160px",
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
      title: "Status",
      dataIndex: "inddata",
      width: "100px",

      render: (_, dataSource) => {
        console.log("data", dataSource);

        return (
          <>
            <Select
              suffixIcon={<EllipsisOutlined />}
              defaultValue={{
                value: <h>Pending {<FcInfo />}</h>,
              }}
              onChange={(value) => leaveapproval(dataSource._id, value)}
            >
              <Option prfixicon="" value="Approved">
                <h>Approved {<FcApproval />}</h>
              </Option>
              <Option suffixIcon="" value="Denied">
                <h>Denied {<FcHighPriority />}</h>
              </Option>
            </Select>
          </>
        );
      },
    },
  ];

  const leaveapproval = async (value, optValue) => {
    console.log("id", value);
    console.log("optionvalue", optValue);

    const ApprovalStatus = optValue;

    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/leave/${value}`, {
        _id: value,
        ApprovalStatus,
      })

      .then((res) => {
        // setLeaveStatus(res?.data?.updated_leave);
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
