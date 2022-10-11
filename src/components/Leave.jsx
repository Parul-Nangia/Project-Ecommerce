import React, { useState } from 'react'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import Top from '../components/Top';
import Sidebar from '../components/Sidebar';
import Middle from '../components/Middle';
import { Layout } from 'antd';
const { Content } = Layout;




const Leave = (props) => {
  const navigate = useNavigate();
  const [size, setSize] = useState('default');

  const [view, setView] = useState(false);

  return (

    <>
      <Layout>
        <Top />
        <Layout>
          <Sidebar />

          <Layout style={{ padding: '0 24px 24px', }} >
            <Middle />
            <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280, }} >

              <div>

                <LeaveCards />
                <Link to="/leaveform"></Link>
                <br />
                <Button style={{ background: "MediumSeaGreen" }} type="primary" size={size} onClick={() => navigate('/leaveform')}>Apply Leave</Button>


                <h1>{view}</h1>
                <div>
                  <Button type="dashed" size={size} onClick={() => setView(!view)}>CalendarView</Button>

                  <Button type="dashed" size={size} onClick={() => setView(!view)}>ListView</Button>
                </div>
                <br />
                {view ? <LeaveTable /> : <LeaveCalendar />}
              </div>

            </Content>
          </Layout>
        </Layout>
      </Layout>



    </>
  );
};

export default Leave;