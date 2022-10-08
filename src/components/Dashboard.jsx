
import React from 'react';
import DashboardCards from '../components/DashboardCards';
import Top from '../components/Top';
import Sidebar from '../components/Sidebar';
import Middle from '../components/Middle';
import { Layout } from 'antd';
const { Content } = Layout;




const Dashboard = () => {


  return (

    <>
      <Layout>
        <Top />
        <Layout>
          <Sidebar />

          <Layout style={{ padding: '0 24px 24px', }} >
            <Middle />    
            <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280, }} >

              <DashboardCards />

            </Content>
          </Layout>
        </Layout>
      </Layout>


    </>

  )
}

export default Dashboard