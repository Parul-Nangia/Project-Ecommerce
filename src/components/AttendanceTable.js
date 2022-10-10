import React from 'react';
import { Table } from 'antd';




const AttendanceTable = () => {

  const columns = [
    {
      title: '#',
      dataIndex: '#',

    },
    {
      title: 'Date',
      dataIndex: 'date',

    },
    {
      title: 'Punch In',
      dataIndex: 'punch in',

    },
    {
      title: 'Punch Out',
      dataIndex: 'punch out',

    },
    {
      title: 'Production',
      dataIndex: 'production',

    },
    {
      title: 'Break',
      dataIndex: 'break',

    },
  ];

  return (


            <Table

              columns={columns} >
            </Table>


  )
}

export default AttendanceTable
