import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import Attendance from './pages/Attendance.jsx';
import Leave from './pages/Leave.jsx';
import Employees from './pages/Employees.jsx';
import Sidebar from './components/Sidebar.jsx';
import Login from './pages/Login.js';
// import Header from './components/Header.js';
=======
import Layout from './components/Layout';
>>>>>>> f5ecd5d66a2960b37bcdb6ac7b14785d92d37e36







function App() {
  return (
<<<<<<< HEAD
     
      <BrowserRouter>   
        
        <Routes>
    
            <Route path="/"element={<Login/>}/>
            <Route path="/dashboard"element={<Dashboard/>}/>
            <Route path="/attendance"element={<Attendance/>}/>
            <Route path="/employees"element={<Employees/>}/>
            <Route path="/leave"element={<Leave/>}/>
           
          
        </Routes>
        


       
        
      </BrowserRouter>
   
=======
      <>
        <Layout />
      </>
>>>>>>> f5ecd5d66a2960b37bcdb6ac7b14785d92d37e36
  );
}


export default App;
