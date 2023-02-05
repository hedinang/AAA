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
        name: 'HN',
        lastComment: {
            userName: 'daniel',
            message: 'aaaaaaacccccccccccc',
            time: 'Mon'
        }
    }, {
        id: '12345',
        name: 'QA',
        lastComment: {
            userName: 'daniel',
            message: 'aaaaaaaccccccccccccc',
            time: '19/01/23'
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
    let sendMessage = (values) => {
        console.log(values.draft)
    }
    const chatGroup = (group) => {
        return <Row className='chat-line' >
            <Col span={2} className='col-group-name'>
                <div className='group-name'>{group.name}</div>
            </Col>
            <Col span={1}></Col>
            <Col span={20}>
                <div className='last-name-message'>
                    <div >
                        {group.lastComment.userName}
                    </div>
                    <div className='last-message'>
                        {group.lastComment.message}
                    </div>
                </div>
                <div className='last-time'>
                    {group.lastComment.time}
                </div>
            </Col>
            <Col span={1}></Col>
        </Row>
    }
    const close = () => {
        setShow(false)
    }
    const open = () => {
        setShow(true)
    }
    const createSuccess = async () => {
        setShow(false)
        toast("Success");
        let rawData = await allChatGroup()
        if (rawData)
            setGroupList(rawData.data)
    }

    return (
        <>
            <Content >
                <Row>
                    <Col lg={7} className='group-list-area'>
                        <Button className='btn-chat-list' onClick={open}>Create new chat</Button>
                        <div className='group-list-title'>Chat list</div>
                        <div  >
                            {groupList.map(e => {
                                return chatGroup(e)
                            })}
                        </div>
                    </Col>
                    <Col lg={1}></Col>
                    <Col lg={16}>
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