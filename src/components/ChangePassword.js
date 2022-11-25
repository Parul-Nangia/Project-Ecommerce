import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [isopenmodal, setIsOpenModal] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const showMyModal = () => {
    setIsOpenModal(true);
  };

  const handleMyOk = () => {
    setIsOpenModal(false);
  };

  const handleMyCancel = () => {
    setIsOpenModal(false);
  };
  return (
    <>
      <Modal
        title="Password Reset"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        open={isopenmodal}
        onOk={handleMyOk}
        onCancel={handleMyCancel}
      >
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
            style={{ fontWeight: "bold" }}
            label="Set Password"
            name="SetPassword"
            rules={[
              {
                required: true,
                message: "set your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            style={{ fontWeight: "bold" }}
            label="Confirm Password"
            name="password"
            rules={[
              {
                required: true,
                message: "confirm  your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
        <Form.Item>
          <Button
            style={{ display: "flex", float: "right", backgroundColor: "red" }}
            type="primary"
            htmlType="cancel"
            onClick={handleMyCancel}
          >
            Cancel
          </Button>
          <Button
            style={{
              display: "flex",
              marginLeft: "70%",
            }}
            type="primary"
            htmlType="done"
            onClick={handleMyOk}
          >
            Done
          </Button>
        </Form.Item>
      </Modal>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Link to Change Password
      </h1>
      <div>
        <Link
          style={{
            display: "flex",
            justifyContent: "center",
            hover: "blue",
          }}
          onClick={showMyModal}
        >
          Change Password
        </Link>
      </div>
    </>
  );
};
export default ChangePassword;
