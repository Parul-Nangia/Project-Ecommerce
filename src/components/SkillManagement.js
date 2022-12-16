import React, { useState } from "react";
import { Button, Input, Space, Table, DatePicker, Form, Modal } from "antd";

const SkillManagement = () => {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "150px",
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
      <div style={{ display: "flex" }}>
        <h1>DATE :</h1>

        <div style={{ marginLeft: "5px" }}>
          {new Date().toLocaleDateString()}
        </div>

        <h1 style={{ marginLeft: "15px" }}>TIME :</h1>
        <div style={{ marginLeft: "5px" }}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
      <br />
      <div>
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
      </div>
    </>
  );
};

export default SkillManagement;
