
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
    // const { Option } = Select;


const LeaveForm = () => {
  const url = "http://localhost:1999/leave"

  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
 

    const [data, setData] = useState({
      EmployeeName: "",
      SupervisorName: "",
      Department: "",
      LeaveType: "",
      LeaveDate: "",
      ReturnDate: "",
      TotalHoursRequested: "",
      TotalDaysRequested: ""
    })
    
    const Submit = (e)=>{
      console.log("dh")
      console.log(e,"kjfjf")
       e.preventDefault();
       axios.post(url,{
        EmployeeName:data.EmployeeName,
        SupervisorName:data.SupervisorName,
        Department:data.Department,
        LeaveType:data.LeaveType,
        Leavedate:data.LeaveDate,
        Returndate:data.ReturnDate,
        TotalHoursRequested:parseInt(data.TotalHoursRequested),
        TotalDaysRequested:parseInt(data.TotalDaysRequested)
       })
       .then(res => {
          console.log(res.data)
       })
    }
    
     function handle(e) {
      const newdata={...data}
      newdata[e.target.id] = e.target.value
      setData(newdata)
      console.log(newdata)

     }

    return (
      <div>
     <Form
    labelCol={{
      span: 4,
    }}
    wrapperCol={{
      span: 14,
    }}
    layout="horizontal"
    initialValues={{
      size: componentSize,
    }}
    onValuesChange={onFormLayoutChange}
    size={componentSize}
  >
  

  

    <Form.Item label="EmployeeName"> 
      
      <Input onChange = {(e)=> handle(e)} value= {data.EmployeeName}  id="EmployeeName" />
    </Form.Item>
      
      <Form.Item label="SupervisorName">
           
      <Input onChange = {(e)=> handle(e)} value= {data.SupervisorName }  id="SupervisorName"/>
      </Form.Item>

      <Form.Item label="Department" > 
         
      <Input onChange = {(e)=> handle(e)}  value= {data.Department} id="Department"/>
      </Form.Item>
     
      
      <Form.Item label="LeaveType" >
           
       <Input onChange = {(e)=> handle(e)}  value= {data.LeaveType} id="LeaveType"/>
       </Form.Item>
    

      <Form.Item label="LeaveDate" > 
      <Input onChange = {(e)=> handle(e)} value= {data.LeaveDate} id="LeaveDate" type="calendar"/> 
       
      </Form.Item>
      <Form.Item label="ReturnDate" >
      <Input onChange = {(e)=> handle(e)} value= {data.ReturnDate} id="ReturnDate" type="calendar"/>
        
      </Form.Item>

      <Form.Item label="TotalHoursRequested" >
      <Input onChange = {(e)=> handle(e)} value= {data.TotalHoursRequested} id="TotalHoursRequested" type="number" />
        
      </Form.Item>

      <Form.Item label="TotalDaysRequested">
      <Input onChange = {(e)=> handle(e)}  value= {data.TotalDaysRequested}  id="TotalDaysRequested"  type="number"  />
        
      </Form.Item>
    
     {/* <Button onclick= {(e)=> Submit(data)}> Submit </Button> */}
     <Button onClick={Submit}>Submit</Button>

     </Form>
     </div>
     
  );
}
      
      export default LeaveForm;
