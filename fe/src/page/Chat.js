import React, { useEffect } from 'react';
import { Button, Col, Input, Row } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Content } from "antd/es/layout/layout"
import { Field, Formik } from "formik";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ModalCreateChatGroup } from "../component/modal/ModalCreateChatGroup";
import { allChatGroup, detailChat, sendMessage } from "../api/api";
import { toast } from 'react-toastify';
const moment = require('moment');

export const Chat = () => {
    let [contents, setContents] = useState([])
    let [groupId, setGroupId] = useState('')
    let [groupList, setGroupList] = useState([])
    let [show, setShow] = useState(false)
    const fetchChatList = async () => {
        let rawData = await allChatGroup({
            id: window.localStorage.getItem('userId')
        })
        if (rawData.data)
            setGroupList(rawData.data)
    }
    useEffect(() => {
        fetchChatList()
    }, [])
    // name,id, lastcomment
    let initialValues = {
        draft: ''
    }
    let chooseChat = async (group) => {
        const detail = await detailChat({
            id: group.id
        })
        setContents(detail.data.content)
        setGroupId(group.id)
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
                {group?.lastComment?.time ?
                    <div className='last-time'>
                        {moment(group?.lastComment?.time).format('YYYY-MM-DD HH:mm:ss')}
                    </div> : <></>
                }
                {/* <div className='last-time'>
                    {moment(group?.lastComment?.time).format('YYYY-MM-DD HH:mm:ss')}
                </div> */}
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
        fetchChatList()
    }
    const pressEnter = async (e, draft, setValues) => {
        if (e.keyCode === 13) {
            console.log('aaa')
            let result = await sendMessage({
                id: groupId,
                userId: window.localStorage.getItem('userId'),
                message: draft
            })
            if (result.status === 'OK') {
                console.log('aaa')
                const detail = await detailChat({
                    id: groupId
                })
                setValues({ ...initialValues })
                setContents(detail.data.content)
                fetchChatList()
            }
        }
    }
    const lineMessage = (content) => {
        if (JSON.stringify(content) === '{}') {
            return <></>
        }
        if (content.userId === window.localStorage.getItem('userId')) {
            return <div>
                <Row >
                    <Col span={12}></Col>
                    <Col span={12}>
                        <Row style={{ float: 'right' }}>
                            <div className='message-user'>{content.userName} </div>
                            <div className='message-content'>{content.message}</div>
                        </Row>
                    </Col>
                </Row>
                <Row ><div style={{ marginRight: 'auto', marginLeft: 'auto' }}>{moment(content.time).format('YYYY-MM-DD HH:mm:ss')}</div></Row>
            </div>
        } else {
            return <div>
                <Row >
                    <Col span={12}>
                        <Row>
                            <div className='message-user'>{content.userName} </div>
                            <div className='message-content'>{content.message}</div>
                        </Row>
                    </Col>
                    <Col span={12}></Col>

                </Row>
                <Row ><div style={{ marginRight: 'auto', marginLeft: 'auto' }}>{moment(content.time).format('YYYY-MM-DD HH:mm:ss')}</div></Row>
            </div>
        }
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
                            {({ values, handleChange, setValues }) => (
                                <>
                                    <div style={{ height: '700px', overflow: 'scroll' }}>
                                        {contents.map(e => lineMessage(e))}
                                    </div>
                                    <div className='text-area-box'>
                                        <TextArea value={values.draft}
                                            className='content-area' name='draft' onChange={handleChange}
                                            onKeyDown={e => pressEnter(e, values.draft, setValues)} rows={5} />
                                    </div>
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