import {Form,Checkbox,Input,Select, Button} from "antd";
import React from "react";
import {useState,useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import './Login.css'
import { Info } from "@mui/icons-material";



function Login() {
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");


  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('user-info')){
      navigate.push("/dashboard ")
    }

    }, [])

//==========================login api=====================================
  async function login()
   { 
  
    console.warn(username,password)
    let item=(username,password);

    let result= await fetch("http://localhost:1999/user/login",{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json"

      },
      body:JSON.stringify(item)
     }).then((response)=>{
      response.json().then((result));

     })
     result = await result.json();
     localStorage.setItem("user-info",JSON.stringify(result))
     navigate.push("/dashboard")
     console.log(result)

   }
//==========================login api=====================================

    return (
      <>
      <div className="back-bg">
          <img src="ebs.png" height="80" weight="100"  >
           

          </img>
      </div>
      
      <div className="App" >
        
      
          <Form autoComplete="off" 

            labelCol={{span:7}}  
            wrapperCol={{span:20}}>
              <Form.Item 
              placeholder="user" 
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Please enter user"
                },
                {whitespace: true},
                {min:6},
    
                ]}
                hasFeedback
          >
              <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Item>


              <Form.Item
                placeholder="password"
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
                hasFeedback
  
              >
  
              <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Item>
  
                 
              <Form.Item wrapperCol={{span:24}}>
              <Link to ='/dashboard'>
              <Button block type="primary" onClick={login} >Login</Button>
              </Link>
  
              </Form.Item>
  
          </Form>
  
      

      </div>

     
      </>
      
    );
  }

  export default Login;