import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login  from './components/Login.js';
import Leave from './components/Leave.jsx';
import Dashboard from './components/Dashboard.jsx';
import Attendance from './components/Attendance.jsx';
import Employees from './components/Employees.jsx';
import Sidebar from './components/Sidebar.jsx';

const App = () => {
  return (
     
     <Sidebar>
          <Routes>
            <Route path="/"element={<Login/>}/>
            <Route path="/dashboard"element={<Dashboard/>}/>
            <Route path="/attendance"element={<Attendance/>}/>
            <Route path="/employees"element={<Employees/>}/>
            <Route path="/leave"element={<Leave/>}/>

          </Routes>
     </Sidebar>
  )
}
     
     export default App;
