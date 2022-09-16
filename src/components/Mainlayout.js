import React, { useState } from 'react'
import { Button, Layout} from 'antd';
import Mainheader from './Mainheader';
import Login from './Login';

const {  Footer, Sider, Content } = Layout;


const Mainlayout = () => {
  const [isLogin, setIsLogin] = useState(0);
  
  const logout = () => {
    localStorage.removeItem("isLogin");
  }
  return (
    <>
    {isLogin ? 
    <Layout style={{height:"100vh" }}>
      <Sider>Sider
        <Button onClick={logout}> Logout </Button>
      </Sider>
      <Layout>
       <Mainheader />

        <Content>Content</Content>
        <Footer>Footer</Footer>
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
