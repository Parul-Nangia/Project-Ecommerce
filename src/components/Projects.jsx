import React, { useEffect, useState } from 'react'
import AdminProject from '../components/AdminProject';
import EmployeeProject from '../components/EmployeeProject';

import { Button } from 'antd';
import {
    PlusOutlined,

} from "@ant-design/icons";
import { Select, Table } from "antd";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { FcHighPriority, FcApproval, FcCancel, FcInfo } from "react-icons/fc";
import { EllipsisOutlined } from "@ant-design/icons";
const { Option } = Select;




const Projects = () => {

    const [myrole, setMyrole] = useState("")

    useEffect(() => {
        userData();

    }, [])
    const userData = () => {
        const token = localStorage.getItem("access_token1");
        var decoded = jwt_decode(token);
        setMyrole(decoded.role)


    }
    console.warn("myrole", myrole)

    if (myrole === "admin") {
        console.log("my role = ", myrole)
        return (
            <>
                <AdminProject />
            </>
        )
    } else if (myrole === "employee") {
        console.log("my role is admin", myrole)
        return (
            <>
                <EmployeeProject />
            </>
        )
    }


}
export default Projects;