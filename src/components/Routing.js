import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
import Attendance from "../components/Attendance";
import Leave from "../components/Leave";
import Employees from "../components/Employees";
import Edit from "../components/Edit";
import View from "../components/View";
import LeaveForm from "../components/LeaveForm";
import LeaveCalendar from "../components/LeaveCalendar";
import Documentation from "../components/Documentation";
import Profile from "../components/Profile";
const Routing = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/employees" element={<Employees />}>
          
        </Route>
        <Route path="/edit/:_id" element={<Edit />} />
        <Route path="/view/:_id" element={<View />} />
        <Route path="/leaveform" element={<LeaveForm />} />

        <Route path="/leavecalendar" element={<LeaveCalendar />} />
        
        <Route path="/profile/:id" element={<Profile />} />

        <Route path="/documentation/:id" element={<Documentation />} />
      </Routes>
    </>
  );
};

export default Routing;
