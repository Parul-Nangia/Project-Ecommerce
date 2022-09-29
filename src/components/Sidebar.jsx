
import React, { useState } from 'react';

import React from 'react';
import { useState } from 'react';
import './sidebar.css'



import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaCommentAlt,
    FaShoppingBag,

    FaThList,

 
    FaBeer 

}from "react-icons/fa";
import { 
    
    FcDataEncryption,
    FcFolder,
  
    FcDatabase,
    
 } from "react-icons/fc";
import { NavLink } from 'react-router-dom';
import { 
    FcAlarmClock, 
    FcBusinessman ,
    FcMenu,
    FcHome,
    FcInvite
} from "react-icons/fc";

const Sidebar = ({children}) => {

    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
    {

      path:"/dashboard",
      name:"Dashboard",
      icon:< FcHome/>


    },
    {

      path:"/attendance",
      name:"Attendance",
      icon:<FcAlarmClock/>

    },
    {
      
      path:"/employees",
      name:"Employees",
      icon:<FcBusinessman/>

    },
    {

      path:"/leave",
      name:"Leave",
      icon:<FcInvite/>

    }






   ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FcMenu onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );

  return (
    <div className="container">
       <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
           <div className="top_section">
               <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
               <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                   <FcDatabase onClick={toggle}/>
               </div>
           </div>
           {
               menuItem.map((item, index)=>(
                   <NavLink to={item.path} key={index} className="link" activeclassName="active">
                       <div className="icon">{item.icon}</div>
                       <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                   </NavLink>
               ))
           }
       </div>
       <main>{children}</main>
    </div>
);

};

export default Sidebar;