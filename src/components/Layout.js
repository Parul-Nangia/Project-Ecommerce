import React from 'react';
// import { BrowserRouter } from 'react-router-dom/dist';
// import Login from './pages/Login.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Attendance from '../components/Attendance';
import Leave from '../components/Leave';
import Employees from '../components/Employees';
import Login from '../components/Login';
import Edit from '../components/Edit';
import View from '../components/View';
import Sidebar from '../components/Sidebar';


const Layout = () => {
    return <>
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard"element={<Dashboard/>}/>
                    <Route path="/attendance"element={<Attendance/>}/>
                    <Route path="/leave"element={<Leave/>}/>                   
                    <Route path="/employees"element={<Employees/>}/> 

                    <Route path="view/:_id"element={<View/>}/>
                    {/* <Route path="employees/view"element={<View/>}/> */}

                    {/* <Route path="employees/edit"element={<Edit/>}/> */}
                    <Route path="edit/:_id"element={<Edit/>}/>

                </Routes>
            </Sidebar>
        </BrowserRouter>
    </>;
};

export default Layout;