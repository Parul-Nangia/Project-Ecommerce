import {Form,Checkbox,Input,Select, Button} from "antd";
import React from "react";




function Login() {
    return (
      <div className="App">
        <header className="App-header">
          <Form autoComplete="off" 
          labelCol={{span:10}} 
          wrapperCol={{span:14}}>
            <Form.Item 
            name="username" 
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter username"
  
                
                
              },
              {whitespace: true},
              {min:9},
  
              ]}
              hasFeedback
          >
              <Input placeholder="Type Username"/>
              </Form.Item>
  
  
              <Form.Item
                name="email" 
                label="Email" 
                rules={[
                {
                  required: true,
                  message:"Please enter your email!",
                },
                {type:"email",message:"Please enter valid email !"},
                
                ]}
                hasFeedback
  
              >
              <Input placeholder="Type Your Email"/>
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
  
              <Input.Password placeholder="Type Your Password"/>
              </Form.Item>
  
              <Form.Item 
                name="confirm password" 
                label="Confirm Password"
                rules={[
                  {
                    required: true,
                  },
                  ({getFieldValue})=>({
                    validator(_,value){
                      if(!value || getFieldValue('password')== value){
                        return Promise.resolve()
                      }
                      return Promise.reject("The password you enter doesn't match.")
                    }
  
                  })
                ]}
                hasFeedback
              >
              <Input.Password placeholder="Confirm Your Password"/>
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
              

              }}
  
              </Form.Item>
               
  
  
  
  
            
  
  
  
  
  
          </Form>
  
        </header>
      
      
      
      
      </div>
      
    );
  }

  export default Login;