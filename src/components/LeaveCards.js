import React from 'react'
import { Card } from 'antd';


let m1 = {
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
  let m2 = {
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
  let m3 = {
    flex: "1" ,
    height: "100px", 
    margin: "20px", 
    textAlign: "center", 
    padding:"10px", 
    backgroundColor : "skyblue",
    borderRadius:"20px",
    fontWeight: "bold",
    fontSize: "large"
  
  }

  let m4 = {
    flex: "1" ,
    height: "100px", 
    margin: "20px", 
    textAlign: "center", 
    padding:"10px", 
    backgroundColor : "skyblue",
    borderRadius:"20px",
    fontWeight: "bold",
    fontSize: "large"
  
  }
const LeaveCards = () => {
  return (
    
     <div style={{ display : 'flex', justifyContent: "space-between"}}>


        <Card style={m1}> Annual </Card>
        <Card style={m2}>Medical</Card>
        <Card style={m3}>Casual</Card>
        <Card style={m4}>Other </Card>
    
        </div>
    
  )
}

export default LeaveCards
