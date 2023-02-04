import React from 'react';
import { Button, Col, Input, Row } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { login } from "../api/api";
import { Content } from "antd/es/layout/layout";
import { Formik } from "formik";
import { auth, google, facebook } from "../config/config";
import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import imgFb from "../asset/img/login3rd/f2.svg";
import imgGg from "../asset/img/login3rd/g4.svg";

export const Login = () => {
    let initialValues = {
        username: '',
        password: ''
    }
    const loginTypeList = ['default', 'google', 'facebook']

    const userLogin = async (values, handleSubmit) => {
        let response = await login(values)
        if (response.data) {
            // window.localStorage.setItem('token', response.data.id)
            window.localStorage.setItem('user', response.data.name)
            window.localStorage.setItem('userId', response.data.id)
            window.location.pathname = '/'
        } else {
            alert('Login failed!')
        }
    }

    const loginGoogle = () => {
        signInWithPopup(auth, google).then((data) => {


            window.localStorage.setItem("user", data.user.email)
            window.location.pathname = '/'
        })
    }
    const loginFacebook = () => {
        signInWithPopup(auth, facebook).then((data) => {
            console.log('A: ' + data)
            window.localStorage.setItem("user", data.user.email)
            window.location.pathname = '/'
        })
    }

    function showLogin(e, values, handleSubmit) {
        switch (e) {
            case 'facebook':
                return <Button className='btn-fb' onClick={loginFacebook}>
                    <img className='img-login' src={imgFb} alt='facebook' />
                    <span className="big">Facebook</span>
                </Button>
            case 'google':
                return <Button className='btn-gg' onClick={loginGoogle}>
                    <img className='img-login' src={imgGg} alt='google' />
                    <span className="big">Google</span>
                </Button>

            default:
                return <>
                    <Button className='btn-default' onClick={e => userLogin(values, handleSubmit)}>Login</Button>
                    <div className='or-login-option'>OR</div>
                </>

        }
    }
    return (
        <>
            <Content >
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                >
                    {({ resetForm, values, errors, touched, handleChange, handleSubmit }) => (
                        <>
                            <Row style={{ marginTop: '15vh' }}>
                                <Col lg={9} sm={2} xs={0}></Col>
                                <Col lg={2} sm={6} xs={10}>Username</Col>
                                <Col lg={4} sm={14} xs={14}><Input name="username" onChange={handleChange} /></Col>
                                <Col lg={9} sm={2} xs={0}></Col>
                            </Row>
                            <Row style={{ marginTop: '1vh' }}>
                                <Col lg={9} sm={2} xs={0}></Col>
                                <Col lg={2} sm={6} xs={10}>Password</Col>
                                <Col lg={4} sm={14} xs={14}><Input.Password name="password" onChange={handleChange}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} /></Col>
                                <Col lg={9} sm={2} xs={0}></Col>
                            </Row>
                            <Row style={{ marginTop: '1vh' }}>
                                <Col lg={11} sm={10} xs={4}></Col>
                                <Col lg={2} sm={4} xs={16}>
                                    {loginTypeList.map(e => showLogin(e, values, handleSubmit))}
                                </Col>
                                <Col lg={11} sm={10} xs={4}></Col>
                            </Row>
                        </>
                    )}
                </Formik>
            </Content>
        </>
    )
}