import React, { useEffect, useState } from 'react'
import {
    PlusOutlined,

} from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Modal, Space } from "antd";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Select, Table } from "antd";
import { FcHighPriority, FcApproval, FcCancel, FcInfo } from "react-icons/fc";
import { EllipsisOutlined } from "@ant-design/icons";
const { Option } = Select;



const Adminproject = () => {
    const [isopenmodal, setIsOpenModal] = useState(false);
    const [myopenmodal, setmyOpenModal] = useState(false);

    const [projectname, setProjectname] = useState("");
    const [projectdescription, setProjectdescription] = useState("");
    const [projecttechnologies, setProjecttechnologies] = useState("");
    const [projectstart, setProjectstart] = useState("");
    const [projectend, setProjectend] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const [mydataSource, setmyDataSource] = useState([]);





    useEffect(() => {
        const getAllProjects = async () => {

            await axios
                .get(`${process.env.REACT_APP_BASE_URL}/project`)
                .then((res) => {
                    setDataSource(res?.data?.projectData)
                    console.log("project", res);
                });
        };
        getAllProjects()
    }, [])



    useEffect(() => {
        const getAllUsers = async () => {
            await axios
                .get(`${process.env.REACT_APP_BASE_URL}/user`)
                .then((res) => {
                    setmyDataSource(res?.data?.userData)
                    console.log("user", res?.data?.userData);

                });
        }
        getAllUsers()
    }, [])




    const onFinish = async () => {

        await axios
            .post(`${process.env.REACT_APP_BASE_URL}/project`, {
                projectname,
                projectdescription,
                projecttechnologies,
                projectstart,
                projectend
            })
            .then((res) => {
                console.log("project", res);
                message.success("New project added successfully!!!!");
            });

    };



    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const showModal = () => {
        setIsOpenModal(true);
    };

    const handleOk = async () => {
        setIsOpenModal(false);
    };

    const handleCancel = () => {
        setIsOpenModal(false);
    };



    const onmyFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const myshowModal = () => {
        setmyOpenModal(true);
    };

    const myhandleOk = async () => {
        setmyOpenModal(false);
    };

    const myhandleCancel = () => {
        setmyOpenModal(false);
    };



    const columns = [
        {
            title: "Project name",
            dataIndex: "projectname",
            width: "150px",
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
            render: (record) => {
                return (
                    <>
                        <Button
                            className='calendarbtn'
                            onClick={myshowModal}
                        >
                            Assign
                        </Button>
                    </>
                )
            }
        },

    ];


    const handleChange = async (value) => {
        // console.log(`employees for project ${value}`);
        const status = value
        await axios
            .put(`${process.env.REACT_APP_BASE_URL}/project`, {
                status

            })
            .then((res) => {
                console.log("project", res);
                message.success("New project added successfully!!!!");
            });
    };


    const options = [];
    for (let i = 0; i < mydataSource.length; i++) {
        options.push({
            label: mydataSource[i].name,
            value: mydataSource[i]._id,
        });
        console.log("options", options)
    }



    return (
        <>
            <Modal
                title="Add New Project"
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
                open={isopenmodal}
                onCancel={handleCancel}
                width={600}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        // style={{ fontWeight: "bold" }}
                        label="Project name"
                        name="projectname"
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                setProjectname(e.target.value);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        // style={{ fontWeight: "bold" }}
                        label="Project description"
                        name="projectdescription"
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                setProjectdescription(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        // style={{ fontWeight: "bold" }}
                        label="Technology"
                        name="projecttechnologies"
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                setProjecttechnologies(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        // style={{ fontWeight: "bold" }}
                        label="Start"
                        name="projectstart"
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                setProjectstart(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        // style={{ fontWeight: "bold" }}
                        label="End"
                        name="projectend"
                        rules={[
                            {
                                required: true,
                                message: "This field is required",
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) => {
                                setProjectend(e.target.value);
                            }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <div style={{ display: "flex", marginLeft: "100%" }}>
                            <Button
                                style={{
                                    marginRight: "4px",
                                    backgroundColor: "#d22d2d",
                                    borderColor: "blanchedalmond",
                                }}
                                type="primary"
                                htmlType="cancel"
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="Done" onClick={handleOk}>
                                Add Project
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>

            <div>
                <Button className='calendarbtn' onClick={showModal}><PlusOutlined />Add new project</Button>
                <br />
                <Table columns={columns} dataSource={dataSource} />
            </div>


            <Modal
                title="Select Employee"
                cancelButtonProps={{ style: { display: "none" } }}
                okButtonProps={{ style: { display: "none" } }}
                open={myopenmodal}
                onCancel={myhandleCancel}
                width={900}
            // height={1000}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}


                    onFinishFailed={onmyFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item>

                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Select Employee"
                            // defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                            style={{ position: 'absolute' }}
                            options={options}
                        />

                        {/* <Option value="name" >{mydataSource.name}</Option> */}

                        {/* <Option value="Parul">Parul</Option>
                            <Option value="Prince">Prince</Option>
                            <Option value="Baljeet">Baljeet</Option> */}


                    </Form.Item>

                    <Form.Item>
                        <div style={{ display: "flex", marginLeft: "100%", marginTop: "200px" }}>
                            <Button
                                style={{
                                    marginRight: "4px",
                                    backgroundColor: "#d22d2d",
                                    borderColor: "blanchedalmond",
                                }}
                                type="primary"
                                htmlType="cancel"
                                onClick={myhandleCancel}
                            >
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="Done" onClick={myhandleOk}>
                                Add employees in project
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>


    )

}
export default Adminproject;