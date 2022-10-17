import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LoginOutlined, SettingTwoTone, InfoCircleTwoTone } from '@ant-design/icons';
import axios from 'axios';
import { useParams } from "react-router-dom"


const Drop = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [state, setState] = useState([]);




  useEffect(() => {
    userData();

  }, [])

  const userData = (_id) => {
    fetch(`http://localhost:1999/user/${_id}`).then((response) => {
      return response.json();
    }).then((data) => {
      let user = data.userData
      setState(user);

      console.log("response", user);

    })

  }







  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const menu = (
    <Menu style={{ marginTop: "-25px" }}
      onClick={({ key }) => {
        if (key === "demo") {

        } else {
          navigate(key);
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
          label: 'Sign Out',
          key: '/',
          icon: <LoginOutlined />,
        },



      ]}
    />
  );




  return (
    <Dropdown overlay={menu} onOpenChange={handleOpenChange} open={open}>
      <a onClick={(e) => e.preventDefault()}>
        <Space style={{ color: "black", float: "right" }}>
          <h3>Hii {state}</h3>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};



export const selectUser = (state) => (state.user.user)
export default Drop;