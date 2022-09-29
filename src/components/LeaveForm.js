import React , {useState} from 'react'
import { Form, Input , Button , Row} from 'antd';
import axios from 'axios';
import { makeStyles } from "@material-ui/core";
import { useNavigate} from "react-router-dom"
const useStyles = makeStyles({

  frmItem: {
    padding:"10px",
    width:"50vh"
       
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
const LeaveForm = () => {
  const classes = useStyles();
  const navigate = useNavigate()
 
  const url = "http://localhost:1999/leave"
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
    
         function handleClick() {
          navigate("/dashboard")
           }
      




  return (
    <>
 
    <Row justify="center" style={{ padding: "10%" }}>

  <Form >


  <Form.Item rules={[{ required: true }]} >
    <Input onChange = {(e)=> handle(e)} value= {data.EmployeeName}  id="EmployeeName"  placeholder="Employee Name" className={classes.frmItem}  />
  </Form.Item>

  <Form.Item rules={[{ required: true }]} >
    <Input  onChange = {(e)=> handle(e)} value= {data.SupervisorName }  id="SupervisorName" placeholder="Supervisor Name" className={classes.frmItem}  />
  </Form.Item>

  <Form.Item rules={[{ required: true }]} >
    <Input  onChange = {(e)=> handle(e)}  value= {data.Department} id="Department"  placeholder="Department" className={classes.frmItem}  />
  </Form.Item>

  <Form.Item rules={[{ required: true }]}>
    <Input onChange = {(e)=> handle(e)}  value= {data.LeaveType} id="LeaveType" placeholder="Leave Type"  className={classes.frmItem} />
  </Form.Item>

  <Form.Item rules={[{ required: true }]}>
    <Input  onChange = {(e)=> handle(e)} value= {data.LeaveDate} id="LeaveDate" type="calendar" placeholder="Leave Date" className={classes.frmItem} />
  </Form.Item>

  <Form.Item rules={[{ required: true }]}>
    <Input  onChange = {(e)=> handle(e)} value= {data.ReturnDate} id="ReturnDate" type="calendar" placeholder="Return Date" className={classes.frmItem} />
  </Form.Item>

  <Form.Item rules={[{ required: true }]}>
    <Input onChange = {(e)=> handle(e)} value= {data.TotalHoursRequested} id="TotalHoursRequested" type="number" placeholder="Total Hours Requested"  className={classes.frmItem} />
  </Form.Item>

  <Form.Item rules={[{ required: true}]}>
    <Input onChange = {(e)=> handle(e)}  value= {data.TotalDaysRequested}  id="TotalDaysRequested"  type="number"  placeholder="Total Days Requested"  className={classes.frmItem} />
    
  </Form.Item>
  <Form.Item>
    
    <Button htmlType="submit" onclick= {(e)=> Submit(data)} className={classes.btnCenter}>Submit</Button><br />
    <Button onclick={handleClick} className={classes.btnCenter}>Back</Button><br />
  </Form.Item>
</Form>
</Row>
      
  
    </>
  )
}

export default LeaveForm


