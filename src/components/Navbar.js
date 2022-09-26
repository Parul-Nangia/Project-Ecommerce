import React from 'react';
import {Layout } from 'antd';
import {Menu } from 'antd';



const { Header } = Layout;
const items1 = ['Logout'].map((key) => ({
  key,
  label: `${key}`,
}));




const Navbar = () => {
  return(

  <Layout>
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" items={items1} />
        
    </Header>
  </Layout>



  )
}

export default Navbar