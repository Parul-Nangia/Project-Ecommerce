import React from 'react'
import { Route , Routes } from "react-router-dom";

const RouterComponent = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<div>Home</div>}></Route>
      <Route path="/dashBoard" element={<div>DashBoard</div>}></Route>
      <Route path="/leave" element={<div>Leave</div>}></Route>
      <Route path="/attendance" element={<div>Attendance</div>}></Route>
      <Route path="/documentworkflow" element={<div>Document Workflow</div>}></Route>
      <Route path="/employer" element={<div>Employer</div>}></Route>
    </Routes>
    </div>
  )
}

export default RouterComponent
