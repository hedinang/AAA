import React from 'react';
import { Button, Col, Input, Row } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Content } from "antd/es/layout/layout"
import { Field, Formik } from "formik";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ModalCreateChatGroup } from "../component/modal/ModalCreateChatGroup";
import { allChatGroup } from "../api/api";
import { toast } from 'react-toastify';

export const Chat = () => {
    let [content, setContent] = useState([])
    let [groupList, setGroupList] = useState([{
        id: '12345',
        name: 'hoi phu huynh',
        lastComment: {
            userName: 'daniel',
            message: 'aaaaaaa'
        }
    }, {
        id: '12345',
        name: 'hoi phu huynh',
        lastComment: {
            userName: 'daniel',
            message: 'aaaaaaa'
        }
    }])
    let [show, setShow] = useState(false)
    // name,id, lastcomment
    let initialValues = {
        draft: ''
    }
    const textAreaStyle = {
        color: 'red',
        borderColor: 'black'
    }
    const inputStyle = {
        color: 'black',
        borderColor: 'black',
        marginTop: '20px'
    }
    const groupListStyle = {
        color: 'black',
        borderColor: 'blue',
        borderStyle: 'solid',
        height: '600px'
    }
    let sendMessage = (values) => {
        console.log(values.draft)
    }
    const chatGroup = (group) => {
        return <Row style={{ marginTop: '10px' }}>
            <Col span={4} style={{ color: 'red' }}>{group.name}</Col>
            <Col span={4} style={{ color: 'blue' }}>{group.lastComment.userName}:</Col>
            <Col span={16}>{group.lastComment.message}</Col>
        </Row>
    }
    const close = () => {
        setShow(false)
    }
    const open = () => {
        setShow(true)
    }
    const createSuccess = async() => {
        setShow(false)
        toast("Success");
        let rawData = await allChatGroup()
        if (rawData)
            setGroupList(rawData.data)
    }

    return (
        <>
            <Content >
                <Row style={{ marginTop: '2vh' }}>
                    <Col lg={8} >
                        <div>Group List</div>
                        <div style={groupListStyle} >
                            {groupList.map(e => {
                                return chatGroup(e)
                            })}
                        </div>
                    </Col>
                    <Col lg={1}></Col>
                    <Col lg={15}>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                        >
                            {({ values, handleChange }) => (
                                <Row style={{ marginTop: '2vh' }}>
                                    <Button style={{ backgroundColor: 'yellow' }} onClick={open}>Create group</Button>
                                    <Col lg={22}>
                                        <TextArea value={content} disabled={true} style={textAreaStyle} rows={20} />
                                        <Row>
                                            <Col lg={21}>
                                                <Input name='draft' style={inputStyle} onChange={handleChange} onEne />
                                            </Col>
                                            <Col lg={1}>
                                            </Col>
                                            <Col lg={2}>
                                                <Button
                                                    onClick={e => sendMessage(values)}
                                                    style={{ marginTop: '20px', backgroundColor: 'blue', color: 'white' }}>Send</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col lg={2}></Col>
                                </Row>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Content>
            <ModalCreateChatGroup show={show} close={close} createSuccess={createSuccess} />
        </>

    )
}