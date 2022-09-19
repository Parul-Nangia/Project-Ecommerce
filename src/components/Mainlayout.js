<<<<<<< HEAD
import React from 'react'
import { Layout } from 'antd';
import Login from './Login';
import Mainheader from './Mainheader';
import MainSider from './MainSider';
import Leave from './Leave';
import Dashboard from './Dashboard';
import Attendance from './Attendance';
import RouterComponent from './RouterComponent';
const { Footer, Content} = Layout;
=======
import React, { useState } from 'react'
import { Button, Layout} from 'antd';
import Mainheader from './Mainheader';
import Login from './Login';
>>>>>>> b30bf2c943e79233f1d8b7776217955ae2de8bec

const {  Footer, Sider, Content } = Layout;


const Mainlayout = () => {
  const [isLogin, setIsLogin] = useState(0);
  
  const logout = () => {
    localStorage.removeItem("isLogin");
  }
  return (
    <>
<<<<<<< HEAD

    <Login/>

    <Layout style={{height:"100vh" }}>
    <Mainheader />
   
      <Layout>
      <MainSider/> 
      <Dashboard/>
      <Attendance/>
     <Content>
<RouterComponent/>
     </Content>
     <Leave/>
   
        <Footer></Footer>
=======
    {isLogin ? 
    <Layout style={{height:"100vh" }}>
      <Sider>Sider
        <Button onClick={logout}> Logout </Button>
      </Sider>
      <Layout>
       <Mainheader />

        <Content>Content</Content>
        <Footer>Footer</Footer>
>>>>>>> b30bf2c943e79233f1d8b7776217955ae2de8bec
      </Layout>
    </Layout>
    : 
    <Layout>
      <Login />
    </Layout>
    }
  </>
);
}

export default Mainlayout;
