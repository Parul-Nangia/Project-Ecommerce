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
    const [form] = Form.useForm();
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

    const [value, setValue] = useState([selectedemployees]);


    // console.log("newValue", selectedemployees)
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
    const [newusers, setnewusers] = useState([])

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
        const arr = []
        if (record?.employees?.length === 0) {
            console.warn("not assigned yet")
        } else if (record?.employees?.length !== 0) {
            for (let m = 0; m < record?.employees?.length; m++) {

                arr.push({
                    label: record?.employees[m].name,
                    value: record?.employees[m].emp_id
                })
            }

            console.warn("assigned")
        }
        setValue(arr)
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




    const handleChange = (value, e, index) => {
        // console.warn("event", event)
        console.log(`selected employee ${value}`);
        // setedituserlist({[e.target.name]:e.target.value})
        setyouremployeeID(value)

    };


    // const deleteItem = (e, index, option) => {
    //     console.warn("e", e)
    //     console.warn("index", index)
    //     console.warn("option", option)

    //     e.stopPropagation();
    //     e.preventDefault();
    //     const updated = [...selectedemployees];
    //     updated.splice(index, 1);
    //     setselectedemployees(updated);
    // };

    // const myuserlist = [];
    // if (myrecord?.employees?.length === 0) {
    //     // console.warn("empty")
    //     myuserlist.push();
    //     console.warn("myuserlist empty", myuserlist)

    // } else {
    //     // console.warn("not empty")
    //     for (let j = 0; j < myrecord?.employees?.length; j++) {
    //         // form.setFieldsValue({
    //         //     label: myrecord?.employees[j]?.name,
    //         //     value: myrecord?.employees[j]?.email,


    //         // });

    //         // console.warn("myrecord 2", myrecord?.employees)
    //         // myuserlist.push({
    //         //     label: myrecord?.employees[j].name,
    //         //     value: myrecord?.employees[j].emp_id,
    //         // });

    //     }

    //     console.log("myuserlist", myuserlist)
    // }


    // console.log("youremployeeID", youremployeeID)
    const myhandleOk = async () => {
        const employees = myrecord?.employees
        const newassignedemployees = []
        console.log("employees here 1", employees)

        console.log("value", value)
        if (value.length === 0) {
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


        } else if (value.length !== 0) {
            message.warning("Please wait...");
            // Remove elements from array
            employees.pop();
            console.log("employees here 2", employees)

            // console.warn("remaining");
            // console.log("value here", value)

            for (let g = 0; g < value.length; g++) {

                console.log("value here 1", value)

                await axios.get(`${process.env.REACT_APP_BASE_URL}/user/${value[g]}`, {
                })
                    .then((res) => {
                        // console.log("res", res?.data?.myData);

                        console.log("value here 2", value[g])

                        // console.log("user ID", res?.data?.myData?._id);
                        if (value[g] !== res?.data?.myData?._id) {
                            console.log("value here 3", res?.data?.myData?._id)
                            console.warn("ID not matching");

                        } else if (value[g] === res?.data?.myData?._id) {
                            console.warn("matching", value[g], res?.data?.myData?._id);

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

            }

            axios.put(`${process.env.REACT_APP_BASE_URL}/project/${myrecord._id}`, {
                employees: newassignedemployees
            })
                .then((res) => {
                    console.warn("user assigned", res);
                    message.success("Project assigned successfully!");
                });
        }
        setmyOpenModal(false);
        //  window.location.reload()
    };






    const myhandleCancel = () => {
        // while (myuserlist.length) {

        // Remove elements from array
        // myuserlist.pop();
        // }

        // console.log("myuserlist here", myuserlist)
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
    const options = [];
    for (let i = 0; i < mydataSource.length; i++) {
        options.push({
            label: mydataSource[i].name,
            value: mydataSource[i]._id,


        });

        // console.log("options", options)
    }

    // console.log("selectedemployees", selectedemployees)

    const selectProps = {
        mode: 'multiple',
        style: {
            width: '100%',
        },
        // selectedemployees,
        options,
        value,
        onChange: (newValue) => {
            setValue(newValue);
        },
        placeholder: 'Select Item...',
        maxTagCount: 'responsive',
    };
    console.warn("selectProps", selectProps)



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
                    autoComplete="off"
                // form={form}
                >

                    <Form.Item style={{ marginBottom: "100px" }}  >

                        <Space
                            direction="vertical"
                            style={{
                                width: '100%',
                            }}
                        >
                            <Select {...selectProps} />

                        </Space>



                        {/* <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '700px' }}
                            placeholder="Select Employee"
                            value={selectedemployees}
                            onChange={handleChange}
                        // options={options}
                        >
                           
                            {options.map((option, index) => (
                                <Option value={option.value} >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <div>{option.label}</div>
                                        <Button onClick={(e) => deleteItem(e, index, option)} danger size="small">
                                            Delete
                                        </Button>
                                    </div>
                                </Option>
                            ))}

                        </Select> */}
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