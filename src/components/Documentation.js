import React from "react";
import { Table } from "antd";
import { useState } from "react";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Modal } from "antd";
// import Sidebar from "./Sidebar";
// import Top from "./Top";

const Documentation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      no: "1",
      documentname: "xyz",
      type: "abcd",
    },
    {
      no: "2",
      documentname: "xyz",
      type: "abcd",
    },
  ]);
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
    },
    {
      title: "Document Name",
      dataIndex: "documentname",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Button>
              <CloudDownloadOutlined />
            </Button>
          </>
        );
      },
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* <Top />
      <Sidebar /> */}
      {/* <Button style={{ float: "right" }} onClick={handleShow}>Add New</Button> */}
      <Button style={{ float: "right" }} type="primary" onClick={showModal}>
        Add New
      </Button>
      <Modal
        title="Add new"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <Table columns={columns} dataSource={dataSource}></Table>
      {/* <Sidebar /> */}
    </>
  );
};

export default Documentation;
