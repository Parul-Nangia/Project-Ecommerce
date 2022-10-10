import { SearchOutlined } from '@ant-design/icons';
import { Button, Tooltip, message } from 'antd';
import React, { useState } from 'react';
import { Layout } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import 'antd/dist/antd.css';
import { useNavigate } from 'react-router-dom';
import Drop from './Drop.js';
const { Header } = Layout;

const Top = () => {
    let user = JSON.parse(localStorage.getItem('user-info'))
    // const token = localStorage.getItem('access_token1');

    const navigate = useNavigate();
    function logOut() {
        localStorage.clear()
        navigate("/")
        // window.location.reload(false);
    }

    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };

    const menu = (

        <Menu
            onClick={handleMenuClick}
            items={[
                {
                    label: '1st menu item',
                    key: '1',
                    icon: <UserOutlined />,
                },
                {
                    label: '2nd menu item',
                    key: '2',
                    icon: <UserOutlined />,
                },
                {
                    label: '3rd menu item',
                    key: '3',
                    icon: <UserOutlined />,
                },
            ]}
        />

    );


    return (
        <>
            <div>
                <Layout>
                    <Header className="header" style={{ backgroundColor: "#d22d2d" }}>
                        <div className="logo" />
                        <Menu mode="horizontal" className="Headermenu">
                            <Menu.Item key="1">Ebullient Soft</Menu.Item>
                            <div className='tool' style={{ display: "flex", marginTop: "2px", float: "right", marginLeft: "80%" }}>
                                <Drop />


                                {/* <Button type="primary" onClick={logOut}>
                                Logout
                                </Button> */}
                            </div>
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