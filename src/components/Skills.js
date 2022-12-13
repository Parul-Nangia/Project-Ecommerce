import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Select, Button } from "antd";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Form, Input, Rate, Modal } from "antd";

const Skills = () => {
  const [dataSource, setDataSource] = useState([]);
  const { Option } = Select;
  const [userskill, setSkillName] = useState("");
  const [skillExperience, setSkillExperience] = useState("");
  const [skillrating, setSkillRating] = useState("");
  console.log("skill Rating", skillrating);
  const [skilldata, setSkillData] = useState("");
  const [form] = Form.useForm();
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addskill, setAddSkill] = useState("");
  console.log("new add Skills", addskill);
  const [skillList, setSkillList] = useState("");

  // console.log(userskill, "skill Name");

  const handleChange = (e) => {
    setSkillName(e.target.value);
  };

  const handleRating = (e) => {
    setSkillRating(e.target.value);
  };

  const handleExperience = (e) => {
    setSkillExperience();
  };
  const handleSubmit = () => {
    DataSkill();
  };

  const handleAddSkill = (value) => {
    setAddSkill(value);
  };

  const AddSkillList = async (value) => {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
    const emp_id = decoded._id;
    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/skill/addfield`, {
        emp_id,
        skillList,
      })
      .then((res) => {
        console.log("Skill Add data", res);
      });
  };

  const DataSkill = async (value) => {
    // setSkillName(value);
    const userskill = value;
    console.warn("skillName", userskill);

    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
    const emp_id = decoded._id;
    console.warn("emp_id", emp_id);

    await axios
      .post(`${process.env.REACT_APP_BASE_URL}/skill`, {
        emp_id,
        userskill,
        skillExperience,
        skillrating,
      })
      .then((res) => {
        console.log("post data", res);
      });
    // window.location.reload();
  };

  const columns = [
    {
      title: "Skills",
      key: "skills",
      dataIndex: "userskill",
    },
    {
      title: "Experience",
      dataIndex: "skillExperience",
      key: "experience",
      // render: (text) => <a>{text}</a>,
    },

    {
      title: "Rating",
      key: "rating",
      dataIndex: "skillrating",
    },
  ];

  useEffect(() => {
    userskillData();
  }, []);

  const userskillData = async () => {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);

    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/skill/emp/${decoded._id}`)
      .then((res) => {
        setSkillData(res?.data?.SingleSkillAllData);
        console.log(res?.data?.SingleSkillAllData);
        // for (let m = 0; m < res?.data?.SingleSkillAllData.length; m++) {
        //   setSkillData(res?.data?.SingleSkillAllData[m]?.userskill);
        //   console.log(
        //     "user all skills data",
        //     res?.data?.SingleSkillAllData[m]?.userskill
        //   );
        // }
      });
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
  const tailLayout = {
    wrapperCol: {
      offset: 8,
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
            name="Add Field"
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

      <h3>Add Your Skills</h3>
      <br />

      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item>
          <Select
            style={{
              width: "50%",
              marginTop: "40px",
            }}
            placeholder="select your skills"
            onChange={handleChange}
            optionLabelProp="label"
          ></Select>
        </Form.Item>
        <Form.Item
          name="skillExperience"
          style={{
            width: "50%",
          }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            style={{
              width: "50%",
            }}
            placeholder="Your's Experience"
            onChange={handleExperience}
            optionLabelProp="label"
          >
            <Option value="6 Months" label="6 months">
              <div className="demo-option-label-item">6 Months</div>
            </Option>
            <Option value="1 Year" label="1 year">
              <div className="demo-option-label-item">1 Year</div>
            </Option>
            <Option value="2 Years" label="2 year">
              <div className="demo-option-label-item">2 Years</div>
            </Option>
            <Option value="3 Years" label="3 year">
              <div className="demo-option-label-item">3 Years</div>
            </Option>
            <Option value="4 Years" label="4 years">
              <div className="demo-option-label-item">4 Years</div>
            </Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Select
            style={{
              width: "50%",
            }}
            placeholder="Give Rating Yourself"
            onChange={handleRating}
            optionLabelProp="label"
          >
            <span>
              <Rate
                tooltips={desc}
                onChange={setSkillRating}
                value={skillrating}
              />
              {skillrating ? (
                <span className="ant-rate-text">{desc[skillrating - 1]}</span>
              ) : (
                ""
              )}
            </span>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
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

      <br />
      <div>
        <Table columns={columns} dataSource={skilldata} pagination={false} />
      </div>
    </div>
  );
};
export default Skills;
