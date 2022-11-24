import React from 'react'
import { Form,Button,Input}  from "antd"

const ChangePassword = () => {
   

  return (
    <>
    
  
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      
    >
      <Form.Item
        label="Old Password"
        name="Old Password"
        rules={[
          {
            required: true,
            message: 'Please input your old password!',
          },
        ]}
      >
      <Input.Password />
      </Form.Item>
     <Form.Item
        label="New Password"
        name="New password"
        rules={[
          {
            required: true,
            message: 'Please input your new password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
         
      
    </>
  )
}

export default ChangePassword;
