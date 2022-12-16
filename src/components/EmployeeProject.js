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
    const [myprojectlist, setmyprojectlist] = useState([]);
    const token = localStorage.getItem("access_token1");
    var decoded = jwt_decode(token);


    useEffect(() => {


        const getmyProjects = async () => {

            await axios
                .get(`${process.env.REACT_APP_BASE_URL}/project/assignedtoyou/${decoded._id}`)
                .then((res) => {
                    console.warn("res", res?.data?.yourprojects[0])
                    setmyprojectlist(res?.data?.yourprojects)
                    // console.warn("mydataSource", mydataSource)
                });
        };
        getmyProjects()
    }, [])




    const columns = [
        {
            title: "Project name",
            dataIndex: "projectname",
            width: "160px",
        },

        {
            title: "Description",
            dataIndex: "projectdescription"
        },
        {
            title: "Technology",
            dataIndex: "projecttechnologies",
        },
        {
            title: "Start",
            dataIndex: "projectstart",
        },
        {
            title: "End",
            dataIndex: "projectend",
        },
        // {
        //     title: "Status",
        //     dataIndex: "assignedprojectstatus",
        // }
    ];


    return (


        <div>

            <Table columns={columns} dataSource={myprojectlist} />
        </div>


    )

}
export default Employeeproject;