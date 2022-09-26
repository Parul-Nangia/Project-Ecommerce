import { Card } from 'antd';
import axios from 'axios';
import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from './Navbar';



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
     
    
        <div style={{ display : "flex", justifyContent : "space-between"}}> 
          <Card style={main1}>LEAVE TAKEN</Card>
          <Card style={main2} >PENDING LEAVES</Card>
          <Card style={main3}>UPCOMING HOLIDAYS</Card>
        
        </div>
        
      </Sidebar>
      
    </>
  );
};

export default Dashboard
