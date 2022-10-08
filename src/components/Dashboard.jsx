
import React from 'react';
import Chart from './Chart';
// import Widget from './Widget'
// import './widget.css'
import Featured from "./Featured"
// import Sidebar from '../components/Sidebar'
import DashboardCards from '../components/DashboardCards';
import Top from '../components/Top';
import Sidebar from '../components/Sidebar';
import Middle from '../components/Middle';











const Dashboard = () => {


  return (

    <>
      <div>
        <Top />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Sidebar>
            
              <DashboardCards />
            
          </Sidebar>
        </div>
      </div>



    </>

  )
}

export default Dashboard