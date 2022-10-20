import React from "react";
import { Table } from "antd";
import { useState } from "react";
import { Modal, Input, Form, Select, Button } from "antd";
import { UploadOutlined, CloudDownloadOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom"
import { message, Upload } from "antd";
import axios from "axios";
const { Option } = Select;
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
  const [documentfile, setDocumentFile] = useState()
  const params = useParams();
  // console.log(params.id, "Params Id")
  const [id] = useState(params.id);
  // console.log(id, "Id User");
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
    },
    {
      title: "Document Name",
      dataIndex: "documentName",
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
  // const formData = new FormData() 
  // console.log(formData, "jhgrt")
  // formData.append("documentfile", documentfile) 

  const handleInputChange = e=> {
    console.log("hello")
    console.log(e, "1")
    console.log(e.file, "12")
    console.log(e.fileList, "123")
    console.log(e.fileList[0], "1234")
    // console.log(e.file[0],"E.FILE[0]")
    setDocumentFile(e.file)
    // setDocumentFile(e.files[0])
  }
  const handleOk = (id) => {
    // console.log("fkjdghfdkj");
    console.log(documentname, "Documentname");
    console.log(documenttype, "Documenttype");
    const emp_id= id
    console.log(emp_id,"jkhj")
    const formData = new FormData()                  //https://v2.convertapi.com/upload   //fake API
    const image=formData
    formData.append("image", documentfile)  //http://localhost:1999/document/add
 
    axios.post("http://localhost:1999/document/add",image,
   { emp_id:emp_id,
    documentname:documentname,
    documenttype:documenttype}
    )
    .then(res=>{ // fake api
          console.log(res)
        })
        .catch(error=>{
          console.log(error)
        })
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
    console.log(value);
  };
  return (
    <>
      {/* <Top />
      <Sidebar /> */}
      {/* <Button style={{ float: "right" }} onClick={handleShow}>Add New</Button> */}

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
        labelCol={{span:10}}
        wrapperCol={{span:14}}
          name="basic"
          initialValues={{
            remember: true,
          }}
          style={{ margin: 20 }}
          autoComplete="off"
        >
          <Form.Item label="Document Name"
           rules={[
            { type: "text",},
          ]}>
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
          <Form.Item>
            <Upload.Dragger
            name="image"
               type="file"
              // onChange={(e)=> handleInputChange("file", e.target.files[0])}
              onChange={handleInputChange}
              // multiple
              // type="image"
              // action={"http://localhost:3000"}
              showUploadList={{ showRemoveIcon: false }}
              beforeUpload={() => false}
              accept=".png,.doc,.jpeg,.pdf,.jpg"
              // accept=".apng,.avif,.gif,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.png,.svg,.webp
            // beforeUpload={(file)=>{
           
            //   return false;
            // }}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload.Dragger>
          </Form.Item>
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

    </>
  );
};

export default Documentation;
