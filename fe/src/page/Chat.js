import React, { useEffect } from 'react';
import { Button, Col, Input, Row } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Content } from "antd/es/layout/layout"
import { Field, Formik } from "formik";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ModalCreateChatGroup } from "../component/modal/ModalCreateChatGroup";
import { allChatGroup, detailChat } from "../api/api";
import { toast } from 'react-toastify';

export const Chat = () => {
    let [content, setContent] = useState('')
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
    },
    {
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
    const fetchChatList = async () => {
        let rawData = await allChatGroup()
        if (rawData)
            setGroupList(rawData.data)
    }
    useEffect(() => {
        fetchChatList()
    }, [])


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
    let chooseChat = async (group) => {
        console.log('sss')
        const detail = await detailChat({
            id: group.id
        })
        setContent('detail.content')
    }
    const chatGroup = (group) => {
        return <Row className='chat-line' onClick={(e) => chooseChat(group)}>
            <Col span={2} className='col-group-name'>
                <div className='group-name'>{group?.name}</div>
            </Col>
            <Col span={1}></Col>
            <Col span={20}>
                <div className='last-name-message'>
                    <div >
                        {group?.lastComment?.userName}
                    </div>
                    <div className='last-message'>
                        {group?.lastComment?.message}
                    </div>
                </div>
                <div className='last-time'>
                    {group?.lastComment?.time}
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
            <Content>
                <Row className='all-row'>
                    <Col lg={7} className='group-list-area'>
                        <Button className='btn-chat-list' onClick={open}>Create new chat</Button>
                        <div className='group-list-title'>Chat list</div>
                        <div  >
                            {groupList.map(e => {
                                return chatGroup(e)
                            })}
                        </div>
                    </Col>
                    <Col lg={16} className='content-area-col'>
                        <Formik
                            enableReinitialize
                            initialValues={initialValues}
                        >
                            {({ values, handleChange }) => (
                                <>
                                    <Row >
                                        <TextArea className='content-area' value={content} disabled={true} rows={32} scro />
                                    </Row>
                                    <Row className='text-area-box'>
                                        <TextArea className='content-area' name='draft' onChange={handleChange} rows={5} />
                                    </Row>
                                </>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Content>
            <ModalCreateChatGroup show={show} close={close} createSuccess={createSuccess} />
        </>

    )
}