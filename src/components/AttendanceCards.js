import React from 'react'
import { Card, Col, Row } from 'antd';




const AttendanceCards = () => {







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

export default AttendanceCards;
