import { makeStyles} from "@material-ui/core";
import React from 'react';
import { useState, useEffect } from "react";
import Sidebar from './Sidebar';
import { Table } from 'antd';
import Navbar from './Navbar';
import { Button, Modal, Form, Input, Row} from 'antd';
import { LockOutlined, UserOutlined , MailOutlined ,PhoneOutlined ,UserSwitchOutlined, CalendarOutlined ,StarOutlined ,EyeOutlined ,EditOutlined,DeleteOutlined} from '@ant-design/icons';


const useStyles = makeStyles({

  frmItem: {
    padding:"10px",
    width:"50vh"
       
  },
headingColor: {
  backgroundColor: "#87CEEB",
  color: "#000000",
  marginBottom: "20px",
  textAlign: "center",
  fontWeight: "bold"

},
addEmpColor: {
  backgroundColor: "#87CEEB",
  textAlign: "center",
  marginBottom: "5px",
  color: "#000000",
  marginTop: "30px",
  fontWeight: "bold",
  paddingTop: "1px"


},
empListColor: {
  backgroundColor: "#87CEEB",
  color: "#000000",
  textAlign: "center",
  marginTop: "30px",
  fontWeight: "bold"
},
tableHeadCell: {
  color: "#000000",
  fontWeight: "bold",
  fontSize: 16,
  
},
empListColor: {
  backgroundColor: "#87CEEB",
  color: "#000000",
  textAlign: "center",
  marginTop: "30px",
  fontWeight: "bold"
},
tableHeadCell: {
  color: "#000000",
  fontWeight: "bold",
  fontSize: 16
},
btnCenter: {
  padding:"10px",
  width:"50vh",
  height:"60px",
  fontWeight:"bold",
  backgroundColor:"#FF4500",
  "&:hover": {
    borderRadius: 4,
    backgroundColor: "white",
    color:"black"
  },
},
})




const Employees = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const classes = useStyles();
  const [state, setState] = useState([]);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
 
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
 
 
  
//================================================= START employee delete (GET API==================================================
  
  function deleteEmployee(_id) {
    if (window.confirm("Are you sure you want to to delete", _id)) {
      fetch(`http://localhost:1999/employee/${_id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      
    
      console.log("Employee Deleted", _id)
    }
  }

 // //================================================= START employee post (POST API)
function saveEmployee() {
    console.warn({ name, email, contact, gender });
    let data = { name, email, contact, gender }

  
  

    fetch("http://localhost:1999/employee", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((Employee) => {
      console.warn("result", Employee);
      window.alert("New Employee added successfully")
      
    })
    
  }
 
 // //================================================= END employee post (POST API)
  
// //================================================= START employee put (PUT API)



 function editEmployee(_id) {
  console.warn({ name, email, contact, gender });
  let data = { name, email, contact, gender }




  fetch(`http://localhost:1999/employee/${_id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((Employee) => {
    console.warn("result", Employee);
    window.alert("New Employee added successfully")
    
  })
  
}

// //================================================= END employee put (PUT API)


// //================================================= START employee GET (GET API)
  useEffect(() => {
    employeelist();

  }, [])

    const employeelist = () => {
      fetch ("http://localhost:1999/employee").then((response) => {
        return response.json();
      }).then((data) => {
        let emp = data.employeeData
        setState(emp);
      
        console.log("response",emp);
        
        })
        
      }
      console.log(state,"hh")
      
        // //================================================= END employee GET (GET API)

        


     const columns = [

    {
       title: "Id",
       dataIndex: "_id",
     },
    {
       title: "Name",
       dataIndex: "name",
     },
      {
       title: "Email",
       dataIndex: "email",
     },
      {
       title: "Contact",
       dataIndex: "contact",
     },
      {
       title: "Gender",
       dataIndex: "gender",
     },
   
  
      {
        title: "Actions",
        render:(_id) => {
          return (
            <>
              <EyeOutlined  onClick= {()=>{employeelist(_id)}}/>
              <EditOutlined onClick= {()=>{editEmployee(_id)}}/>
              <DeleteOutlined onClick= {()=>{deleteEmployee(_id)}}/>
            </>
          );
          }
      }
     
  ];



  



  
  
   return (

    <>
    <Navbar />
   

    <Sidebar />
  
    <Button style ={{float:"right", margin:"50px"}}onClick={showModal}> Add New Employee</Button>
      <Modal title="Employee Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    
        <Row justify="center" style={{ padding: "10%" }}>
    

        <Form >
        

          <Form.Item rules={[{ required: true }]} >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Employee name" className={classes.frmItem}  onChange={(e) => { setName(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]} >
            <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" className={classes.frmItem}  onChange={(e) => { setPassword(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true}]} >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email Address" className={classes.frmItem}  onChange={(e) => { setEmail(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input type="password" prefix={<PhoneOutlined  className="site-form-item-icon" />} placeholder="Contact" className={classes.frmItem} onChange={(e) => { setContact(e.target.value) }}/>
          </Form.Item>

          <Form.Item rules={[{ required: true }]}>
            <Input type="password" prefix={<UserSwitchOutlined  className="site-form-item-icon" />} placeholder="Gender" className={classes.frmItem} onChange={(e) => { setGender(e.target.value) }}/>
          </Form.Item>



      

          <Form.Item>
            <Button htmlType="submit" className={classes.btnCenter} onClick={saveEmployee}>Add</Button><br />
         
          </Form.Item>
        </Form>
      </Row>
  
      </Modal>

     </Sidebar>
    

   
        
     </>
     );
}
    

 export default Employees;