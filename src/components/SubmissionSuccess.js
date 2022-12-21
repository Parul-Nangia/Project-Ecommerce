import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const SubmissionSuccess = () => {
  const navigate = useNavigate();

  function HandleClick() {
    navigate("/");
  }

  return (
    <Result
      status="success"
      title=" Leave Successfully Submitted !"
      subTitle="Your Application is successfully received by Ebullient Soft"
      extra={[
        <Button type="primary" onClick={HandleClick}>
          Back To Dashboard
        </Button>,
      ]}
    />
  );
};
export default SubmissionSuccess;
