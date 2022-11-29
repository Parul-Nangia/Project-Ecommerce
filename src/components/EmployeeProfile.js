import React, { useState, useEffect } from "react";

import { Card } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, message, Upload } from "antd";

// const beforeUpload = (file) => {
//   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
//   if (!isJpgOrPng) {
//     message.error("You can only upload JPG/PNG file!");
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error("Image must smaller than 2MB!");
//   }
//   return isJpgOrPng && isLt2M;
// };

const EmployeeProfile = () => {
  const [viewProfile, setViewProfile] = useState([]);
  const [updateProfile, setUpdateProfile] = useState("");
  const [empid, setEmpID] = useState("");

  const token = localStorage.getItem("access_token1");
  console.log("token from local storage:", token);
  var decoded = jwt_decode(token);
  console.log("Decoded token data", decoded);

  // const getBase64 = async (img, callback) => {
  //   const token = localStorage.getItem("access_token1");
  //   console.log("token from local storage:", token);
  //   var decoded = jwt_decode(token);
  //   console.log("Decoded token data", decoded);

  //   const reader = new FileReader();

  //   setEmpID(decoded._id);
  //   const emp_id = decoded._id;

  //   console.log("empid", decoded._id);
  //   console.log("update profile", updateProfile);

  //   const formData = new FormData();
  //   formData.append("updateProfile", updateProfile);
  //   formData.append("emp_id", emp_id);

  // //   axios
  // //     .post(`${process.env.REACT_APP_BASE_URL}/document/add/${emp_id}`,

  // //       formData,
  // //     )

  // //     .then((res) => {
  // //       console.log("updated image", res);
  // //     });

  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };

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

  // const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState();
  // const handleChange = (info) => {

  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === "done") {
  //     // Get this url from response in real world.

  //     getBase64( info.file.originFileObj,("http://localhost:1999/document/add/$emp_id") => {
  //       setLoading(false);
  //       setImageUrl("http://localhost:1999/document/add/emp_id");
  //     })

  //      console.log("updated doc", info.file.originFileObj);
  //   }
  // };
  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       Upload Profile Picture
  //     </div>
  //   </div>
  // );
  // const props = {
  //   name: 'uploadProfile',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {

  //     if (info.uploadProfile.status !== 'uploading') {
  //       console.log(info.uploadProfile, info.fileList);
  //     }
  //     if (info.uploadProfile.status === 'done') {
  //       message.success(`${info.uploadProfile.name} file uploaded successfully`);
  //     } else if (info.uploadProfile.status === 'error') {
  //       message.error(`${info.uploadProfile.name} file upload failed.`);
  //     }
  //   },
  // };

  // const props = {
  //   beforeUpload: (file) => {
  //     const isfile =
  //       file.type === "image/png" ||
  //       file.type === "image/jpeg" ||
  //       file.type === "application/msword" ||
  //       file.type === "application/pdf";
  //     if (!isfile) {
  //       message.error("only jpeg,pdf,doc and png file upload");
  //     } else {
  //       message.success("Yes File is Upload ");
  //     }

  //     return (isfile && false) || Upload.LIST_IGNORE;
  //   },
  //   onChange: (info) => {
  //     console.log(info.file, "fileinfo");
  //     setUpdateProfile(info.file);
  //   },
  // };
  const showdata = (info) => {
   
    console.log(info, "information");
    setUpdateProfile(info.file);
  };

    const uploadprofilepic = async () => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token);
    var decoded = jwt_decode(token);
    console.log("Decoded token data", decoded);
  

    setEmpID(decoded._id);
    const emp_id = decoded._id;
    const formData = new FormData();

    formData.append("image", updateProfile);
    formData.append("emp_id", emp_id);
    console.log(updateProfile, "profile");

    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/document/add/${emp_id}`,

        formData
      )

      .then((res) => {
        console.log("Document Response", res);
      });
  };

  return (
    <>
      <Upload beforeUpload={uploadprofilepic} onChange={showdata}>
        <Button icon={<UploadOutlined />} type="upload">
          Upload Profile Picture
        </Button>
      </Upload>

      {/* <Upload
        name="avatar"
        listType="picture-card"
        showUploadList={false}
      action="http://localhost:1999/document/add/$emp_id"
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
      </Upload> */}

      <Card title="General Information" bordered={false} style={{ width: 300 }}>
        <p>Name: {viewProfile?.name}</p>
        <p>Email: {viewProfile?.email}</p>
        <p>Contact: {viewProfile?.contact}</p>
        <p>Gender: {viewProfile?.gender}</p>
        <p>Role: {viewProfile?.role}</p>

        <p>Permanent Address:{viewProfile?.permanentaddress}</p>
      </Card>
    </>
  );
};

export default EmployeeProfile;
