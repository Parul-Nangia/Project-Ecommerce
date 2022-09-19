import React from 'react'
 import { Routes , Route, Link } from "react-router-dom";
// import Dashboard from './Dashboard';
// import Leave from './Leave';


const RouterComponent = () => {
   
  return (
    <>
      <Routes>
      <Route path="/" element={<div>Login</div>}></Route>
      <Route path="/dashboard" element={<div>Dashboard</div>}></Route>
      <Route path="/leave" element={<div>Leave</div>}></Route>
      <Route path="/attendance" element={<div>Attendance</div>}></Route>
      <Route path="/employer" element={<div>Employer</div>}></Route>
    </Routes>

    <Link to="/">Login</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/leave">Leave</Link>
    <Link to="/attendance">Attendance</Link>
    <Link to="/employer">Employer</Link>
    </>
  )
}

export default RouterComponent
