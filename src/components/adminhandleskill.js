import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Select, Button, message } from "antd";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Form, Input, Rate, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Adminhandleskill = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addskill, setAddSkill] = useState("");
  const [skillList, setSkillList] = useState("");
  const [isMyModalOpen, setIsMyModalOpen] = useState(false);
  const [editingskill, setEditingSkill] = useState("");
  const [isvalue, setIsValue] = useState([]);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    GetSkillList();
  }, []);

  const handleAddSkill = (e) => {
    setSkillList(e.target.value);
    console.warn("skillList", e.target.value);
  };

  const AddSkillList = async (value) => {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
    const emp_id = decoded._id;
    if (skillList === "") {
      message.error("Please Add Skill");
    } else {
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/handleskill/addfield`, {
          emp_id,
          skillList,
        })
        .then((res) => {
          message.success("Skill Added Successfully !!");
        });
      window.location.reload();
    }
  };

  const GetSkillList = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/handleskill/newListSkill`)
      .then((res) => {
        setAddSkill(res?.data?.skillListData);
      });
  };

  const editSkill = async () => {
    const skillList = editingskill;
    const _id = isvalue?._id;
    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/handleskill/update/${_id}`, {
        skillList,
      })
      .then((res) => {
        message.success("Skill Successfully Edited ");
      });
    window.location.reload();
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const myshowmodal = (record) => {
    console.log("edit value", record);
    form.setFieldsValue({
      skillList: record?.skillList,
    });
    console.log(record?.skillList, "sskkkkkkkk");

    setIsValue({ ...record });
    console.warn("record", isvalue);
    setIsMyModalOpen(true);
  };
  const handlemyOk = () => {
    editSkill();
    setIsMyModalOpen(false);
  };
  const handlemyCancel = () => {
    setIsMyModalOpen(false);
  };

  const ondeleteskill = (record) => {
    Modal.confirm({
      title: "Are you Sure, you want to delete this skill?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteskill(record._id);
      },
    });
  };

  const deleteskill = async (_id) => {
    await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/handleskill/${_id}`)
      .then((res) => {
        message.success("Delete");
      });
    window.location.reload();
  };

  const handleModCancel = () => {
    setIsMyModalOpen(false);
  };

  const columns = [
    {
      title: "Skills",
      key: "skills",
      dataIndex: "skillList",
    },
    {
      // title: "Action",

      render: (record) => {
        return (
          <>
            <Button
              className="adminedit"
              // className="editbtn"
              onClick={() => {
                myshowmodal(record);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              className="admindelete"
              // className="deletebtn"
              onClick={() => {
                ondeleteskill(record);
              }}
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="skillsManagement">
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

      <Button
        type="primary"
        onClick={showModal}
        style={{ display: "flex", float: "right" }}
      >
        Add Skill Field
      </Button>

      {/* admin add field modal */}
      <Modal
        title="Add Skill"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Form
          // style={{ display: "flex", float: "right" }}
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Form.Item
            name="skillList"
            style={{
              marginTop: "30px",
            }}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              onChange={handleAddSkill}
              placeholder="Add Skill"
              style={{ width: "120%", marginLeft: "40px", height: "60px" }}
            />
          </Form.Item>
          <Form.Item style={{ marginLeft: "35%" }}>
            <Button type="primary" htmlType="submit" onClick={AddSkillList}>
              Add
            </Button>
            <Button
              style={{ marginLeft: "5px" }}
              htmlType="button"
              onClick={onReset}
            >
              Reset
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Skill"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        open={isMyModalOpen}
        onCancel={handleModCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Edit Skill" name="skillList">
            <Input
              // value={record?.skillList}
              onChange={(e) => {
                setEditingSkill(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ display: "flex", marginLeft: "100%" }}>
              <Button
                style={{
                  marginRight: "4px",
                  backgroundColor: "#d22d2d",
                  borderColor: "blanchedalmond",
                }}
                type="primary"
                htmlType="cancel"
                onClick={handlemyCancel}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="Done" onClick={handlemyOk}>
                Done
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      <br />
      <div>
        <Table
          style={{
            display: "flex",
            float: "center",
            // justifyContent: "center",

            // width: "100%",
            // width: "400px",
          }}
          columns={columns}
          dataSource={addskill}
          pagination={true}
        />
      </div>
      {/* <br />
      <div>
        <Table
          rowKey="key"
          columns={column}
          dataSource={dataSource}
          expandable={{
            rowExpandable: (record) => true,
            expandedRowRender: (record) => {
              return (
                <Table
                  columns={nestedColumns}
                  dataSource={record?.employeeskills}
                  pagination={false}
                />
              );
            },
          }}
        /> */}
      {/* </div> */}
    </div>
  );
};
export default Adminhandleskill;
