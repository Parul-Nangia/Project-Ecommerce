import React from "react";
import { Button, Card, Col, Form, Input, Modal, Space } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";

const ChangePassword = () => {
  const [isopenmodal, setIsOpenModal] = useState(false);
  const [resetpassword, setResetPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [newpassword, setNewPassword] = useState([]);

  const onFinish = async () => {
    const token = localStorage.getItem("access_token1");
    const password = confirmpassword;
    console.log("password value", password);
    var decoded = jwt_decode(token);
    const ID = decoded._id;

    await axios
      .put(`${process.env.REACT_APP_BASE_URL}/user/${ID}`, {
        password,
      })
      .then((res) => {
        setNewPassword(res?.data?.updatedAttendance);
        console.log("Reset Password Value", newpassword);
        // window.location.reload();
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showModal = () => {
    setIsOpenModal(true);
  };

  const handleOk = async () => {
    setIsOpenModal(false);
  };

  const handleCancel = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <Modal
        title="Password Reset"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        open={isopenmodal}
        onCancel={handleCancel}
      >
        <Form
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
          <Form.Item
            // style={{ fontWeight: "bold" }}
            label="New password"
            name="SetPassword"
            rules={[
              {
                required: true,
                message: "set your password!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                setResetPassword(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item
            // style={{ fontWeight: "bold" }}
            label="Confirm password"
            name="password"
            rules={[
              {
                required: true,
                message: "confirm  your password!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", marginLeft: "105%" }}>
              <Button
                style={{ marginRight: "4px", backgroundColor: "#d22d2d", borderColor: "blanchedalmond" }}
                type="primary"
                htmlType="cancel"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="Done" onClick={handleOk}>
                Done
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
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

      <div
        style={{
          marginTop: "85px",
          width: "200px",
          height: "230px",
          padding: "10px",
          border: "2px solid gray",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "198px",
            height: "198px",
            marginLeft: "-10px",
            marginTop: "-10px",
          }}
        >
          <img className="settingimage" src="172985.png" />
        </div>
        <Link
          style={{ display: "flex", marginLeft: "30px", marginTop: "1px" }}
          onClick={showModal}
        >
          Change Password
        </Link>
      </div>
    </>
  );
};
export default ChangePassword;
