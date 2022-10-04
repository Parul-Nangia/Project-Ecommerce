import React from 'react';
import { Table } from 'antd';
let a1={
  flex:"1",
  height:"600px",
  width:"1000px",
  margin:"40px",
  marginLeft:"200px"

}
const AttendanceTable = () => {
    
    const columns = [
      {
        title:'#',
        dataIndex:'#',
       
    },
    {
      title:'Date',
      dataIndex:'date',
      
    },
    {
      title:'Punch In',
      dataIndex:'punch in',
      
    },
    {
      title:'Punch Out',
      dataIndex:'punch out',
      
    },
    {
      title:'Production',
      dataIndex:'production',
      
    },
    {
      title:'Break',
      dataIndex:'break',
      
    },
];
    
  return (
    <div>
        <Table style={a1}
       
        columns={columns} >
        </Table>
      
    </div>
  )
}

export default AttendanceTable
