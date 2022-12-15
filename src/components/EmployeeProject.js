import React, { useEffect, useState } from 'react'
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



const Employeeproject = () => {
    const [mydataSource, setDataSource] =useState([]);
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);


    useEffect(() => {
  
    
        const getmyProjects = async () => {

            await axios
                .get(`${process.env.REACT_APP_BASE_URL}/assignproject/allassignedprojects/${decoded._id}`)
                .then((res) => {
                    console.warn("res", res?.data)
                    setDataSource(res?.data?.singleEmployeeAllProjects)
console.warn("mydataSource", mydataSource)
                });
        };
        getmyProjects()
    }, [])




    const columns = [
        {
            title: "Project name",
            dataIndex: "assignedprojectname",
            width: "160px",
        },

        {
            title: "Description",
            dataIndex: "assignedprojectdescription"
        },
        {
            title: "Technology",
            dataIndex: "assignedprojecttechnologies",
        },
        {
            title: "Start",
            dataIndex: "assignedprojectstart",
        },
        {
            title: "End",
            dataIndex: "assignedprojectend",
        },
        {
            title: "Status",
            dataIndex: "assignedprojectstatus",
        }
    ];


    return (


        <div>

            <Table columns={columns}  dataSource={mydataSource}/>
        </div>


    )

}
export default Employeeproject;