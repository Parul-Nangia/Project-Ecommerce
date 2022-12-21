import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const SubmitError = () => {
  const navigate = useNavigate();

  function HandleClick() {
    navigate("/");
  }

  function HandleMyClick() {
    navigate("/leaveform");
  }

  return (
    <Result
      status="error"
      title=" Submission Failed !"
      subTitle="Please check and modify the following information before resubmitting."
      extra={[
        <Button type="primary" onClick={HandleClick}>
          Back To Dashboard
        </Button>,
        <Button type="primary" onClick={HandleMyClick}>
          Try Again
        </Button>,
      ]}
    />
  );
};
export default SubmitError;
