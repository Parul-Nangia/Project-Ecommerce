import { Button, Form, Input, Row, message } from "antd";
import React, { useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [correctData, setCorrectData] = useState("");
  useEffect(() => {
    dataShow();
  }, []);
  const dataShow = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/user`).then((res) => {
      console.log(res, "Response");
      console.log(res?.data?.userData, "Response");
      const showData = res?.data?.userData;
      console.log(showData);
      setCorrectData(showData);
    });
  };
  const submit = async (e) => {
    console.log(correctData, "show data");
    try {
      console.log("going forward");
      e.preventDefault();
      const show = { name, password };
      console.log(show, "Show");

      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        { name, password }
      );
      //     .then(()=>{
      // message.success("Authorized ")

      //     });
      console.log(data, "dataaaa");
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["token"]}`;
      localStorage.setItem("access_token1", JSON.stringify(data.token));
      console.log(localStorage, "localStorage");
      message.success("Login ");
      window.location.reload();
      navigate("/");
    } catch (error) {
      console.log(correctData, "show data catch");
    
      const UserName = correctData.map((text) => {
        return text.name;
      });
      const Password = correctData.map((text1) => {
        return text1.password;
      });

      console.log(correctData);
      if (name === "" && password === "") {
        message.error("Fill your username and password");
      } else if (!Password.includes(password) && !UserName.includes(name)) {
        message.error("InValid password & username!!");
      } else if (!UserName.includes(name)) {
        console.log("Incorrect username");
        message.error("Incorrect Username!");
      } else if (!Password.includes(password)) {
        console.log("Incorrect Password");
        message.error("Incorrect password!");
      } else {
        message.warning("valid username and password here");
      }

    
    }
  };

  return (
    <>
      <Row justify="center" style={{ padding: "10%", marginTop: "20px" }}>
        <Form style={{ width: "300px" }} autoComplete="off">
          <img className="logoimg" src="ebs.png" />

          <Form.Item
            name="Name"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type="password"
              prefix={<LockOutlined />}
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
