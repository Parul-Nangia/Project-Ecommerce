import React from 'react';
// import { BrowserRouter } from 'react-router-dom/dist';
import Sidebar from '../components/Sidebar';
// import Login from './pages/Login.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Attendance from '../components/Attendance';
import Leave from '../components/Leave';
import Employees from '../components/Employees';
import Login from '../components/Login';
import { Header } from 'antd/lib/layout/layout';
import Header from './components/Header';



const Layout = () => {
    return <>
        <BrowserRouter>
        <Header>
            <Sidebar>
                <Routes>
                    <Route path="/"element={<Login/>}/>
                    <Route path="/dashboard"element={<Dashboard/>}/>
                    <Route path="/attendance"element={<Attendance/>}/>
                    <Route path="/employees"element={<Employees/>}/>
                    <Route path="/leave"element={<Leave/>}/>

                </Routes>
            </Sidebar>
        </Header>
        </BrowserRouter>
    </>;
};

export default Layout;