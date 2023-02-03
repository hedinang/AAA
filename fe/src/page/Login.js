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
    console.log(process.env.ROOT_URL)
    // const butttonStyle = {
    //     google: {
    //         // backgroundColor: '#df3e2e',
    //         // width: '100%',
    //         // marginTop: '10px'
    //     },
    //     facebook: {
    //         backgroundColor: '#312edf',
    //         width: '100%',
    //         marginTop: '10px'
    //     },
    //     default: {
    //         backgroundColor: '#2edf33',
    //         width: '100%',
    //         marginTop: '10px'
    //     }
    // }

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
                                <Col span={9}></Col>
                                <Col span={2}>Username</Col>
                                <Col span={4}><Input name="username" onChange={handleChange} /></Col>
                                <Col span={9}></Col>
                            </Row>
                            <Row style={{ marginTop: '1vh' }}>
                                <Col span={9}></Col>
                                <Col span={2}>Password</Col>
                                <Col span={4}><Input.Password name="password" onChange={handleChange}
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} /></Col>
                                <Col span={9}></Col>
                            </Row>
                            <Row style={{ marginTop: '1vh' }}>
                                <Col span={11}></Col>
                                <Col span={2}>
                                    {loginTypeList.map(e => showLogin(e, values, handleSubmit))}
                                </Col>
                                <Col span={11}></Col>
                            </Row>
                        </>
                    )}
                </Formik>
            </Content>
        </>
    )
}