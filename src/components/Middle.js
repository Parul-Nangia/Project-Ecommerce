import React from 'react';
import { Breadcrumb } from 'antd';


const Middle = () => {
    return (


            <Breadcrumb
                style={{
                    margin: '16px 0',
                }}
            >
                <Breadcrumb.Item><a href="/dashboard">Dashboard</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/attendance">Attendance</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/employees">Employees</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href="/leave">Leave</a></Breadcrumb.Item>
                

            </Breadcrumb>



    )
};



export default Middle;

