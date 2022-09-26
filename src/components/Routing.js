import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Attendance from './Attendance';
import Leave from './Leave';
import Employees from './Employees';
import Login from './Login';
import Edit from './Edit';


// import Navbar from '../components/Navbar';






const Routing = () => {
    return <>
        
            
        <BrowserRouter>
       
        
                <Routes>
                    <Route path="/" element={<Login/>}/>                    
        
                    <Route path="/dashboard"element={<Dashboard/>}/>
                    <Route path="/attendance"element={<Attendance/>}/>
                    <Route path="/leave"element={<Leave/>}/> 

                    <Route path="/employees"element={<Employees/>}/> 
                    <Route path="/edit/:_id"element={<Edit/>}/>
                  

                </Routes>
          
           
        </BrowserRouter>
    </>
};

export default Routing;