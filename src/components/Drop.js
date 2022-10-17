import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space ,Input} from 'antd';
import React,  { useEffect,useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {LoginOutlined,SettingTwoTone,InfoCircleTwoTone} from '@ant-design/icons';
import {useDispatch,useSelector} from 'react-redux';
import userEvent from '@testing-library/user-event';
import axios from 'axios';


const Drop = () => {

  

  const user=useSelector(selectUser);
  const[name,setName]=useState('');
  

  useEffect(()=>{
    (async ()=>{
      const{data}=await axios.get("http://localhost:1999/user/login");

      setName(data.name);
    })();

  },[]);


  


  
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);



  const handleOpenChange = (flag) => {
    setOpen(flag);
  };

  const menu = (
    <Menu style={{marginTop:"-25px"}}
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
          icon: <SettingTwoTone />,
        },

        {
          label:'Help',
          key:'/help',
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
        <Space style={{color:"black",float:"right"}}>
        <h3>Hi {name}</h3>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};



export const  selectUser=(state)=>(state.user.user)
export default Drop;