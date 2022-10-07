import React from 'react';
import { Row, Form, Input, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import GoogleAuth from './GoogleAuth';



const useStyles = makeStyles({
  frmItem: {
    padding: "10px",
    width: "50vh"

  },
  btnCenter: {
    padding: "10px",
    width: "50vh",
    height: "60px",
    backgroundColor: "#FF4500",
    "&:hover": {
      borderRadius: 4,
      backgroundColor: "#C0C0C0",
      color: "black"
    },
  },


  imgg: {
    width: "40%",
    margin: "auto",
    display: "block",


  }

})


const Login = () => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  const submit = async e => {
    console.log("going forward")
    e.preventDefault();

    const { data } = await axios.post('http://localhost:1999/user/login', {
      username, password
    });

    axios.defaults.headers.common['Authorization'] = `Bearer ${data['token']}`;

    console.log(data);


    setNavigate(true);
  }

  if (navigate) {
    return <Navigate to="/dashboard" />;
  }

  return (


    <Row justify="center" style={{ padding: "10%" }}>

      <Form >
        <img className={classes.imgg} src="ebs.png" />

        <Form.Item rules={[{ required: true, message: 'Please input your Username!' }]} >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" className={classes.frmItem} onChange={e => setUsername(e.target.value)} />
        </Form.Item>
        <a className="login-form-forgot" href="">
          Forgot password?
        </a>
        <Form.Item rules={[{ required: true, message: 'Please input your Password!' }]}>
          <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" className={classes.frmItem} onChange={e => setPassword(e.target.value)} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" onClick={submit} className={classes.btnCenter}>Login</Button><br />
        </Form.Item>
        <GoogleAuth />
      </Form>

    </Row>





  )

}

export default Login