
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Clock from "../components/Clock";
import LoginNew from "../components/LoginNew";
import Middle from "../components/Middle";
import Routing from "../components/Routing";
import Sidebar from "../components/Sidebar";
import Top from "../components/Top";

const SiteLayout = (isLogin) => {
    console.log(isLogin, "isLogin")
    return (
        <>
            {console.log(isLogin, "isLogin login")}
            {
                isLogin.isLogin ?

                    <Layout>
                        <Router>
                            <Top />

                            <Layout>
                                <Sidebar />
                                <Layout style={{ padding: '0 24px 24px', }} >
                                    <Middle />
                                    <Clock />
                                    <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280, }} >

                                        <Routing />

                                    </Content>
                                </Layout>
                            </Layout>
                        </Router >
                    </Layout >

                    : <LoginNew />}
        </>
    )
}

export default SiteLayout