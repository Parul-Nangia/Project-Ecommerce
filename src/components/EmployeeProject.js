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


    const columns = [
        {
            title: "Project name",
            dataIndex: "projectname",
            width: "160px",
        },

        {
            title: "Description",
            dataIndex: "projectdescription",
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
        {
            title: "Status",
            dataIndex: "status",
        }
    ];


    return (


        <div>
           
            <Table columns={columns} />
        </div>


    )

}
export default Employeeproject;