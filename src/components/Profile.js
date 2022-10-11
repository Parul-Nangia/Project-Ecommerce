import React, { useState } from "react";
import { Col, Drawer, Row, List } from "antd";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const EmployeeProfile = () => {
  // return(
  //   <>
  //   {/* <h2>Hello</h2> */}
   
  // const [open, setOpen] = useState(false);

  // const showDrawer = () => {
  //   setOpen(true);
  // };

  // const onClose = () => {
  //   setOpen(false);
  // };

  return (
    <>
      {/* <List
        dataSource={[
          {
            id: 1,
            name: "aa",
          },
          {
            id: 2,
            name: "bb",
          },
        ]}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
                <a onClick={showDrawer} key={`a-${item.id}`}>
                View Profile
              </a>,
            ]}
          >
          </List.Item>
        )}
      />
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        <p
          className="site-description-item-profile-p"
          style={{
            marginBottom: 24,
          }}
        > */}
          {/* User Profile
        </p>
        <p className="site-description-item-profile-p">Personal</p> */}
        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content="Lily" />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Email" content="AntDesign@example.com" />
            </Col>
            <Col span={12}>
            <DescriptionItem title="Contact" content="Lily" />
          </Col>
        </Row>
      {/* // </Drawer> */}
    </>
  );
};
  

export default EmployeeProfile;
