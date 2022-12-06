import React, { useState, useEffect } from "react";

import { Card } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const EmployeeProfile = () => {
  const [viewProfile, setViewProfile] = useState([]);

  const [viewEmployeeProfile, setViewEmployeeProfile] = useState([]);
  // const [empid, setEmpID] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  // const [myprofilepic, setMyprofilepic] = useState("");

  // const [preview,setPreview] = useState(null)

  const beforeUpload = async (file) => {
    // console.log("file", file)
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);

    // e.preventDefault();

    // const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // if (!isJpgOrPng) {
    //   message.error("You can only upload JPG/PNG file!");
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   message.error("Image must smaller than 2MB!");
    // }
    // const token = localStorage.getItem("access_token1");
    // console.log("token from local storage:", token);
    // var decoded = jwt_decode(token);
    // console.log("Decoded token data", decoded);
    // setEmpID(decoded._id);
    // const emp_id = decoded._id;
    //  const formData = new FormData();

    //  formData.append("profilepicture", file);
    //  console.log("fileeee", file);

    // formData.append("emp_id", emp_id);
    // console.log("hello", formData);
    // const profilepicture = file.name;
    // console.log("profilepicture", profilepicture);

    // const image = file
    // console.log("image", image)

    const formData = new FormData();
    // const image = formData
    formData.append("image", file);
    formData.append("documenttype", "Picture");
    formData.append("documentname", "Profile Picture");
    formData.append("emp_id", decoded._id);
    console.log("formData", formData);

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/document/add/${decoded._id}`,
        formData
      )

      .then((res) => {
        console.log("doc response", res);
        setViewProfile(res?.data?.documentRecord?.image);
        console.log("image", res?.data?.documentRecord?.image);
       
      });



    const profilepicture = viewProfile?.image;
    console.log("imageee", profilepicture);

    axios
      .put(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`, {
        profilepicture,
      })
      .then((res) => {
        console.log("user pofile pic Response", res);
        console.log("pic uploaded");
      });
  };

  //     // axios
  //     //   .post(
  //     //     `${process.env.REACT_APP_BASE_URL}/document/add/${emp_id}`,
  //     //     formData
  //     //   )
  //     //   .then((res) => {
  //     //     console.log("Document Response", res);

  //     //   });
  //     const file = await res.json()

  //      setImage(file.secure_url)
  //       setLoading(false)

  //   };

  const token = localStorage.getItem("access_token1");
  console.log("token from local storage:", token);
  var decoded = jwt_decode(token);
  console.log("Decoded token data", decoded);

  useEffect(() => {
    getprofile(decoded._id);
  }, []);

  const getprofile = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`)
      .then((res) => {
        console.log(res, "api response");
        setViewEmployeeProfile(res?.data?.myData);
      });
  };

  // useEffect(() => {
  //   updateprofile(decoded._id);
  // }, []);

  // const updateprofile = async () => {
  //   await axios
  //     .get(`${process.env.REACT_APP_BASE_URL}/document/${decoded._id}`)
  //     .then((res) => {
  //       console.log(res, "image response");
  //       setViewImage(res?.data?.documentData);
  //     });
  // };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
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
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
      {/* {viewProfile?.image} */}

      <Card title="General Information" bordered={false} style={{ width: 300 }}>
        <p>Name: {viewEmployeeProfile?.name}</p>
        <p>Email: {viewEmployeeProfile?.email}</p>
        <p>Contact: {viewEmployeeProfile?.contact}</p>
        <p>Gender: {viewEmployeeProfile?.gender}</p>
        <p>Role: {viewEmployeeProfile?.role}</p>
        <p>Linkedin Profile: {viewEmployeeProfile?.linkedinprofilelink}</p>
      </Card>
    </>
  );
};

export default EmployeeProfile;
