import React, {useEffect, useState } from 'react'
import LeaveCards from '../components/LeaveCards';
import LeaveTable from '../components/LeaveTable';
import LeaveCalendar from '../components/LeaveCalendar';
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'antd';
import jwt_decode from 'jwt-decode';
import Error from '../components/Error';





const Leave = (props) => {


  const[view,setView]=useState(false)
  const[name,setName]=useState("");
  
  // useEffect(() => {
  //   userData();

  // }, [])

  

  
  // const userData = ()=> {
  //   const token = localStorage.getItem("access_token1");
  //   console.log("token from local storage:", token)
  //   // let token = token;
  //   var decoded = jwt_decode(token);
  //   console.log("Decoded token data",decoded);
  //   setName(decoded)
  // }

  // if (name.role === "admin"){
  //   console.log("my role is " ,name.role)
  //   return (

  //   <LeaveCards />
  // )
  // }
  // if(name.role==="employee"){
  //   return(
  //     <Error />
  //   )
  
  // }
  // else{
   
    
  // }
//   const navigate = useNavigate();
//   const [size, setSize] = useState('default');

//   const [view, setView] = useState(false);



  return (

    <>
    
                <LeaveCards />
                <br/>
                <Button onClick={() => {}}>Calendarview</Button>
                <Button onClick={() => {}}>Tableview</Button>

                view? <LeaveCalendar/>:<LeaveTable />
                
                

    </>
  );
};

export default Leave;