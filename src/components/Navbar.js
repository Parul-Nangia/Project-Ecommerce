import React,{useState} from 'react';
import {Layout } from 'antd';
import {Menu } from 'antd';
import './navbar.css'
import ReorderIcon from '@mui/icons-material/Reorder';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Navbar() {
  
  const[showLinks,setShowLinks]=useState(false);

  return(

  <Layout>
    <div className='Navbar'>
      <div className='leftSide'>
          <div className="links" id={showLinks ? "hidden":""}>
          <a href="/dashboard">Home</a>
          <a href="">Contact</a>
          <a href="/">LogOut</a>
          </div>
          <div className="Notification">
            <NotificationsActiveIcon />
            </div>
          <button onClick={()=>setShowLinks(!showLinks)}>
            {" "}
            <ReorderIcon />
            </button>

      </div>
      <div className='rightSide'>
        <input type="text" placeholder="Search..... "/>
        <button>
          <SearchIcon />
          </button>
      </div>
    </div>
  </Layout>



  )
}

export default Navbar