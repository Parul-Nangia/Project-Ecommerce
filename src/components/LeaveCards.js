import React from 'react'
import { Card, Col, Row } from 'antd';
import { useState, useEffect } from "react";




const LeaveCards = () => {
  const [priviliege, setPriviliege] = useState([]);





  //============================================================== Start Priviliege Leave====================================================================================
  const EmployeePriviliegeLeave = () => {
    fetch("http://localhost:1999/leave/priviliege/:emp_id")

      .then((response) => {
        return response.json();
      }).then((data) => {

        let emppriviliegeLeave = data.data
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
              {priviliege.length}
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
