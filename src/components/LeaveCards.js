import React from 'react'
import { Card, Col, Row } from 'antd';
import { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';




const LeaveCards = () => {
  const [priviliege, setPriviliege] = useState([]);









  //============================================================== Start Priviliege Leave====================================================================================

  const EmployeePriviliegeLeave = () => {


    const token = localStorage.getItem("access_token1");
    // console.log("Employee Priviliege Token from Local Storage", token)
    // let token = token;
    var decoded = jwt_decode(token);
    console.log("Employee Priviliege Decoded token data", decoded);
    let emp_id = decoded._id
    console.log("Please help ", emp_id)


    fetch(`http://localhost:1999/leave/priviliege/${emp_id}`)

      .then((response) => {
        console.log("hello emp_id here", decoded._id)
        return response.json();
      }).then((data) => {

        let emppriviliegeLeave = data
        console.log(" helllo there data", data)      // error in fetching data from api
        console.log("Priviledge Leave Data", emppriviliegeLeave)

        setPriviliege(emppriviliegeLeave)
      })

  }
  useEffect(() => {
    EmployeePriviliegeLeave();

  }, [])

  //===========
  //============================================================== End Priviliege Leave====================================================================================





  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6} className='dashboardcards'>
            <Card title="Priviliege" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Sick" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Casual" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Holiday" bordered={false}>
              Content
            </Card>
          </Col>
        </Row>
      </div>
    </>

  )
}

export default LeaveCards
