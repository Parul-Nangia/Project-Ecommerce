import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Attendance from './components/Attendance.jsx';
import Leave from './components/Leave.jsx';
import Employees from './components/Employees.jsx';
// import Sidebar from './components/Sidebar.jsx';
import Login from './components/Login.js';
import Sidebar from './components/Sidebar';
// import Header from './components/Header.js';







function App() {
  return (
     
      <BrowserRouter>
      <Sidebar>
       
        
        <Routes>
            {/* <Route path="/"element={<Login/>}/> */}
            <Route path="/dashboard"element={<Dashboard/>}/>
            <Route path="/attendance"element={<Attendance/>}/>
            <Route path="/employees"element={<Employees/>}/>
            <Route path="/leave"element={<Leave/>}/>
        </Routes>
<<<<<<< HEAD

      </Sidebar>

      
        


       
        
=======
>>>>>>> 5e6e0af9c8002522bb8861b1b40f7ad3c9241493
      </BrowserRouter>
   
  );
}


export default App;
