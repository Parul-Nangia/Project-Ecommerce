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



const Layout = () => {
    return <>
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/"element={<Login/>}/>
                    <Route path="/dashboard"element={<Dashboard/>}/>
                    <Route path="/attendance"element={<Attendance/>}/>
                    <Route path="/employees"element={<Employees/>}/>
                    <Route path="/leave"element={<Leave/>}/>

                </Routes>
            </Sidebar>
        </BrowserRouter>
    </>;
};

export default Layout;