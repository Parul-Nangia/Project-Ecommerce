import React from 'react';
import {Menu} from 'antd';

function AppHeader(){
    return (
        <div className="container-fluid">
            <div className="header">
                <div className="logo"/>
                <Menu mode="horizontal" defaultSelectedKeys={[2]}>

                    <Menu.Item key="1">Logout</Menu.Item>

                </Menu>
            </div>
        </div>
    );
}

export default AppHeader;