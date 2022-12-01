import { Button, Form, Input, Row ,message} from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LoginNew = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    try {
      console.log("going forward");
      e.preventDefault();
      const show ={name,password}
      console.log(show,"fghdshjgdfkjgjdfg")
     
      const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, { name, password, } )
  //     .then(()=>{
  // message.success("Authorized ")
  
  //     });
      console.log(data,"dataaaa")
  axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;
  localStorage.setItem("access_token1", JSON.stringify(data.token));
  console.log(localStorage,"localStorage")
  window.location.reload();
  navigate("/dashboard");  
    } 
    catch (error) {
      if(name==="" && password===""){
        message.error("Fill your UserName and Password!!")
      }
      else{
     message.error("Incorrect password or UserName")
      }
    // message.open({
    //   type: 'error',
    //   content: 'unauthorized',
    //   duration: 5,
    //   style: {
    //     marginTop: '10vh',
    //   },
    // });
     
    }
   
  };

  return (
    <>
      <Row justify="center" style={{ padding: "10%", marginTop: "20px" }}>
        <Form style={{ width: "300px" }} 
         autoComplete="off"
         onFinish={submit}
         >
          <img className="logoimg" src="ebs.png" />

          <Form.Item
          name="ccccc"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="Password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type="password"
              prefix={<LockOutlined />}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" onClick={submit}  className="center-btn">
              Login
            </Button>
            <br />
          </Form.Item>
        </Form>
      </Row>
    </>
  );
};

export default LoginNew;










// import { Button, Form, Input, Row ,message} from "antd";
// import React, { useState,useEffect } from "react";
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";


// const LoginNew = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
// useEffect(()=>{
//   dataShow()
// })
// const dataShow =()=>{
//   axios.get(`${process.env.REACT_APP_BASE_URL}/user`).then((res)=>{
//     console.log(res,"Response")
//     console.log(res?.data?.userData,"Response")
//   })
// }
//   const submit = async (e) => {
//     try {
//       console.log("going forward");
//       e.preventDefault();
//       const show ={name,password}
//       console.log(show,"fghdshjgdfkjgjdfg")
     
//       const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, { name, password, } )
//   //     .then(()=>{
//   // message.success("Authorized ")
  
//   //     });
//       console.log(data,"dataaaa")
//   axios.defaults.headers.common["Authorization"] = `Bearer ${data["token"]}`;
//   localStorage.setItem("access_token1", JSON.stringify(data.token));
//   console.log(localStorage,"localStorage")
//   window.location.reload();
//   navigate("/dashboard");  
//     } 
//     catch (error) {
//      message.error("Unauthorized")
//     // message.open({
//     //   type: 'error',
//     //   content: 'unauthorized',
//     //   duration: 5,
//     //   style: {
//     //     marginTop: '10vh',
//     //   },
//     // });
     
//     }
   
//   };

//   return (
//     <>
//       <Row justify="center" style={{ padding: "10%", marginTop: "20px" }}>
//         <Form style={{ width: "300px" }} 
//          autoComplete="off"
//          onFinish={submit}
//          >
//           <img className="logoimg" src="ebs.png" />

//           <Form.Item
//           name="ccccc"
//             rules={[{ required: true, message: "Please input your Username!" }]}
//           >
//             <Input
//               prefix={<UserOutlined />}
//               placeholder="Username"
//               onChange={(e) => setName(e.target.value)}
//             />
//           </Form.Item>

//           <Form.Item
//             name="Password"
//             rules={[{ required: true, message: "Please input your Password!" }]}
//           >
//             <Input
//               type="password"
//               prefix={<LockOutlined />}
//               placeholder="Password"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button htmlType="submit"  className="center-btn">
//               Login
//             </Button>
//             <br />
//           </Form.Item>
//         </Form>
//       </Row>
//     </>
//   );
// };

// export default LoginNew;
