import React, { useState, useEffect } from "react";

import { Card } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const EmployeeProfile = () => {
  const [viewProfile, setViewProfile] = useState([]);
  const [empid, setEmpID] = useState("");

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);
    setEmpID(decoded._id);
    const emp_id = decoded._id;
    const formData = new FormData();

    formData.append("image", file);

    formData.append("emp_id", emp_id);
    console.log("hello", formData);

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/document/add/${emp_id}`,
        formData
      )
      .then((res) => {
        console.log("Document Response", res);
      });
    return isJpgOrPng && isLt2M;
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const token = localStorage.getItem("access_token1");
  console.log("token from local storage:", token);
  var decoded = jwt_decode(token);
  console.log("Decoded token data", decoded);

  useEffect(() => {
    viewEmployeeProfile(decoded._id);
  }, []);

  const viewEmployeeProfile = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`)
      .then((res) => {
        console.log(res, "api response");
        setViewProfile(res?.data?.myData);
        console.log(viewProfile, "viewprofile");
      });
  };

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });

      console.log("updated doc", info.file.originFileObj);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Profile Picture
      </div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>

      <Card title="General Information" bordered={false} style={{ width: 300 }}>
        <p>Name: {viewProfile?.name}</p>
        <p>Email: {viewProfile?.email}</p>
        <p>Contact: {viewProfile?.contact}</p>
        <p>Gender: {viewProfile?.gender}</p>
        <p>Role: {viewProfile?.role}</p>
        <p>Linkedin Profile: {viewProfile?.linkedinprofilelink}</p>
      </Card>
    </>
  );
};

export default EmployeeProfile;