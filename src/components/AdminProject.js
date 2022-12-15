import React, { useEffect, useState } from 'react'
import {
    PlusOutlined,

} from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Modal, Space, Tag } from "antd";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Avatar, Badge } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Select, Table } from "antd";
import { FcHighPriority, FcApproval, FcCancel, FcInfo } from "react-icons/fc";
import { EllipsisOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Column, ColumnGroup } = Table;


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
    const [forsingleproject, setforsingleproject] = useState([]);

    // const [employeename, setEmployeename] = useState("")
    // const [assignedprojectname, setAssignedprojectname] = useState("")
    // const [assignedprojectdescription, setAssignedprojectdescription] = useState("")
    // const [assignedprojecttechnologies, setAssignedprojecttechnologies] = useState("")
    // const [assignedprojectstart, setAssignedprojectstart] = useState("")
    // const [assignedprojectend, setAssignedprojectend] = useState("")
    // const [assignedprojectstatus, setAssignedprojectstatus] = useState("")
    const [assignedemployeeslist, setassignedEmployees] = useState([])
    console.warn("assignedemployees", assignedemployeeslist.length)




    useEffect(() => {
        const getAllProjects = async () => {

            await axios
                .get(`${process.env.REACT_APP_BASE_URL}/project`)
                .then((res) => {
                    setDataSource(res?.data?.projectData)


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
                    // console.log("user", res?.data?.userData);

                });
        }
        getAllUsers()
    }, [])



    // useEffect(() => {
    //     const getAllassignedProjects = async () => {
    //         await axios
    //             .get(`${process.env.REACT_APP_BASE_URL}/assignproject`)
    //             .then((res) => {
    //                 console.log("assigned", res?.data?.assignedprojectData)
    //                 for (let g = 0; g < res?.data?.assignedprojectData.length; g++) {
    //                     setfornamedataSource(res?.data?.assignedprojectData[g].employeename)
    //                     console.log("assignedproject", res?.data?.assignedprojectData);
    //                     console.log("assignedproject", res?.data?.assignedprojectData[g].employeename);
    //                 }

    //             });
    //     }
    //     getAllassignedProjects()
    // }, [])






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


    const removefromproject = async (value) => {


        await axios
            .delete(`${process.env.REACT_APP_BASE_URL}/project/${value}`, {

            })
            .then((res) => {
                console.log("remove", res);
                message.success("Employee removed successfully!");
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

    const myshowmodal = async (record) => {
        // console.log("rowprojectrecord", record);

        await axios
            .get(`${process.env.REACT_APP_BASE_URL}/project/singlepro/${record._id}`)
            .then((res) => {
                console.warn("single", res?.data?.singleProject)

                // if (res?.data?.getAssignedProject.length === 0) {
                //     setassignedEmployees([])
                //     console.warn("not assigned yet")
                // } else {
                // for (let h = 0; h < res?.data?.getAssignedProject.length; h++) {
                setassignedEmployees(res?.data?.singleProject)
                // console.log("assignedemployeelist", assignedemployees)

                // console.warn("assignedemployees", res?.data?.getAssignedProject[h].employeename);
                // console.log("assigned")
                // }
                // }
            });
        await axios
            .get(`${process.env.REACT_APP_BASE_URL}/project/singlepro/${record._id}`)
            .then((res) => {
                // console.warn("res", res?.data?.singleProject[0].projectname)
                setforsingleproject(res?.data?.singleProject[0])
                // console.log("forsinglepro", res?.data?.singleProject[0]);

            });

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

            render: (record) => {
                return (
                    <>
                        <Button
                            className='assignBtn'
                            onClick={() => { myshowmodal(record) }}

                        >
                            Assign
                        </Button>
                    </>
                )
            }
        },

    ];


    // const onmyFinish = async () => {

    //     await axios
    //         .post(`${process.env.REACT_APP_BASE_URL}/assignproject`, {
    //             projectname,
    //             projectdescription,
    //             projecttechnologies,
    //             projectstart,
    //             projectend
    //         })
    //         .then((res) => {
    //             console.log("project", res);
    //             message.success("New project added successfully!!!!");
    //         });

    // };


    const handleChange = async (value, mylabel) => {
        console.log(`employeeslisting ${value}`);
        const employees = []
        // const emp_id = value[value.length - 1]
        // const project_id = forsingleproject._id;
        // const assignedprojectname = forsingleproject.projectname;
        // const assignedprojectdescription = forsingleproject.projectdescription;
        // const assignedprojecttechnologies = forsingleproject.projecttechnologies;
        // const assignedprojectstart = forsingleproject.projectstart;
        // const assignedprojectend = forsingleproject.projectend;
        // const assignedprojectstatus = "Assigned"
        // const employeename = mylabel[mylabel.length - 1].label;
        // console.log("label", mylabel[mylabel.length - 1].label)

        await axios
            .post(`${process.env.REACT_APP_BASE_URL}/assignproject`, {
                employees
            })
            .then((res) => {
                console.log("project", res);
                message.success("Project assigned successfully!");
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

    const mylist = [];
    for (let l = 0; l < assignedemployeeslist.length; l++) {
        if (assignedemployeeslist.length === 0) {
            mylist.push("assign first")
        } else {
            mylist.push(assignedemployeeslist[l].employeename);

        }

    }
    console.log("mylist", mylist)

    const handleClear = () => {
        setassignedEmployees([]);
    };

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
                <Table rowKey="_id" columns={columns} dataSource={dataSource} />
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

                    // onFinish={onmyFinish}
                    onFinishFailed={onmyFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item style={{ marginBottom: "100px" }}>

                        {/* <Option value="name" >{mydataSource.name}</Option> */}

                        {/* <Option value="Parul">Parul</Option>
                            <Option value="Prince">Prince</Option>
                            <Option value="Baljeet">Baljeet</Option> */}

                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '700px',

                            }}
                            placeholder="Select Employee"
                            value={mylist}
                            onChange={handleChange}
                            // style={{ position: 'absolute' }}
                            options={options}

                        // onClear={removefromproject}
                        // onClear={() => { removefromproject(record) }}
                        />
                        {/* <Button onClick={() => { handleClear() }} className="breakBtn"></Button> */}
                    </Form.Item>
                    <Form.Item style={{ float: "right", marginLeft: "10px" }}>

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
                    </Form.Item>
                    <Form.Item style={{ float: "right" }}>

                        <Button type="primary" htmlType="Done" onClick={myhandleOk}>
                            Add employees
                        </Button>

                    </Form.Item>

                </Form>
            </Modal>
        </>


    )

}
export default Adminproject;