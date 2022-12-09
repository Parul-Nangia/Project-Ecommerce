import React, { useState, useEffect } from "react";
import "./employeeprofile.css";
import { Card } from "antd";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Button } from "antd";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  // console.log("reader",reader)
  // console.log("img", img);
  // console.log("callback",callback)

  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const EmployeeProfile = () => {
  const [viewProfile, setViewProfile] = useState([]);
  console.log("View Profile", viewProfile);

  const [viewEmployeeProfile, setViewEmployeeProfile] = useState([]);
  // const [empid, setEmpID] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  console.log("Imageurl", imageUrl);
  const [myprofilepic, setMyprofilepic] = useState("");
  const [userprofiledata, setUserProfileData] = useState("");
  console.log("user profile data pic", userprofiledata);

  // const [preview,setPreview] = useState(null)

  const beforeUpload = async (file) => {
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);
    const formData = new FormData();

    formData.append("image", file);
    formData.append("documenttype", "Picture");
    formData.append("documentname", "Profile Picture");
    formData.append("emp_id", decoded._id);

    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/document/add/${decoded._id}`,
        formData
      )
      .then((res) => {
        console.log("doc response", res);
        setViewProfile(res?.data?.documentRecord?.image);
        // console.log("image", res?.data?.documentRecord?.image);

        // if (res?.data?.documentRecord?.length === 0) {
        //   console.log("image not found");
        // } else {
        const profilepicture = res?.data?.documentRecord?.image;
        console.log("profilepicture", profilepicture);

        axios
          .put(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`, {
            profilepicture,
          })
          .then((res) => {
            console.log("user pofile pic Response", res);
          });
        console.log("image uploaded");
        // }
      });
  };
  useEffect(() => {
    const getimage = async () => {
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/document/pic/${decoded._id}`)
        .then((res) => {
          console.log(res, "picture response");
          setMyprofilepic(res?.data?.profilepic);
        });
    };
    getimage();
  }, []);

  const token = localStorage.getItem("access_token1");
  // console.log("token from local storage:", token);
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

  const handleChange = (info) => {
    console.log("info", info);
    console.log("info.file", info.file);
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.

      getBase64(info.file.originFileObj, (url) => {
        console.log(info.file.originFileObj, "obj");

        setLoading(false);
        // console.log(url, "urlllll");

        setImageUrl(url);
        console.log("imageUrl", imageUrl);
      });
    }
  };

  useEffect(() => {
    const PicProfileData = async () => {
      const token = localStorage.getItem("access_token1");
      var decoded = jwt_decode(token);

      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`)
        .then((res) => {
          setUserProfileData(res?.data?.myData?.profilepicture);
          console.log("profile pic res", res?.data?.myData?.profilepicture);
        });
    };
    PicProfileData();
  }, []);

  const uploadButton = (
    <div>
      {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  function showImage() {
    return userprofiledata.map((img, index) => (
      <img image={img.urls.regular} />
    ));
  }

  return (
    <>
      <Upload
        name="avatar"
        url={userprofiledata}
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
      {/* {/ <Button >Submit</Button> /}
      {/ {viewProfile?.image} /} */}

      {/* {myprofilepic.map ((val) => {
            return val.image;
      })} */}
      {/* 
      <img
        src="http://localhost:3000api\uploads\1670479946601-86469402020210926_154519.jpg"
        className="userprofileimg"
      /> */}

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
