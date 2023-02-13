import React from 'react';
import { Col, Row, Table } from "antd"
import { Content } from "antd/es/layout/layout"
import { useEffect, useState } from "react";
import { ModalEditUser } from "../component/modal/ModalEditUser";
import { ModalDeleteUser } from "../component/modal/ModalDeleteUser";
import { allUser } from "../api/api";
import { EditOutlined, DeleteOutlined, UserAddOutlined, CopyOutlined } from '@ant-design/icons';
import "../scss/style.scss";
import { ModalCreateUser } from "../component/modal/ModalCreateUser";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { messaging } from '../config/config';
import { getToken } from "firebase/messaging";

const Landing = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [dataDelete, setDataDelete] = useState()
    const [dataEdit, setDataEdit] = useState()
    const [dataCreate, setDataCreate] = useState()
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchdata = async () => {
            let rawData = await allUser()
            if (rawData)
                setData(rawData.data)
        }
        fetchdata()
    }, [])

    const closeEdit = () => {
        setShowEdit(false)
    }
    const closeDelete = () => {
        setShowDelete(false)
    }
    const closeCreate = () => {
        setShowCreate(false)
    }
    const openEdit = (e, record) => {
        setDataEdit(record)
        setShowEdit(true)
    }
    const openDelete = (e, record) => {
        setDataDelete(record)
        setShowDelete(true)
    }
    const openCreate = (e, record) => {
        setDataCreate(record)
        setShowCreate(true)
    }

    const addSuccess = async () => {
        setShowCreate(false)
        toast("Success");
        let rawData = await allUser()
        if (rawData)
            setData(rawData.data)
    }
    const editSuccess = async () => {
        setShowEdit(false)
        toast("Success");
        let rawData = await allUser()
        if (rawData)
            setData(rawData.data)
    }
    const deleteSuccess = async () => {
        setShowDelete(false)
        toast("Success");
        let rawData = await allUser()
        if (rawData)
            setData(rawData.data)
    }
    // const generateToken = async () => {
    //     try {
    //         const token = await getToken(messaging, { vapidKey: process.env.PUBLIC_KEY });
    //         console.log(token)
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    const columns = [
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            onCell: (record, rowIndex) => {
                return {
                    onClick: (ev) => {
                        openEdit(ev, record, rowIndex)
                    },
                };
            },
            render: (_, { edit }) => (
                <>
                    <EditOutlined style={{ color: 'blue', cursor: 'pointer', fontSize: '150%' }} />
                </>
            ),

        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            onCell: (record, rowIndex) => {
                return {
                    onClick: (ev) => {
                        openDelete(ev, record, rowIndex)
                    },
                };
            },
            render: () => (
                <>
                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer', fontSize: '150%' }} />
                </>
            ),
        },
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        }
    ];

    return (
        <>
            <Content >
                <Row className="responsive" style={{ marginTop: '10vh' }}>
                    <Col lg={2}>
                    </Col>
                    <Col lg={20}>
                        <UserAddOutlined style={{ color: 'blue', cursor: 'pointer', fontSize: '150%' }} onClick={openCreate} />
                        {/* <CopyOutlined style={{ color: 'blue', cursor: 'pointer', fontSize: '150%', marginLeft: '100px' }} onClick={generateToken} /> */}
                        <Table dataSource={data} columns={columns} scroll={{ x: true }} />
                    </Col>
                    <Col lg={2}></Col>
                </Row>
            </Content>
            <ModalEditUser show={showEdit} close={closeEdit} rawData={dataEdit} editSuccess={editSuccess} />
            <ModalDeleteUser show={showDelete} close={closeDelete} data={dataDelete} deleteSuccess={deleteSuccess} />
            <ModalCreateUser show={showCreate} close={closeCreate} data={dataCreate} addSuccess={addSuccess} />

        </>

    )
}
export { Landing }