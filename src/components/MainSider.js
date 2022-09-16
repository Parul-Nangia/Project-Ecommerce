import React from 'react'
import { Menu } from 'antd'
import Sider from 'antd/lib/layout/Sider'
import {UnorderedListOutlined } from "@ant-design/icons"


const MainSider = () => {
  return (
    <div style={{ display: "flex" , flexDirections:"row"}}>
      <Menu 
     
      items={[
        { label: "Home" , key:"/" , icon:<UnorderedListOutlined />},
        { label: "Dashboard" , key:"/dashboard" , icon:<UnorderedListOutlined />},
        { label: "Leave" , key:"/leave" , icon:<UnorderedListOutlined />},
        { label: "Attendance" , key:"/attendance" ,icon:<UnorderedListOutlined />},
        { label: "Document Workflow" , key:"/documentworkflow",icon: <UnorderedListOutlined />},
        { label: "Employer" , key:"/emloyer" , icon: <UnorderedListOutlined />},
        
      ]}

      ></Menu>
      
    </div>
  )
}

export default MainSider







