import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React,  { useState ,key} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Drop = () => {
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);



  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const menu = (
    <Menu
      onClick={({key})=>{
        if (key==="demo"){

        }else{
          navigate(key);
        }
      }}
      items={[

        {
          label:'Settings',
          key:'/setting',
        },

        {
          label:'Help',
          key:'/help',
        },
       
        {
          label: 'Sign Out',
          key: '/',
        },
       
        
      ]}
    />
  );




  return (
    <Dropdown overlay={menu} onOpenChange={handleOpenChange} open={open}>
      <a onClick={(e) => e.preventDefault()}>
        <Space style={{fontSize:"20px",width:"40px"}}>
          Profile
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Drop;