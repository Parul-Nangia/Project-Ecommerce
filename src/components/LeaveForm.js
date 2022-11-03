import React from 'react'
import { Form, Input, Button, Row } from 'antd';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { makeStyles } from "@material-ui/core";
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

const useStyles = makeStyles({

  frmItem: {
    padding: "10px",
    width: "50vh"

  },
})



const LeaveForm = () => {
  const classes = useStyles();
  const [size, setSize] = useState('default');

  const navigate = useNavigate()
  const [state, setState] = useState([]);
  const [EmployeeName, setEmployeeName] = useState("");
  const [SupervisorName, setSupervisorName] = useState("");
  const [Department, setDepartment] = useState("");
  const [LeaveType, setLeaveType] = useState("");
  const [LeaveDate, setLeaveDate] = useState("");
  const [ReturnDate, setReturnDate] = useState("")
  const [TotalHoursRequested, setTotalHoursRequested] = useState("");
  const [TotalDaysRequested, setTotalDaysRequested] = useState("")
  






  function applyLeave() {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
    let data = {emp_id: decoded._id, EmployeeName, SupervisorName, Department, LeaveType, LeaveDate, ReturnDate, TotalHoursRequested, TotalDaysRequested }


    fetch("http://localhost:1999/leave", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((Leave) => {
      console.log("result", Leave);
      window.alert("Leave Applied")

    })

  }


  function handleClick() {
    navigate("/dashboard")
  }

  return (
    <>

      <Row justify="center" style={{ padding: "10%", marginLeft: "120px"}}>

        <Form >


          <Form.Item rules={[{ required: true }]} >
            <Input onChange={(e) => { setEmployeeName(e.target.value) }} id="EmployeeName" className={classes.frmItem} placeholder="Employee Name" />
          </Form.Item>

          <Form.Item rules={[{ required: true }]} >
            <Input onChange={(e) => { setSupervisorName(e.target.value) }} id="SupervisorName" className={classes.frmItem} placeholder="Supervisor Name" />
          </Form.Item>

          <Form.Item rules={[{ required: true }]} >
            <Input onChange={(e) => { setDepartment(e.target.value) }} id="Department" className={classes.frmItem} placeholder="Department" />
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input onChange={(e) => { setLeaveType(e.target.value) }} id="LeaveType" className={classes.frmItem} placeholder="Leave Type" />
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input onChange={(e) => { setLeaveDate(e.target.value) }} id="LeaveDate" className={classes.frmItem} type="calendar" placeholder="Leave Date" />
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input onChange={(e) => { setReturnDate(e.target.value) }} id="ReturnDate" className={classes.frmItem} type="calendar" placeholder="Return Date" />
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input onChange={(e) => { setTotalHoursRequested(e.target.value) }} className={classes.frmItem} id="TotalHoursRequested" type="number" placeholder="Total Hours Requested" />
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input onChange={(e) => { setTotalDaysRequested(e.target.value) }} className={classes.frmItem} id="TotalDaysRequested" type="number" placeholder="Total Days Requested" />

          </Form.Item>
          <Form.Item>

            <Button type="primary" size={size} onClick={applyLeave} >Submit</Button><br />
            <br/>
            <Button type="primary" size={size} onClick={handleClick} >Back</Button><br />
          </Form.Item>
        </Form>
      </Row>


    </>
  )
}

export default LeaveForm;