import React from 'react'
import { Layout} from 'antd';
import Mainheader from './Mainheader';
const {  Footer, Sider, Content } = Layout;


const Mainlayout = () => {
  return (
    <>


    <Layout style={{height:"100vh" }}>
      <Sider>Sider</Sider>
      <Layout>
       <Mainheader />
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </>
);


      

  
}

export default Mainlayout;
