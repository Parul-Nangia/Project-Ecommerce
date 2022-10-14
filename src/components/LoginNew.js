import React ,{useState} from 'react';
import { Button, Checkbox, Form, Input,Row,Col } from 'antd';
import {  UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from 'axios';
import { Navigate } from "react-router-dom";
// import GoogleAuth from "./GoogleAuth";




const LoginNew = () => {


    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [navigate, setNavigate] = useState(false);
  
    const submit = async (e) => {
      console.log("going forward");
      e.preventDefault();
  
      const { data } = await axios.post("http://localhost:1999/user/login", {
        name,
        password,
      });
  
      axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;
  
      console.log(data);
    
      setNavigate(true);
      localStorage.setItem("access_token1", JSON.stringify(data.token));
    };
  
    if (navigate) {
      return <Navigate to="/dashboard" />;
    }
  


    return (
        <>
    <Row>
      <Col span={10} offset={6}>
        
      
      
     <Form 
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            
            onChange={(e) => setName(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input type="password"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            
            onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" onClick={submit}>
          Login
        </Button>
      </Form.Item>
    </Form>
    </Col>
    </Row>
  
    </>
    )
}
export default LoginNew;