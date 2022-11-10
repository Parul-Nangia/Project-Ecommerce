import React from "react";
import { Table } from "antd";
import { useState, useEffect } from "react";
import { Modal, Input, Form, Select, Button } from "antd";
import { UploadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
const { Option } = Select;
const Documentation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [documentname, setDocumentName] = useState("");
  const [documenttype, setDocumentType] = useState("");
  const [documentfile, setDocumentFile] = useState("");
  const [empID, setEmpID] = useState("");
  const [dataSource, setDataSource] = useState([]); //[ { no: "", emp_id: "", documentname: "", documenttype: "",}, ]
  const columns = [
    // {
    //   title: "No.",
    //   dataIndex: "no",
    // },
    {
      title: "document name",
      dataIndex: "documentname",
    },
    {
      title: "document type",
      dataIndex: "documenttype",
    },
    // {
    // title:"image",
    // dataIndex:"image"
    // },
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
  useEffect(() => {
    showHandle();
  }, []);
  const showHandle = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/document`)
      .then((res) => {
        console.log("Reaponse getttttttt", res);

        setDataSource(res?.data?.documentData);
        // console.log("Attendance All Data", dataSource);
        // console.log(setDataSource,"setDataSource")
      });
  };

  const handleInputChange = (e) => {
    console.log("I am in file function", e.file);
    setDocumentFile(e.file);
    // console.log("File function e value", e)
    // console.log(e.file)
  };
  const handleOk = () => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);
    console.log("Employee ID", decoded._id);
    setEmpID(decoded._id);
    const emp_id = decoded._id;

    console.log("Document Name", documentname);
    console.log("Document Type", documenttype);
    console.log("Document File", documentfile);
    const formData = new FormData();
    // const image = formData
    formData.append("image", documentfile);
    formData.append("documentname", documentname);
    formData.append("documenttype", documenttype);
    formData.append("emp_id", emp_id);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/document/add/${emp_id}`,

        formData
        // {

        //   emp_id,
        //   documentname,
        //   documenttype

        // }
      )
      .then((res) => {
        console.log("Document Response", res);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const selecthere = (value) => {
    setDocumentType(value);
    console.log("document type", value);
  };

  return (
    <>
      <Button style={{ float: "right" }} type="primary" onClick={showModal}>
        Add New
      </Button>
      <Modal
        title="Add Document"
        open={isModalOpen}
        onOk={handleOk}
        okText="Upload Document"
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 14 }}
          name="basic"
          initialValues={{
            remember: true,
          }}
          style={{ margin: 20 }}
          autoComplete="off"
        >
          <Form.Item label="Document Name" rules={[{ type: "text" }]}>
            <Input
              value={documentname}
              onChange={(e) => {
                // updateDocumentName();
                setDocumentName(() => {
                  console.log("Document Name  " + e.target.value);
                  return e.target.value;
                });
              }}
            ></Input>
          </Form.Item>
          <Form.Item label="Document Type">
            <Select
              defaultValue={{
                value: "Select",
              }}
              onChange={selecthere}
            >
              <Option value="Education">Education</Option>
              <Option value="Experience">Experience</Option>
              <Option value="Certificate">Certificate</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Upload.Dragger
              name="image"
              type="file"
              onChange={handleInputChange}
              // multiple
              // type="image"
              // action={"http://localhost:3000"}
              showUploadList={{ showRemoveIcon: false }}
              beforeUpload={() => false}
              accept=".png,.doc,.jpeg,.pdf,.jpg"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload.Dragger>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={dataSource}></Table>
    </>
  );
};

export default Documentation;
