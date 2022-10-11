import React from "react";
import { Table } from "antd";
import { useState } from "react";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Modal, Input, Form, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import Top from "../components/Top";
import Sidebar from "../components/Sidebar";
import Middle from "../components/Middle";
import { Layout } from "antd";
const { Content } = Layout;

const { Option } = Select;
// import Sidebar from "./Sidebar";
// import Top from "./Top";
// const props = {
//   name: "file",
//   action: "http://localhost:3000/",
//   headers: {
//     authorization: "authorization-text",
//   },

//   onChange(info) {
//     if (info.file.status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }

//     if (info.file.status === "done") {
//       message.success(`${info.file.name} file uploaded successfully`);
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
// };

const Documentation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataSource, setDataSource] = useState([
    {
      no: "",
      documentname: "",
      type: "",
    },
  ]);
  const [documentname, setDocumentName] = useState([]);
  const [documenttype, setDocumentType] = useState();
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
    console.log("fkjdghfdkj");
    console.log(documentname, "Documentname");
    console.log(documenttype, "Documenttype");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const selecthere = (value) => {
    setDocumentType(value);
    console.log(value);
  };
  return (
    <>
      {/* <Top />
      <Sidebar /> */}
      {/* <Button style={{ float: "right" }} onClick={handleShow}>Add New</Button> */}
      <Layout>
        <Top />
        <Layout>
          <Sidebar />

          <Layout style={{ padding: "0 24px 24px" }}>
            <Middle />
            <Content
              className="site-layout-background"
              style={{ padding: 24, margin: 0, minHeight: 280 }}
            >
              <Button
                style={{ float: "right" }}
                type="primary"
                onClick={showModal}
              >
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
                  name="basic"
                  initialValues={{
                    remember: true,
                  }}
                  style={{ margin: 20 }}
                  autoComplete="off"
                >
                  <Form.Item label="Document Name">
                    <Input
                      value={documentname}
                      onChange={(e) => {
                        setDocumentName(() => {
                          console.log("Document Name  " + e.target.value);
                          return e.target.value;
                        });
                      }}
                    ></Input>
                  </Form.Item>
                  <Form.Item label="Document Type">
                    <Select
                      // labelInValue
                      defaultValue={{
                        value: "Select",
                        // label: 'Select Class Name',
                      }}
                      onChange={selecthere}
                      // style={{ width: 180 }}
                    >
                      <Option value="Education">Education</Option>
                      <Option value="Experience">Experience</Option>
                      <Option value="Certificate">Certificate</Option>
                    </Select>
                  </Form.Item>
                  <Upload
                    action={"http://localhost:3000"}
                    accept=".png,.jpeg,.doc,.pdf"
                  >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                  {/* <Upload
            {...props}
            // accept=".png,.doc,.jpeg,.pdf"
            onChange={(response) => {
              if (response.file.status !== "uploading") {
                console.log(response.file, response.fileList);
              }
              if (response.file.status === "done") {
                message.success(`${response.file.name} 
                               file uploaded successfully`);
              } else if (response.file.status === "error") {
                message.error(`${response.file.name} 
                             file upload failed.`);
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload> */}
                </Form>
              </Modal>
              <Table columns={columns} dataSource={dataSource}></Table>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Documentation;
