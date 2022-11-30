import React from "react";
import { Form, Input, Button, Row, DatePicker } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { send } from "emailjs-com";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";

const useStyles = makeStyles({
  frmItem: {
    padding: "10px",
    width: "50vh",
  },
});

const LeaveForm = () => {
  const classes = useStyles();
  const [size, setSize] = useState("default");

  const navigate = useNavigate();
  const [state, setState] = useState([]);
  const [EmployeeName, setEmployeeName] = useState("");
  const [SupervisorName, setSupervisorName] = useState("");
  const [Department, setDepartment] = useState("");
  console.log("Department", Department);
  const [LeaveType, setLeaveType] = useState("");
  console.log("LeaveType", LeaveType);
  const [LeaveDate, setLeaveDate] = useState("");
  console.log("LeaveDate", LeaveDate);
  const [ReturnDate, setReturnDate] = useState("");
  console.log("ReturnDate", ReturnDate);
  const [TotalHoursRequested, setTotalHoursRequested] = useState("");
  const [TotalDaysRequested, setTotalDaysRequested] = useState("");
  const [status, setStatus] = useState("");

  function applyLeave() {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
    let data = {
      emp_id: decoded._id,
      EmployeeName,
      SupervisorName,
      Department,
      LeaveType,
      LeaveDate,
      ReturnDate,
      TotalHoursRequested,
      TotalDaysRequested,
      status,
    };

    fetch(`${process.env.REACT_APP_BASE_URL}/leave`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((Leave) => {
      console.log("result", Leave);
      window.alert("Leave Applied");
    });
  }

  function handleClick() {
    navigate("/Leave");
  }
  const handleEmail = () => {
    // sendEmail();
    applyLeave();
  };

  const sendEmail = (e) => {
    send(
      "service_j2nsqz6",
      "template_oe7fwzn",
      { EmployeeName, Department, LeaveType, LeaveDate },
      "WHjKfMGOYKK7DBceV"
    )
      .then((response) => {
        console.log("Message sent succesfully", response.status, response.text);
      })
      .catch((err) => {
        console.log("Failed", err);
      });
  };

  const selectthis = (value) => {
    setLeaveType(value);
  };

  const selectme = (value) => {
    setDepartment(value);
  };

  const handledate = (value) => {
    setLeaveDate(value.format("YYYY-MM-DD"));
  };

  const handlereturn = (value) => {
    setReturnDate(value.format("YYYY-MM-DD"));
  };

  const selecthours = (value) => {
    setTotalHoursRequested(value);
  };

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

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        style={{ marginTop: "60px" }}
      >
        <Form.Item
          label="Employee Name"
          name="employee name"
          rules={[
            {
              required: true,
              message: "please input Your Name",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setEmployeeName(e.target.value);
            }}
            placeholder="Employee Name"
          />
        </Form.Item>

        <Form.Item
          label="Supervisor Name"
          name="supervisor name"
          rules={[
            {
              required: true,
              message: "please input Your's Supervisor Name",
            },
          ]}
        >
          <Input
            onChange={(e) => {
              setSupervisorName(e.target.value);
            }}
            placeholder="Supervisor Name"
          />
        </Form.Item>

        <Form.Item
          label="Department"
          name="department"
          rules={[
            {
              required: true,
              message: "please input Your Department Name",
            },
          ]}
        >
          <Select
            defaultValue={{
              value: "Select",
            }}
            onChange={selectme}
          >
            <Option value="Reactjs">Reactjs</Option>
            <Option value="Php">Php</Option>
            <Option value="Python">Python</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Leave Type"
          name="leave type"
          rules={[
            {
              required: true,
              message: "please select Leave type",
            },
          ]}
        >
          <Select
            defaultValue={{
              value: "Select",
            }}
            onChange={selectthis}
          >
            <Option value="Priviliege">Priviliege</Option>
            <Option value="Sick">Sick</Option>
            <Option value="Casual">Casual</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Leave Date"
          name="leave date"
          rules={[
            {
              required: true,
              message: "please select Date",
            },
          ]}
        >
          <DatePicker onChange={handledate} placeholder="Leave Date" />
        </Form.Item>

        <Form.Item
          label="Return Date"
          name="return date"
          rules={[
            {
              required: true,
              message: "please select Date",
            },
          ]}
        >
          <DatePicker onChange={handlereturn} placeholder="Leave Date" />
        </Form.Item>

        <Form.Item
          label="Total Hours Requested"
          name="total hours requested"
          rules={[
            {
              required: true,
              message: "please select Date",
            },
          ]}
        >
          <Select
            defaultValue={{
              value: "Select",
            }}
            onChange={selecthours}
          >
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="Half Day">Half Day</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{ display: "flex", marginLeft: "40%" }}>
          <Button type="primary" size={size} onClick={handleEmail}>
            Apply
          </Button>
          <br />
          <br />
          <Button
            style={{
              display: "flex",
              marginLeft: "2.5px",
            }}
            type="danger"
            size={size}
            onClick={handleClick}
          >
            Back
          </Button>
          <br />
        </Form.Item>
      </Form>
    </>
  );
};

export default LeaveForm;
