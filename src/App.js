import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Attendance from './pages/Attendance.jsx';
import Leave from './pages/Leave.jsx';
import Employees from './pages/Employees.jsx';
import Sidebar from './components/Sidebar.jsx';
import Login from './pages/Login.js';





const App = () => {
  return (
     
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
   
  );
};

export default App;
