import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Attendance from '../components/Attendance';
import Leave from '../components/Leave';
import Employees from '../components/Employees';
import Login from '../components/Login';
import Edit from '../components/Edit';
import View from '../components/View';

// import Navbar from '../components/Navbar';






const Routing = () => {
    return <>
        
            
        <BrowserRouter>
       
        
                <Routes>
                    <Route path="/" element={<Login/>}/>                    
        
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/attendance" element={<Attendance/>}/>
                    <Route path="/leave" element={<Leave/>}/> 

                    <Route path="/employees" element={<Employees/>}/> 
                    <Route path="/edit/:_id" element={<Edit/>}/>
                    <Route path="/view/:_id" element={<View/>}/>
                  
                </Routes>
          
           
        </BrowserRouter>
    </>
};

export default Routing;