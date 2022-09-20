import React from 'react';
import { useState } from 'react';
import {

  FaRegChartBar,
  FaTh,
  FaThList,
  FaUserAlt,
  FaBars
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';




const Sidebar = ({children}) => {
  const[isOpen , setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const menuItem=[
    {

      path:"/dashboard",
      name:"Dashboard",
      icon:<FaTh/>

    },
    {

      path:"/attendance",
      name:"Attendance",
      icon:<FaUserAlt/>

    },
    {

      path:"/employees",
      name:"Employees",
      icon:<FaRegChartBar/>

    },
    {

      path:"/leave",
      name:"Leave",
      icon:<FaThList/>

    }

  ]

  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" :"50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" :"none" }} className="logo">Logo</h1>
          <div style={{ marginleft: isOpen ? "50px" :"0px" }} className="bars">
            <FaBars onClick={toggle}/>
          </div>
        </div>
        {
          menuItem.map((item, index)=>(
            <NavLink to={item.path} key={index} className="link" activeclassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? "block" :"none" }} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
        </div>
      <main>{children}</main>
      
    </div>
  );
};

export default Sidebar;