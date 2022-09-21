import {Form,Checkbox,Input,Select, Button} from "antd";
import React from "react";
import {useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Login.css'



function Login() {
  const[user,setUser]=useState('');
  const[password,setPassword]=useState('');
  console.log({user,password})

  const handleUser = (e) => {
    setUser(e.target.value)
  }


  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleApi = () => {
    console.log({user,password})
    axios.post('http://localhost:3001/user/login',{
      user: user,
      password: password
    })
    .then(result=>{
      console.log(result.data)
      alert('success')

    })

    .catch(error=>{
      console.log(error)
      alert('error')
    })


  }

    return (
      <body className="back-bg">
        <div className="Logo">
          <img src="ebs.png" height="150" weight="150"  >
           

          </img>
        </div>
      
      <div className="App" >
        {/* <header className="page"> */}
          
          <Form 
          autoComplete="off" 

          labelCol={{span:10}}  
          wrapperCol={{span:15}}>
            <Form.Item 
            name="user" 
            label="User"
            rules={[
              {
                required: true,
                message: "Please enter user"
  
                
                
              },
              {whitespace: true},
              {min:9},
  
              ]}
              hasFeedback
          >
              <Input placeholder="User" value={user} onChange={(e) => handleUser(e.target.value)} />
              </Form.Item>


              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
                hasFeedback
  
              >
  
              <Input.Password placeholder="Password" value={password} onChange={(e) => handlePassword(e.target.value)} />
              </Form.Item>
  
  
  
              <Form.Item 
                name="role" 
                label="Role">
              <Select placeholder="Select Your Role">
                <Select.Option value="hr">HR</Select.Option>
                <Select.Option value="staff">Staff</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
  
              </Select>
              </Form.Item>
  
  
              <Form.Item 
                name="Contact Us" 
                wrapperCol={{span:24}}>
              <Checkbox>For Any Query Contact to <a href="#">HR</a></Checkbox>
              </Form.Item>
  
              <Form.Item wrapperCol={{span:24}}>
              <Link to ='/dashboard'>
              <Button block type="primary" onClick={handleApi} >Login</Button>
              </Link>
  
              </Form.Item>
  
          </Form>
  
        {/* </header> */}

      </div>

      </body>
      
      
    );
  }

  export default Login;