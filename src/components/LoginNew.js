import { Button, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import "./LoginNew.css";

const LoginNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    console.log("going forward");
    e.preventDefault();

    const { data } = await axios.post("http://localhost:1999/user/login", {
      name,
      password,
    });

    axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;

    console.log(data);

    localStorage.setItem("access_token1", JSON.stringify(data.token));
    window.location.reload();
    navigate("/dashboard");
  };

  // if (navigate) {
  //   return <Navigate to="/dashboard" />;
  // }

  // const onFinish = (values) => {
  //     console.log('Success:', values);
  // };
  // const onFinishFailed = (errorInfo) => {
  //     console.log('Failed:', errorInfo);
  // };
  return (
    <>
      <Row justify="center" style={{ padding: "10%", marginTop: "20px" }}>
        <Form>
          <img className="logoimg" src="ebs.png" />

          <Form.Item
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" onClick={submit} className="center-btn">
              Login
            </Button>
            <br />
          </Form.Item>

          <div className="GoogleAuthen">
            <GoogleAuth />
          </div>
        </Form>
      </Row>
    </>
  );
};

//         <Row justify="center" align="middle">
//             <Col span={12} offset={6}>
//                 <Form
//                     name="basic"
//                     labelCol={{
//                         span: 12,
//                     }}
//                     wrapperCol={{
//                         span: 16,
//                     }}
//                     initialValues={{
//                         remember: true,
//                     }}
//                     onFinish={onFinish}
//                     onFinishFailed={onFinishFailed}
//                     autoComplete="off"
//                 >
//                     <Form.Item
//                         label="Username"
//                         name="username"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Please input your username!',
//                             },
//                         ]}
//                     >
//                         <Input />
//                     </Form.Item>

//                     <Form.Item
//                         label="Password"
//                         name="password"
//                         rules={[
//                             {
//                                 required: true,
//                                 message: 'Please input your password!',
//                             },
//                         ]}
//                     >
//                         <Input.Password />
//                     </Form.Item>

//                     <Form.Item
//                         name="remember"
//                         valuePropName="checked"
//                         wrapperCol={{
//                             offset: 8,
//                             span: 16,
//                         }}
//                     >
//                         <Checkbox>Remember me</Checkbox>
//                     </Form.Item>

//                     <Form.Item
//                         wrapperCol={{
//                             offset: 8,
//                             span: 16,
//                         }}
//                     >
//                         <Button type="primary" htmlType="submit">
//                             Submit
//                         </Button>
//                     </Form.Item>
//                 </Form>
//             </Col>
//         </Row>
//     );
// };
export default LoginNew;
