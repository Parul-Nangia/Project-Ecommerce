import {Form,Checkbox,Input,Select, Button} from "antd";
import React from "react";
import {useState} from 'react';
import axios from 'axios';





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
    axios.post('',{
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
      <div className="App">
        <header className="LOGIN PAGE">
          
          <Form 
          autoComplete="off" 
          labelCol={{span:10}}  
          wrapperCol={{span:14}}>
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
              <Input placeholder="Type User" value={user} onChange={handleUser}  />
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
  
              <Input.Password placeholder="Type Your Password" value={password} onChange={handlePassword} />
              </Form.Item>
  
  
  
              <Form.Item 
                name="role" 
                label="Role">
              <Select placeholder="Select Your Role">
                <Select.Option value="hr">HR</Select.Option>
                <Select.Option value="staff">Staff</Select.Option>
  
              </Select>
              </Form.Item>
  
  
              <Form.Item 
                name="agreement" 
                wrapperCol={{span:24}}>
              <Checkbox>Agree to Our <a href="#">Terms and Conditions Apply.</a></Checkbox>
              </Form.Item>
  
              <Form.Item wrapperCol={{span:24}}>
              <Button block type="primary" onClick={handleApi} >Login</Button>
  
              </Form.Item>
  
          </Form>
  
        </header>
      
      
      
      
      </div>
      
    );
  }

  export default Login;