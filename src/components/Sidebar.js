import { DashboardOutlined, HomeOutlined, PaperClipOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import Middle from '../components/Middle';

import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;









const Sidebar = () => {
    const navigate = useNavigate();
    return (

        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu className='Sidemenubar'
                    onClick={({ key }) => {
                        if (key === "dashboard") {
                            // TODO ,may be logout

                        } else {
                            navigate(key)
                        }
                    }}
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
            <Middle />
        </Layout>

    )
};











// <Layout
//                 style={{
//                     padding: '0 24px 24px',
//                 }}
//             >
//                 <Breadcrumb
//                     style={{
//                         margin: '16px 0',
//                     }}
//                 >
//                     <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
//                     <Breadcrumb.Item>Attendance</Breadcrumb.Item>
//                     <Breadcrumb.Item>Employees</Breadcrumb.Item>
//                     <Breadcrumb.Item>Leave</Breadcrumb.Item>

//                 </Breadcrumb>
//                 <Content
//                     className="site-layout-background"
//                     style={{
//                         padding: 24,
//                         margin: 0,
//                         minHeight: 280,
//                     }}
//                 >

//                 </Content>
//             </Layout>




// <Sider width={200} className="site-layout-background">
//     <Menu className='Sidemenubar'
//         onClick={({ key }) => {
//             if (key === "dashboard") {
//                 // TODO ,may be logout
//             } else {
//                 navigate(key)
//             }
//         }}
//         items={[
//             {label: "DASHBOARD", key: "/dashboard", icon: <HomeOutlined /> },
//             {label: "ATTENDANCE", key: "/attendance", icon: <DashboardOutlined /> },
//             {label: "EMPLOYEES", key: "/employees", icon: <UserOutlined /> },
//             {label: "LEAVE", key: "/leave", icon: <PaperClipOutlined /> },

//         ]}
//     />

// </Sider>



//         <div>
//             <SideMenu />
//         </div>



//     );

// }

// function SideMenu(){
//     const navigate = useNavigate();
//     return(
//         <div style={{ display: "absolute", marginTop: "60px", flexDirection: "column", color: "#FF4500" }}>
//             <Menu
//             onClick={({key})=>{
//                 if(key==="signout"){

//                 }else{
//                     navigate(key);
//                 }

//             }}
//             items={[
//                 {label:"Employees" , key:"/employees"},
//                 {label:"Dashboard" , key:"/dashboard"},
//                 {label:"Attendance" , key:"/attendance"},
//                 {label:"Leave" , key:"/leave"},
//             ]} style={{position:"fixed",backgroundColor:"#FF4500",alignItems:"baseline",height:"100vh"}}
//             ></Menu>

//             </div>




export default Sidebar