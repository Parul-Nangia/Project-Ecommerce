import React from 'react'
import { Menu } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import {UnorderedListOutlined } from "@ant-design/icons"
  
 import { useNavigate } from 'react-router-dom'


const MainSider = () => {
  const navigate = useNavigate()
  return (
    <div style={{ display: "flex" , flexDirections:"row"}}>
      <Menu 
     onClick={({key}) =>{
      navigate(key);
     }}
              items={[
              { label: "Dashboard" , key:"/" , icon:<UnorderedListOutlined />},
              { label: "Leave" , key:"/leave" , icon:<UnorderedListOutlined />},
              { label: "Attendance" , key:"/attendance" ,icon:<UnorderedListOutlined />},
              { label: "Employer" , key:"/employer" , icon: <UnorderedListOutlined />},
        
      ]}

      ></Menu>
      
    </div>
  )
}

export default MainSider;







