import { Button, Form, Input, Row } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginNew.css";

const LoginNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    console.log("going forward");

    e.preventDefault();

    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/user/login`,
      {
        name,
        password,
      }
    );

    axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;

    localStorage.setItem("access_token1", JSON.stringify(data.token));
    window.location.reload();
    navigate("/dashboard");
  };

  return (
    <>
      <Row justify="center" style={{ padding: "10%", marginTop: "20px" }}>
        <Form style={{ width: "300px" }}>
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
        </Form>
      </Row>
    </>
  );
};

export default LoginNew;
