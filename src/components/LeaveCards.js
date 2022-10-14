import React from 'react'
import { Card, Col, Row } from 'antd';



const LeaveCards = () => {

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6} className='dashboardcards'>
            <Card title="Pending Priviliege Leaves" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Pending Sick Leaves" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Pending Casual Leaves" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Others" bordered={false}>
              Content
            </Card>
          </Col>
        </Row>
      </div>
    </>

  )
}

export default LeaveCards
