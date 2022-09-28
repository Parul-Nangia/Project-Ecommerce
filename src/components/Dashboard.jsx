import React from 'react';
import Navbar from './Navbar';
import Chart from './Chart';
import Sidebar from './Sidebar';
import './Dashboard.css';
import Widget from './Widget'
import './widget.css'
import Featured from "./Featured"
import './chart.css'



const Dashboard = () => {


  return (
    <>
    <Navbar />
    <Sidebar>
    <div className="dashboard">
      
          <div className="dashboardContainer">
          
            <div className="widgets" style={{display:"flex"}}>
              <Widget type="user" />
              <Widget type="leave" />
              <Widget type="holiday" />
              <Widget type="status" />
            </div>
            <div className="charts">
              <Featured/>
              <Chart/>
            </div>
          </div>
        </div>
    </Sidebar>
    </>
    
    )  
  }

export default Dashboard