import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login  from './components/Login.js';
import Leave from './components/Leave.jsx';
import Dashboard from './components/Dashboard.jsx';
import Attendance from './components/Attendance.jsx';
import Employees from './components/Employees.jsx';
import Sidebar from './components/Sidebar.jsx';


// import Header from './components/Header.js';
import Layout from './components/Layout';

function App() {
  return (
      <BrowserRouter>   
        <Routes>
            <Route path="/"element={<Login/>}/>
            <Route path="/dashboard"element={<Dashboard/>}/>
            <Route path="/attendance"element={<Attendance/>}/>
            <Route path="/employees"element={<Employees/>}/>
            <Route path="/leave"element={<Leave/>}/>
        </Routes>
      </BrowserRouter>
   
  );
}


export default App;
