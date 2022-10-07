import React from 'react'
import { Table } from 'antd'
import { useState } from 'react'
const EmployeesData = () => {
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Name",
            dataIndex: "Name",
        },
        {
            title: "Email",
            dataIndex: "Email",
        }

    ];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}>
            </Table>
        </div>
    )
}

export default EmployeesData