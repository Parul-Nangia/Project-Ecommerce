import React, { useState } from 'react';
import { Layout } from 'antd';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
const { Header } = Layout;




const Top = () => {
    return (
        <>
            <div>
                <Layout>
                    <Header className="header" style={{backgroundColor:"#d22d2d"}}>
                        <div className="logo" />
                        <Menu mode="horizontal" className="Headermenu">
                            <Menu.Item key="1">Home</Menu.Item>    
                        </Menu>
                    </Header>
                </Layout>
            </div>
        </>

    )


    // <Layout>
    //   <div className='Navbar'>
    //     <div className='leftSide'>
    //         <div className="links" id={showLinks ? "hidden":""}>
    //         {/* <a href="/dashboard">Home</a> */}
    //         <a href="">Contact</a>
    //         <a href="/">LogOut</a>
    //         </div>
    //         <div className="Notification">
    //           <NotificationsActiveIcon />
    //           </div>
    //         <button onClick={()=>setShowLinks(!showLinks)}>
    //           {" "}
    //           <ReorderIcon />
    //           </button>

    //     </div>
    //     <div className='rightSide'>
    //       <input type="text" placeholder="Search..... "/>
    //       <button>
    //         <SearchIcon />
    //         </button>
    //     </div>
    //   </div>
    // </Layout>




}

export default Top