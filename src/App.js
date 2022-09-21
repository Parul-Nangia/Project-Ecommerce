import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

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
