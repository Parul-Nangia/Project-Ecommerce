import { DashboardOutlined, HomeOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;









const Sidebar = () => {
   
    return (

            <Sider width={200} className="site-layout-background">
                <Menu className='Sidemenubar'
                    
                    mode="inline"
                    items={[
                        { label: "DASHBOARD", key: "/dashboard", icon: <HomeOutlined /> },
                        { label: "ATTENDANCE", key: "/attendance", icon: <DashboardOutlined /> },
                        {
                            label: "EMPLOYEES", key: "/employees", icon: <UserOutlined />,
                            children: [
                                {
                                    label: "EMPLOYEES ", key: "/employees", icon: <UserOutlined />,
                                },
                                {
                                    label: "EMPLOYEES DATA", key: "/employeesdata", icon: <UserOutlined />,
                                }]
                        },
                        { label: "LEAVE", key: "/leave", icon: <PaperClipOutlined /> },

                    ]}

                />
            </Sider>
            
   

    )
};



export default Sidebar