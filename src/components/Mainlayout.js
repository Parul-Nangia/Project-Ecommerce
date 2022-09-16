import React from 'react'
import { Layout } from 'antd';
import Mainheader from './Mainheader';
import MainSider from './MainSider';
import RouterComponent from './RouterComponent';
const { Footer, Content} = Layout;



const Mainlayout = () => {
  
  return (
    <>



    <Layout style={{height:"100vh" }}>
    <Mainheader />
      <Layout>
      <MainSider/> 
     <Content>
<RouterComponent/>
     </Content>
   
        <Footer></Footer>
      </Layout>
    </Layout>
  </>
);
}


 


export default Mainlayout;
