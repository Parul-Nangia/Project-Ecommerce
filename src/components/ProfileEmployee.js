import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload, Card, message, Avatar, Image } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { PhoneOutlined } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { HomeOutlined, CalendarOutlined } from "@ant-design/icons";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import VerifiedIcon from "@mui/icons-material/Verified";

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
        // onPreview={handlePreview}
        // onChange={handleChange}
        beforeUpload={beforeUpload}
        status="done"
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>

      <Card
        hoverable
        style={{
          width: 1000,
          height: 900,
          display: "flex",
          marginLeft: "3%",
          marginTop: "30px",
          // backgroundColor: "gray",
        }}
        // cover={<img alt="example" src={userprofiledata} />}
      >
        <div>
          <img
            alt=""
            // style={{ display: "flex", height: "400x", width: "120px" }}
            style={{
              // marginTop: "-40%",
              height: "200px",
              width: "200px",
              display: "flex",
              marginLeft: "38%",
              borderTopLeftRadius: "50% 50%",
              borderTopRightRadius: "50% 50%",
              borderBottomRightRadius: "50% 50%",
              borderBottomLeftRadius: "50% 50% ",
            }}
            src={userprofiledata}
          />
          <br />

          <div
            style={{
              justifyContent: "center",

              marginLeft: "35%",
            }}
          >
            <span
              style={{
                fontWight: "bold",
                marginLeft: "14%",

                fontSize: "30px",
              }}
            >
              {viewEmployeeProfile?.name}
              <VerifiedIcon style={{ color: "blue" }} />
            </span>
            <br />
            <span
              style={{
                color: "gray",
                marginLeft: "18%",
              }}
            >
              {viewEmployeeProfile?.role}
            </span>
          </div>
          <br />
          <br />
          <Card
            hoverable
            style={{
              display: "flex",
              marginLeft: "-15px",
              width: 980,
            }}
          >
            <div style={{ display: "flex", marginLeft: "80px" }}>
              {/* <ManIcon />
              <WomanIcon /> */}
              <div>
                <p style={{ fontWeight: "bold" }}>Father's Name</p>

                <p>{viewEmployeeProfile?.fatherName}</p>
              </div>

              <div style={{ marginLeft: "100%" }}>
                <p style={{ fontWeight: "bold" }}>Mother's Name</p>
                <p style={{ marginLeft: "" }}>
                  {viewEmployeeProfile?.motherName}
                </p>
              </div>
              <div style={{ marginLeft: "100%" }}>
                <p style={{ fontWeight: "bold" }}>Blood Group</p>
                <p style={{ marginLeft: "25px" }}>
                  {viewEmployeeProfile?.bloodGroup}
                </p>
              </div>
            </div>
          </Card>

          <br />
          <Card
            hoverable
            style={{
              display: "flex",
              marginLeft: "-15px",
              width: 980,
            }}
          >
            <div style={{ display: "flex" }}>
              <div style={{ marginLeft: "80px" }}>
                <p style={{ fontWeight: "bold" }}>Address</p>
                <p>{viewEmployeeProfile?.permanentAddress}</p>
              </div>
              <div style={{ marginLeft: "55%" }}>
                <p style={{ fontWeight: "bold" }}>
                  {/* <CalendarOutlined style={{ marginRight: "10px" }} /> */}
                  Joining Date
                </p>
                <p>{viewEmployeeProfile?.joiningDate}</p>
              </div>
            </div>
          </Card>

          <br />
          <Card
            hoverable
            style={{
              display: "flex",
              marginLeft: "-15px",
              width: 980,
              // marginTop: "-20px",
            }}
          >
            <div style={{ display: "flex", marginLeft: "30%" }}>
              <div>
                <p style={{ fontWeight: "bold" }}>
                  {/* <PhoneOutlined
                    style={{ fontSize: "14px", marginRight: "8px" }}
                  /> */}
                  Contact
                </p>
                <p style={{ marginRight: "10px" }}>
                  {viewEmployeeProfile?.contact}
                </p>
              </div>

              <div style={{ marginLeft: "180%" }}>
                <p style={{ fontWeight: "bold" }}>
                  {/* <MailIcon
                    style={{
                      fontSize: "14px",
                      marginRight: "5px",
                    }}
                  /> */}
                  Email
                </p>
                <p>{viewEmployeeProfile?.email}</p>
              </div>

              <div style={{ marginLeft: "140%" }}>
                <p style={{ fontWeight: "bold" }}>{/* <LinkedInIcon /> */}</p>
                <p>{viewEmployeeProfile?.linkedinprofilelink}</p>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      {/* <div>
        <img
          src={userprofiledata}
          alt=""
          className="userprofileimg"
          style={{
            display: "flex",
            height: "200px",
            width: "200px",
            marginTop: "40px",
          }}
        />
      </div>

      <Card title="General Information" bordered={false} style={{ width: 300 }}>
        <p>Name: {viewEmployeeProfile?.name}</p>
        <p>Email: {viewEmployeeProfile?.email}</p>
        <p>Contact: {viewEmployeeProfile?.contact}</p>
        <p>Gender: {viewEmployeeProfile?.gender}</p>
        <p>Role: {viewEmployeeProfile?.role}</p>
        <p>Linkedin Profile: {viewEmployeeProfile?.linkedinprofilelink}</p>
      </Card> */}
    </>
  );
  // } else {
  //   <div>

  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       <Button onClick={mypic}>Upload</Button>
  //     </div>
  //   </div>
  // }
};
export default ProfileEmployee;
