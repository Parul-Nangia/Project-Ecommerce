import React from 'react';
import AttendanceCards from '../components/AttendanceCards';
import AttendanceTable from '../components/AttendanceTable';
import Top from '../components/Top';
import Sidebar from '../components/Sidebar';
import Middle from '../components/Middle';
import { Layout } from 'antd';
const { Content } = Layout;




const Attendance = () => {
  return (
    <>

      <Layout>
        <Top />
        <Layout>
          <Sidebar />

          <Layout style={{ padding: '0 24px 24px', }} >
            <Middle />
            <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280, }} >


              <AttendanceCards />
              <br />
              <AttendanceTable />


            </Content>
          </Layout>
        </Layout>
      </Layout>





    </>
  );
};

export default Attendance;
