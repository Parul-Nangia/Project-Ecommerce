import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Card, message, Avatar, Image, Divider } from "antd";
import axios from "axios";
import { useEffect } from "react";

import {
  HomeOutlined,
  CalendarOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ProfileEmployee = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [myprofilepic, setmyprofilepic] = useState("");

  const [userprofiledata, setUserProfileData] = useState("");
  const [viewEmployeeProfile, setViewEmployeeProfile] = useState([]);
  console.log("employee profile", viewEmployeeProfile);
  const [viewProfile, setViewProfile] = useState([]);
  const [profilepicture, setProfilePicture] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [nullimage, setNullImage] = useState("");

  // const [fileeee, setFileeeee] = useState()

  const handleCancel = () => setPreviewOpen(false);
  const { Meta } = Card;

  const handlePreview = async (file) => {
    console.log("file", file.name);
    console.log("fileeee", file);

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const beforeUpload = async (file) => {
    console.log("beforeUpload");
    message.warning("Please wait...");
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

        const profilepicture = res?.data?.documentRecord?.image;
        setProfilePicture(profilepicture);
        console.log("profilepicture", profilepicture);

        axios
          .put(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`, {
            profilepicture,
          })
          .then((res) => {
            console.log("user profile pic Response", res);
          });
        console.log("image uploaded");
        message.success("Profile picture uploaded!");

        // }
      });

    // window.location.reload();
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  console.log("fileList", fileList);

  // const mypic = (fileList) => {
  //   setFileeeee(fileList)
  // }

  useEffect(() => {
    const PicProfileData = async () => {
      const token = localStorage.getItem("access_token1");
      var decoded = jwt_decode(token);
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`)
        .then((res) => {
          console.warn("myprofieres", res);

          if (res?.data?.myData?.profilepicture === "") {
            setUserProfileData(
              "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.webp"
            );
            console.warn("no image");
          } else {
            console.warn("uploaded");
            setUserProfileData(
              `${process.env.REACT_APP_BASE_URL}/images/` +
                res?.data?.myData?.profilepicture
            );
          }
        });
    };
    PicProfileData();
  }, []);

  const token = localStorage.getItem("access_token1");
  var decoded = jwt_decode(token);
  console.log("Decoded token data", decoded);
  useEffect(() => {
    getprofile(decoded._id);
  }, []);

  const getprofile = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`)
      .then((res) => {
        setViewEmployeeProfile(res?.data?.myData);
        // console.log(res?.data?.myData, "api response");
      });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  // if (fileList.length > 1) {

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        status="done"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <div style={{ display: "flex" }}>
        <div className="myprofile">
          <Card
            className="smallprofilecard"
            cover={<img alt="example" src={userprofiledata} />}
          >
            <Meta
              // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              // title="Card title"
              description="Full name"
            />
            <p>{viewEmployeeProfile?.name}</p>

            <Meta
              // avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              // title="Card title"
              description="Email"
            />
            <p>{viewEmployeeProfile?.email}</p>
          </Card>
        </div>

        <Card style={{ marginLeft: "20px", marginTop: "40px" }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "50px" }}>
                <p style={{ color: "darkgray", marginTop: "13px" }}>Email</p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>
                  Mobile no.
                </p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>
                  Emergency contact
                </p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>
                  Permanent address
                </p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>
                  Blood group
                </p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>
                  Father's name
                </p>
                <Divider />
              </div>
              <div style={{ marginRight: "90px" }}>
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.email}
                </h1>
                <Divider />
                <h1 style={{ color: "black" }}>
                  {viewEmployeeProfile?.contact}
                </h1>
                <Divider />
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.contactNumber}
                </h1>
                <Divider />
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.permanentAddress}
                </h1>
                <Divider />
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.bloodGroup}
                </h1>
                <Divider />
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.fatherName}
                </h1>
                <Divider />
              </div>
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ marginRight: "50px" }}>
                <p style={{ color: "darkgray", marginTop: "13px" }}>
                  Mother's name
                </p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>Salary</p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>Linkedin</p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>
                  Designation
                </p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>
                  Joining date
                </p>
                <Divider />
                <p style={{ color: "darkgray", marginTop: "13px" }}>
                  Appraisel date
                </p>
              </div>
              <div>
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.motherName}
                </h1>
                <Divider />
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.salary}
                </h1>
                <Divider />
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.linkedinprofilelink}
                </h1>
                <Divider />
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.role}
                </h1>
                <Divider />
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.joiningDate}
                </h1>
                <Divider />
                <h1 style={{ color: "black", marginTop: "13px" }}>
                  {viewEmployeeProfile?.appraisal}
                </h1>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
export default ProfileEmployee;
