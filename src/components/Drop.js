import {
  MenuOutlined,
  UserOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Space, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

const Drop = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userprofiledata, setUserProfileData] = useState("");

  const ProfileEmployee = (e) => {
    e.preventDefault();
    navigate("/profileemployee");
  };

  const employeepassword = (e) => {
    e.preventDefault();
    navigate("/changepassword");
    // <Button type="primary">Change Password</Button>
  };

  const logout = (e) => {
    e.preventDefault();
    console.log("Logout");
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
    navigate("/LoginNew");
  };

  useEffect(() => {
    userData();
  }, []);

  const userData = (_id) => {
    const token = localStorage.getItem("access_token1");

    var decoded = jwt_decode(token);

    setName(decoded);
  };

  useEffect(() => {
    const PicProfileData = async () => {
      const token = localStorage.getItem("access_token1");
      var decoded = jwt_decode(token);
      await axios
        .get(`${process.env.REACT_APP_BASE_URL}/user/${decoded._id}`)
        .then((res) => {
          console.warn("ttttttt", res);
          if (res?.data?.myData[0]?.profilepicture === "") {
            setUserProfileData("profileimage.png");
            console.warn("hiiiiii");
          } else {
            console.warn("ggggggggg");

            setUserProfileData(
              `${process.env.REACT_APP_BASE_URL}/images/` +
                res?.data?.myData[0]?.profilepicture
            );
          }
          console.log("Picture is here", userprofiledata);
          console.log("here ", res?.data?.myData[0]?.profilepicture);
        });
    };
    PicProfileData();
  }, []);

  const menu = (
    <Menu
      // style={{ marginTop: "-25px" }}
      items={[
        {
          key: "0",
          icon: <UserOutlined />,
          label: (
            <Link className="drop-down" onClick={ProfileEmployee}>
              {" "}
              Upload Profile Picture
            </Link>
          ),
        },
        {
          key: "1",
          icon: <SettingOutlined />,
          label: (
            <Link className="drop-down" onClick={employeepassword}>
              {" "}
              Settings
            </Link>
          ),
        },
        {
          key: "2",
          icon: <PoweroffOutlined />,
          label: (
            <Link className="drop-down" onClick={logout}>
              {" "}
              Logout
            </Link>
          ),
        },
      ]}
    />
  );

  return (
    <>
      <div style={{ color: "white", fontStyle: "normal" }}>
        Hi {name.name}
        <Dropdown overlay={menu} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <MenuOutlined className="btnset"></MenuOutlined>
            </Space>
          </a>
        </Dropdown>
      </div>
      <div>
        <Avatar
          src={
            <Image
              src={userprofiledata}
              style={{
                width: 32,
              }}
            />
          }
        />
      </div>
    </>
  );
};

export const selectUser = (state) => state.user.user;

export default Drop;

// <h3 style={{ color: "white", fontStyle: "normal" }}>
// Hii {name.name}
// </h3>
