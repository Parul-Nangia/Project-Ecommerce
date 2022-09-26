import { Card } from 'antd';
import axios from 'axios';
import React from 'react';
import Navbar from './Navbar';
import { useEffect,useState } from 'react';
import Charts from './Charts';
import Header from './Header';
import Sidebar from './Sidebar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import './Dashboard.css';




let main1 = {
  flex: "1" ,
  height: "150px", 
  margin: "30px", 
  textAlign: "center", 
  padding:"20px", 
  background : "#48D1CC",
  borderRadius:"30px",
  fontWeight: "bold",
  fontSize: "large"

}
let main2 = {
  flex: "1" ,
  height: "150px", 
  margin: "30px",
  textAlign: "center", 
  padding:"20px", 
  background : "#87CEEB",
  borderRadius:"30px",
  fontWeight: "bold",
  fontSize: "large"
  

}
let main3 = {
  flex: "1" ,
  height: "150px", 
  margin: "30px", 
  textAlign: "center", 
  padding:"20px", 
  backgroundColor : "#8FBC8F",
  borderRadius:"30px",
  fontWeight: "bold",
  fontSize: "large"

}



const Dashboard = () => {


  return (
    <>

    <Sidebar>

      <Header />
    
    
          <div style={{ display : "flex", justifyContent : "space-between"}}> 
            <Card style={main1}>LEAVE TAKEN</Card>
            <Card style={main2} >PENDING LEAVES</Card>
            <Card style={main3}>UPCOMING HOLIDAYS</Card>
          
          </div>
          <div className="main_cards">
            <div className="card">
              <i className="fa fa-user-o fa-2x text-lightblue"><AccountCircleIcon /></i>
              <div className="card_inner">
                <p className="text-primary-p">User</p>
                <span className="font-bold text-title">567</span>

              </div>

            </div>
            <div className="card">
              <i className="fa fa-calendar fa-2x text-red"><CalendarMonthIcon /></i>
              <div className="card_inner">
                <p className="text-primary-p">Leaves Allowed</p>
                <span className="'font-bold text-title">2</span>
              </div>
            </div>

            <div className="card">
              <i className="fa fa-video-camera fa-2x text-yellow"></i>
              <div className="card_inner">
                <p className="text-primary-p">hsavhgsvad</p>
                <span className="font-bold text-title">349</span>
              </div>
            </div>

            <div className="card">
              <i className="fa fa-thumbs-up fa-2x text-green"></i>
              <div className="card_inner">
                <p className="text-primary-p">ergdfgdg</p>
                <span className="font-bold text-title">675</span>
              </div>
            </div>

        
            <div className="charts">
              <div className="charts_left">
                <div className="charts_left_title">
                  <div>
                    <h1>Daily Reports</h1>
                  </div>
                  <i className="fa fa-usd"></i>
                </div>
              </div>
              <Charts />
            </div>
            <div className="charts_right_cards">
              <div className="card1">
                <h1>income</h1>
                <p>45600$</p>
              </div>
              <div className="card2">
                <h1>nxvchjsvcjh</h1>
                <p>hello</p>
              </div>
              <div className="card3">
                <h1>Users</h1>
                <p>4560</p>
              </div>
              <div className="card4">
                <h1>jhdhjvdh</h1>
                <p>45</p>
              </div>
            </div>
          </div> 

  </Sidebar> 
    
    </>
  );
};

export default Dashboard