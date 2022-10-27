import { Button, Space, Table } from 'antd';
import React, { useState } from 'react';
const data = [
  {
    key: '1',
    name: 'Sachin',
    age: 32,
    address: 'Una',
  },
  {
    key: '2',
    name: 'Arun',
    age: 42,
    address: 'Kangra',
  },
  {
    key: '3',
    name: 'Arun Kaushal',
    age: 32,
    address: 'Hamirpur',
  },
  {
    key: '4',
    name: 'varun',
    age: 32,
    address: 'Chamba',
  },
  {
    key: '5',
    name: 'Sachin',
    age: 32,
    address: 'Hamirpur',
  },
  {
    key: '6',
    name: 'Arun',
    age: 42,
    address: 'Chamba',
  },
  {
    key: '7',
    name: 'Arun Kaushal',
    age: 32,
    address: 'Hamirpur',
  },
  {
    key: '8',
    name: 'varun',
    age: 32,
    address: 'Una',
  },
  {
    key: '9',
    name: 'Sachin',
    age: 32,
    address: 'Chamba',
  },
  {
    key: '10',
    name: 'Arun',
    age: 42,
    address: 'Hamirpur',
  },
  {
    key: '11',
    name: 'Arun Kaushal',
    age: 32,
    address: 'Una',
  },
  {
    key: '12',
    name: 'varun',
    age: 32,
    address: 'Una',
  },
  {
    key: '13',
    name: 'Sachin',
    age: 32,
    address: 'Chamba',
  },
  {
    key: '14',
    name: 'Arun',
    age: 42,
    address: 'Hamirpur',
  },
  {
    key: '15',
    name: 'Arun Kaushal',
    age: 32,
    address: 'Una',
  },
  {
    key: '16',
    name: 'varun',
    age: 32,
    address: 'Hamirpur',
  },
  {
    key: '17',
    name: 'Sachin',
    age: 32,
    address: 'Una',
  },
  {
    key: '18',
    name: 'Arun',
    age: 42,
    address: 'Chamba',
  },
  {
    key: '19',
    name: 'Arun Kaushal',
    age: 32,
    address: 'Hamirpur',
  },
  {
    key: '20',
    name: 'varun',
    age: 32,
    address: 'Chamba',
  },
];
const EmployeesReport = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {
          text: 'Arun',
          value: 'Arun',
        },
        {
          text: 'Varun',
          value: 'Varun',
        },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
export default EmployeesReport;