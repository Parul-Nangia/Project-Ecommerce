import React from "react";
import { Table } from "antd";
import { useState } from "react";
import { Modal, Input, Form, Select,Button } from "antd";
import { UploadOutlined,CloudDownloadOutlined  } from "@ant-design/icons";
import { useParams } from "react-router-dom"
import { message, Upload } from "antd";
import Top from "../components/Top";
import Sidebar from "../components/Sidebar";
import Middle from "../components/Middle";
import { Layout } from "antd";
import axios from "axios";
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
  const [documentfile,setDocumentFile]=useState(null)
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
                                                                  
  const handleInputChange =(e)=>{
      //  console.log(e.target.files[0])
      //  setDocumentFile(e.target.files)
console.log("hello")
console.log(e.file,"hfjdgdhjfghdfkjghkjh")
console.log(e,"hfjdgdhjfghdfkjghkjh")
console.log(e.fileList[0],"rtyryutewruiryiry")
setDocumentFile(e.file)
  }
  

  const handleOk = () => {
    console.log("fkjdghfdkj");
    console.log(documentname, "Documentname");
    console.log(documenttype, "Documenttype");
    console.log(documentfile,"DocumentFile")
    const formData = new FormData()
    console.log(formData,"jhgrt")
    formData.append("documentfile",documentfile)
    console.log(formData,"poiu")
    // axios.post(" ",formData).then((res)=>{

    // })
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
                  // onChange={(e)=> handleInputChange("file", e.target.files[0])}
                  onChange={handleInputChange}
                  // multiple
                  // listType="picture"
                  // action={"http://localhost:3000"}
                  showUploadList={{showRemoveIcon:false}}
                  accept=".apng,.avif,.gif,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.png,.svg,.webp"
                  beforeUpload={() => false}
                  // beforeUpload={(file)=>{
                  //   console.log({file});
                  //   setDocumentFile(file)
                  //   console.log(setDocumentFile,"setDocumentfile")
                  //   console.log(documentfile,"documentfile")
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
