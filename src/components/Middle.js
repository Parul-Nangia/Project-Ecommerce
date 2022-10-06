import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Attendance from '../components/Attendance';
import Leave from '../components/Leave';
import Employees from '../components/Employees';
import Edit from '../components/Edit';
import View from '../components/View';
import LeaveForm from '../components/LeaveForm';
import LeaveCalendar from '../components/LeaveCalendar';

import { Breadcrumb, Layout } from 'antd';
const { Content } = Layout;

const Middle = () => {
    return (


        <Layout
            style={{
                padding: '0 24px 24px',
                width: '1200px',

            }}
        >
            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item><a href="/dashboard">Dashboard</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/attendance">Attendance</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/employees">Employees</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/leave">Leave</a></Breadcrumb.Item>

            </Breadcrumb>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                <Routes>

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/leave" element={<Leave />} />
                    <Route path="/employees" element={<Employees />} />

                    <Route path="/edit/:_id" element={<Edit />} />
                    <Route path="/view/:_id" element={<View />} />
                    <Route path="/leaveform" element={<LeaveForm />} />
                    <Route path="/leavecalendar" element={<LeaveCalendar />} />

                </Routes>
            </Content>
        </Layout>


    )
};



export default Middle;

