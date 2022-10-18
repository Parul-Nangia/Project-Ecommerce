import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { LoginOutlined, SettingTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from "react-router-dom";
import jwt_decode from 'jwt-decode';
// import { useSelector, useDispatch } from 'react-redux';

const Drop = () => {


  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");


  const logout=(e)=>{
    e.preventDefault();
    console.log('Logout');
    localStorage.clear();
    sessionStorage.clear()
    navigate('/');
  }



  useEffect(() => {
    userData();

  }, [])




  const userData = (_id) => {
    const token = localStorage.getItem("access_token1");
    console.log("token from local storage:", token)
    // let token = token;
    var decoded = jwt_decode(token);
    console.log("Decoded token data",decoded);
    setName(decoded)


    // fetch(`http://localhost:1999/user/${_id}`).then((response) => {
    //   return response.json();
    // }).then((data) => {
    //   let user = data.userData
    //   setState(user);

    //   console.log("user Api response data", user);

    // })

  }







  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const menu = (
    <Menu style={{ marginTop: "-25px" }}
      onClick={({ key }) => {
        if (key === "demo") {

        } else {
          navigate(key)
            ;
        }
      }}
      items={[

        {
          label: 'Settings',
          key: '/setting',
          icon: <SettingTwoTone />,
        },

        {
          label: 'Help',
          key: '/help',
          icon: <InfoCircleTwoTone />,
        },

        {
          label:
          <nav className="sb-topnav">
          <LoginOutlined />

          <Link className="drop-down" to="#"
          onClick={logout}> Logout</Link>

         
          </nav>,
        },



      ]}
    />
  );




  return (
    <Dropdown overlay={menu} onOpenChange={handleOpenChange} open={open}>
      <a onClick={(e) => e.preventDefault()}>
        <Space style={{ color: "black", float: "right" }}>
          <h3>Hii {name.name}</h3>
          <DownOutlined />
          
        </Space>
      </a>
    </Dropdown>
  );
};



export const selectUser = (state) => (state.user.user)
export default Drop;