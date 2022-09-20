import {Form,Checkbox,Input,Select, Button} from "antd";
import React from "react"








function Login() {

//   const [username,setUsername]=useState("");
//   const [password,setPassword]=useState("");

//   const history = useHistory();
//   useEffect(() => {
//     if (localStorage.getItem('user-info')) {
//       history.push("/dashboard")
//     }
//   }, [])


//   async function login()
//   {
//     console.log(username,password)
//     let item={username,password};
//     let result = await fetch("http://localhost:3001/user/login",{
//       method:'POST',
//       headers:{
//         "Content-Type":"application/json",
//         "Accept":"application/json"
//       },
//       body:JSON.stringify(item)

//   });
//   result = await result.json();
//   localStorage.setItem("user-info",JSON.stringify(result))
//   history.push("/dashboard")

//   }


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
              <Button block type="primary" htmlType="submit">Login</Button>
  
              </Form.Item>
               
  
  
  
  
            
  
  
  
  
  
          </Form>
  
        </header>
      
      
      
      
      </div>
      
    );
  }

  export default Login;