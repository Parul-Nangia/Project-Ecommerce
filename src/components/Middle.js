import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Attendance from '../components/Attendance';
import Leave from '../components/Leave';
import Employees from '../components/Employees';
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
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>Attendance</Breadcrumb.Item>
                    <Breadcrumb.Item>Employees</Breadcrumb.Item>
                    <Breadcrumb.Item>Leave</Breadcrumb.Item>

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

                    </Routes>
                </Content>
            </Layout>

     
    )
};



export default Middle;

