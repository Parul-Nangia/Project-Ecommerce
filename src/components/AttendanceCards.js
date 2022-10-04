import React from 'react'
import { Card } from 'antd';

let a1 = {
    // flex: "1" ,
    height: "100px", 
    margin: "20px", 
    textAlign: "center", 
    padding:"10px", 
    background : "#FF4500",
    borderRadius:"20px",
    fontWeight: "bold",
    fontSize: "large",
    display:"flex",
  
  
  }
  let a2 = {
    // flex: "1" ,
    height: "100px", 
    margin: "20px",
    textAlign: "center", 
    padding:"10px", 
    background :  "#FF4500",
    borderRadius:"20px",
    fontWeight: "bold",
    fontSize: "large",
    display:"flex",
  
  }
  let a3 = {
    // flex: "1" ,
    height: "100px", 
    margin: "20px", 
    textAlign: "center", 
    padding:"10px", 
    backgroundColor :  "#FF4500",
    borderRadius:"20px",
    fontWeight: "bold",
    fontSize: "large",
    display:"flex",
  
  }

const AttendanceCards = () => {
  return (
    <div style={{ display : 'flex',justifyContent:"center",}}>


        <Card style={a1}>Timesheet</Card>
        <Card style={a2}>Statistics</Card>
        <Card style={a3}>Today Activity</Card>
        
        </div>
    
  )
}

export default AttendanceCards;
