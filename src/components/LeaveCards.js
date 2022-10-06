import React from 'react'
import { Card, Col, Row } from 'antd';



const LeaveCards = () => {

  return (
    <>
      <div className="site-card-wrapper">
        <Row gutter={16}>
          <Col span={6} className='dashboardcards'>
            <Card title="Annual" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Medical" bordered={false}>
              Content
            </Card>
          </Col>
          <Col span={6} className='dashboardcards'>
            <Card title="Casual" bordered={false}>
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
