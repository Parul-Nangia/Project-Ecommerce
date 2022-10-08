import React from 'react';
import Top from '../components/Top';
import Sidebar from '../components/Sidebar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Attendance from '../components/Attendance';
import Leave from '../components/Leave';
import Employees from '../components/Employees';

// import Edit from '../components/Edit';
// import View from '../components/View';
// import LeaveForm from '../components/LeaveForm';
// import LeaveCalendar from '../components/LeaveCalendar';








const Routing = () => {


    return (
        <>
            {/* <div>
                <Top />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Sidebar />
                </div>
            </div> */}


          
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/leave" element={<Leave />} />
                    <Route path="/employees" element={<Employees />} />

                </Routes>

   



        </>

    )
}

export default Routing;