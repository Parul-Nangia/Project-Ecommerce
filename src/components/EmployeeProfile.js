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
  const [empid, setEmpID] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  // const [preview,setPreview] = useState(null)
  const [viewimage, setViewImage] = useState([]);
  const [userInfo, setuserInfo] = useState({ file: [], filepreview: null });
  const [isSuccess, setSuccess] = useState(null);

  // const handleInputChange = (e) =>{
  //   setuserInfo({
  //     ...userInfo,
  //     file:e.target.files[0],

  //     filepreview:URL.createObjectURL(e.target.files[0])
  //   })
  // }

  // const submit= async()=>{
  //   const token = localStorage.getItem("access_token1");
  //     console.log("token from local storage:", token);
  //     var decoded = jwt_decode(token);
  //     console.log("Decoded token data", decoded);
  //     setEmpID(decoded._id);
  //     const emp_id = decoded._id;

  //     const formData = new FormData();

  //     formData.append("avatar", userInfo.file);
  //     console.log("fileeee",  userInfo.file);

  //     formData.append("emp_id", emp_id);
  //     // console.log("hello", formData);

  //     axios
  //       .post(
  //         `${process.env.REACT_APP_BASE_URL}/document/add/${emp_id}`,
  //         formData
  //       )
  //       .then((res) => {
  //         console.log("Document Response", res);
  //         //  if(res.data.success === 1){
  //         //   setSuccess("Image upload successfully")
  //         // }
  //       });

  // }
  // function handleImage(e) {
  //   console.log(e.target.files)
  //   setImage(e.target.files[0])
  // }

  // const reader = new FileReader();
  // reader.readAsDataURL(file)

  // reader.onload = ()=>{
  //   setPreview(reader.result)
  // }

  const beforeUpload = (file) => {
    // e.preventDefault();


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
    console.log("fileeee", file);

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

  //   const uploadImage = async (e) => {
  //     const files=e.target.files
  //     const token = localStorage.getItem("access_token1");
  //     console.log("token from local storage:", token);
  //     var decoded = jwt_decode(token);
  //     console.log("Decoded token data", decoded);
  //     setEmpID(decoded._id);
  //     const emp_id = decoded._id;

  //     const formData = new FormData();

  //     formData.append("file", files[0]);

  //     setLoading(true)

  //     formData.append("emp_id", emp_id);
  //     console.log("hello", formData);
  // const res = await fetch(
  //   `${process.env.REACT_APP_BASE_URL}/document/add/${emp_id}`,
  //   {
  //     method:'POST',
  //     body:formData
  //   }
  // )

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
    viewEmployeeProfile(decoded._id);
  }, []);

  const viewEmployeeProfile = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`)
      .then((res) => {
        console.log(res, "api response");
        setViewProfile(res?.data?.myData);
      });
  };
  useEffect(() => {
    updateprofile(decoded._id);
  }, []);

  const updateprofile = async () => {
    await axios
      .get(`${process.env.REACT_APP_BASE_URL}/document/${decoded._id}`)
      .then((res) => {
        console.log(res, "image response");
        setViewImage(res?.data?.documentData);
      });
  };

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
      {/* {isSuccess !==null ? <h4>{isSuccess}</h4>:null} */}

      {/* <input type="file" name="upload_file" onChange={ handleInputChange}/>
<Button type="submit" onClick={()=>submit()}>save</Button>
{userInfo.filepreview !==null ?<img className="previewing" src={userInfo.filepreview}alt="Uploadimage"/>:null} */}

      {/* <h1>upload image</h1>
    <input type="file" name="file" placholder="upload image" onChange={uploadImage}/>
    
    {loading ? (<h3>Loading...</h3>
    ):(
      <img src={image} style={{ width:'300px'}} />

      )} */}

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
      {/* {viewimage.map((item) => {
        return <>{item?.image[0]}</>;
      })} */}
      {/* <Button onClick={beforeUpload}>Upload Picture</Button> */}

      {/* <input type="file" name="file" onChange={handleImage} />
     <Button onClick={uploadprofile}>submit</Button> */}
    

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
