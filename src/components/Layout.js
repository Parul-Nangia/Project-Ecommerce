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
import LeaveForm from '../components/LeaveForm';
import LeaveCalendar from '../components/LeaveCalendar'




const Layout = () => {
    return <>
        <BrowserRouter>
            <Sidebar>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/dashboard"element={<Dashboard/>}/>
                    <Route path="/attendance"element={<Attendance/>}/>
                    <Route path="/leave"element={<Leave/>}/> 
                    <Route path="/leave"element={<Leave/>}/> 
                    <Route path="/leavecalendar"element={<LeaveCalendar/>}/> 
                    <Route path="/leaveform"element={<LeaveForm/>}/> 
                    <Route path="/employees"element={<Employees/>}/> 
                    


                    <Route path="employees/view/:id"element={<View/>}/>
                    <Route path="employees/view"element={<View/>}/>

                    <Route path="employees/edit"element={<Edit/>}/>
                    <Route path="employees/edit/:id"element={<Edit/>}/>

                </Routes>
            </Sidebar>
           
        </BrowserRouter>
    </>;
};

export default Layout;