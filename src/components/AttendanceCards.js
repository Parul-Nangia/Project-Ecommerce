import React from 'react'
import { Card } from 'antd';

let a1 = {
    flex: "1" ,
    height: "100px", 
    margin: "20px", 
    textAlign: "center", 
    padding:"10px", 
    background : "skyblue",
    borderRadius:"20px",
    fontWeight: "bold",
    fontSize: "large"
  
  }
  let a2 = {
    flex: "1" ,
    height: "100px", 
    margin: "20px",
    textAlign: "center", 
    padding:"10px", 
    background :  "skyblue",
    borderRadius:"20px",
    fontWeight: "bold",
    fontSize: "large"
    
  
  }
  let a3 = {
    flex: "1" ,
    height: "100px", 
    margin: "20px", 
    textAlign: "center", 
    padding:"10px", 
    backgroundColor :  "skyblue",
    borderRadius:"20px",
    fontWeight: "bold",
    fontSize: "large"
  
  }

const AttendanceCards = () => {
  return (
    <div style={{ display : 'flex', justifyContent: "space-between"}}>


        <Card style={a1}> Timesheet </Card>
        <Card style={a2}>Statistics </Card>
        <Card style={a3}>Today Activity</Card>
        
        </div>
    
  )
}

export default AttendanceCards;
