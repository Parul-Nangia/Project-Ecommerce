import React from 'react'
import { Table } from 'antd'
let l1={
  flex:"1",
  height:"300px",
  width:"1200px",
  margin:"20px",

}

const LeaveTable = () => {

  const data= [
    {
    leavetype:'Medical',
     days:2,
     Reason:'fever',
     key:1,
     Status:'Pending',
  },
  {
    leavetype:'Casual',
     days:1,
     Reason:'work',
     key:2,
     Status:'Approved',
  },
  {
    leavetype:'Annual',
     days:5,
     Reason:'vacation',
     key:3,
     Status:'Pending'
  },
  {
    leavetype:'Time off',
     days:1,
     Reason:'urgent',
     key:4,
     Status:'Pending',
  },
]
const columns = [
  {
    title:'Leave Type',
    dataIndex:'leavetype',
    key:'key',
},
{
  title:'Days',
  dataIndex:'days',
  key:'key',
},
{
  title:'Reason',
  dataIndex:'Reason',
  key:'key',
},
{
  title:'Status',
  dataIndex:'Status',
  key:'key',
},

];
 return (
    
    <>
    <h1>Table</h1>
      <Table style={l1}
        dataSource={data}
        columns={columns} >
      </Table>
    </>
  )
}

export default LeaveTable;
