// import { AntDesignOutlined } from '@ant-design/icons'
import React, { useState } from 'react';
import {Button,DatePicker, Form, Input, InputNumber, Select,Switch,} from 'antd';

const LeaveForm = () => {
    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
      };

  return (

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
        
        
     <Form.Item label="Reason">
        <Input />
      </Form.Item>
      <Form.Item label="Leavetype">
        <Select>
          <Select.Option value="demo">Annual</Select.Option>
          <Select.Option value="demo">Medical</Select.Option>
          <Select.Option value="demo">Casual</Select.Option>
          <Select.Option value="demo">Other</Select.Option>
        </Select>
      </Form.Item>
    

      <Form.Item label="DatePicker">
        <DatePicker />
      </Form.Item>
      <Form.Item label="InputNumber">
        <InputNumber />
      </Form.Item>
      <Form.Item label="PaidLeave" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item>
    </Form>
  );
};
export default LeaveForm;
