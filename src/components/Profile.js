import React from "react";
import { Col, Row } from "antd";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const EmployeeProfile = ({ dataSource }) => {
  console.log(dataSource, "dataSource");

  return (
    <>
      <Row>
        <Col span={12}>
          <DescriptionItem title="Name" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Email" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Contact" />
        </Col>
        <Col span={12}>
          <DescriptionItem title="Gender" />
        </Col>
      </Row>
    </>
  );
};

export default EmployeeProfile;
