import React from 'react'
import { Table } from 'antd'
import { useState } from 'react'
import Top from '../components/Top';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Middle';
import { Layout } from 'antd';
const { Content } = Layout;



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

        <Layout>
            <Top />
            <Layout>
                <Sidebar />

                <Layout style={{ padding: '0 24px 24px', }} >
                    <Breadcrumbs />
                    <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280, }} >


                        <Table
                            columns={columns}
                            dataSource={dataSource}>
                        </Table>

                    </Content>
                </Layout>
            </Layout>
        </Layout>


    )
}

export default EmployeesData