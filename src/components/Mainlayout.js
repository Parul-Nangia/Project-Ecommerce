import React from 'react'
import { Layout } from 'antd';
import Login from './Login';
import Mainheader from './Mainheader';
import MainSider from './MainSider';
import Leave from './Leave';
import Dashboard from './Dashboard';
import Attendance from './Attendance';
import Employer from './Employer';
import RouterComponent from './RouterComponent';
const { Footer, Content} = Layout;

const Mainlayout = () => {
  return(
    <>
    <Login/>

    <Layout style={{height:"100vh" }}>
    <Mainheader />
   
      <Layout>
      <MainSider/> 
      <Dashboard/>
      <Attendance/>
      <Employer/>
         <Content>
     <RouterComponent/>
         </Content>
     <Leave/>
   
        <Footer></Footer>

      </Layout>
    </Layout>
    : 
    <Layout>
    
    </Layout>
    }
  </>
);
}

export default Mainlayout;
