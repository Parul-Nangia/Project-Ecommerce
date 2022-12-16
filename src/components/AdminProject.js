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
    const [youremployeeID, setyouremployeeID] = useState("");
    const [projectdescription, setProjectdescription] = useState("");
    const [projecttechnologies, setProjecttechnologies] = useState("");
    const [projectstart, setProjectstart] = useState("");
    const [projectend, setProjectend] = useState("");
    const [dataSource, setDataSource] = useState([]);
    const [edituserlist, setedituserlist] = useState([]);

    const [mydataSource, setmyDataSource] = useState([]);
    const [selectedemployees, setselectedemployees] = useState([]);
    // console.log("selectedemployees 1", selectedemployees)
    const [showemployee, setshowemployee] = useState([]);

    // const [employeename, setEmployeename] = useState("")
    // const [assignedprojectname, setAssignedprojectname] = useState("")
    // const [assignedprojectdescription, setAssignedprojectdescription] = useState("")
    // const [assignedprojecttechnologies, setAssignedprojecttechnologies] = useState("")
    // const [assignedprojectstart, setAssignedprojectstart] = useState("")
    // const [assignedprojectend, setAssignedprojectend] = useState("")
    // const [assignedprojectstatus, setAssignedprojectstatus] = useState("")
    const [assignedemployeeslist, setassignedEmployees] = useState([])
    const [myrecord, setmyrecord] = useState([])
    // console.warn("myrecord 2", myrecord)

    // console.warn("assignedemployees", assignedemployeeslist.length)




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
        // console.warn("record", record)
        setmyrecord({ ...record })
        console.warn("myrecord 1", record)

        if (record?.employees?.length === 0) {
            console.warn("not assigned yet")
        } else if (record?.employees?.length !== 0) {
            console.warn("assigned")
        }

        // await axios
        //     .get(`${process.env.REACT_APP_BASE_URL}/project/singlepro/${record._id}`)
        //     .then((res) => {
        //         if (res?.data?.singleProject[0].employees.length === 0) {
        //             console.warn("not assigned yet")
        //             setselectedemployees([])
        //         }
        //         else {
        //             // for (let m = 0; m < res?.data?.singleProject[0].employees.length; m++) {
        //             setselectedemployees(res?.data?.singleProject[0].employees)
        //             // console.log("selectedemployees", res?.data?.singleProject);
        //             // console.log("selectedemployees 2", res?.data?.singleProject[0].employees)

        //             // }
        //         }
        //     });
        setmyOpenModal(true);

    };




    const handleChange = async (value, e) => {
        console.log(`selected employee ${value}`);
        // setedituserlist({[e.target.name]:e.target.value})
        setyouremployeeID(value)

    };


    const myuserlist = [];
    if (myrecord?.employees?.length === 0) {
        // console.warn("empty")
        myuserlist.push();
        console.warn("myuserlist empty", myuserlist)

    } else {
        // console.warn("not empty")
        for (let j = 0; j < myrecord?.employees?.length; j++) {
            // console.warn("myrecord 2", myrecord?.employees)

            myuserlist.push({
                label: myrecord?.employees[j].name,
                value: myrecord?.employees[j].emp_id,
            });
        }

        console.log("myuserlist", myuserlist)
    }


    // console.log("youremployeeID", youremployeeID)
    const myhandleOk = async () => {
        const employees = myrecord?.employees
        const newassignedemployees = []
        console.log("employees here 1", employees)

        console.log("youremployeeID", youremployeeID)
        if (youremployeeID.length === 0) {
            console.error("removed all ");
            // Remove elements from array
            employees.pop();
            await axios.put(`${process.env.REACT_APP_BASE_URL}/project/${myrecord._id}`, {
                employees
            })
                .then((res) => {
                    console.log("user assigned", res);
                    message.success("All employees removed!");
                });


        } else if (youremployeeID.length !== 0) {
            // Remove elements from array
            employees.pop();
            console.log("employees here 2", employees)

            // console.warn("remaining");
            // console.log("youremployeeID here", youremployeeID)

            for (let g = 0; g < youremployeeID.length; g++) {

                console.log("youremployeeID here 1", youremployeeID)

                await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${youremployeeID[g]}`, {
                })
                    .then((res) => {
                        // console.log("res", res?.data?.myData);

                        console.log("youremployeeID here 2", youremployeeID[g])

                        // console.log("user ID", res?.data?.myData?._id);
                        if (youremployeeID[g] !== res?.data?.myData?._id) {
                            console.log("youremployeeID here 3", res?.data?.myData?._id)
                            console.warn("ID not matching");

                        } else if (youremployeeID[g] === res?.data?.myData?._id) {
                            console.warn("matching", youremployeeID[g], res?.data?.myData?._id);

                            newassignedemployees.push({
                                emp_id: res?.data?.myData?._id,
                                name: res?.data?.myData?.name,
                                gender: res?.data?.myData?.gender,
                                password: res?.data?.myData?.password,
                                role: res?.data?.myData?.role,
                                email: res?.data?.myData?.email,
                                contact: res?.data?.myData?.contact
                            })
                        }
                    });
                // setmyOpenModal(false);
            }
            axios.put(`${process.env.REACT_APP_BASE_URL}/project/${myrecord._id}`, {
                employees: newassignedemployees
            })
                .then((res) => {
                    console.warn("user assigned", res);
                    // message.success("Project assigned successfully!");
                });

        }
    };



    const options = [];
    for (let i = 0; i < mydataSource.length; i++) {
        options.push({
            label: mydataSource[i].name,
            value: mydataSource[i]._id,


        });
        // console.log("options", options)
    }



    const myhandleCancel = () => {
        myuserlist.pop()
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
                            style={{ width: '700px' }}
                            placeholder="Select Employee"
                            // name={myuserlist?.label}
                            defaultValue={myuserlist}
                            value={myuserlist}
                            onChange={handleChange}
                            options={options}

                        />
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

                        <Button type="primary" htmlType="Done" onClick={() => { myhandleOk() }}
                        >
                            Add employees
                        </Button>

                    </Form.Item>

                </Form>
            </Modal>
        </>


    )

}
export default Adminproject;