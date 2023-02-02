import { Button, Col, Input, Row } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { login } from "../api/api";
import { Content } from "antd/es/layout/layout";
import { Formik } from "formik";
import { auth, google, facebook } from "../config/config";
import { signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";

export const Login = () => {
    const butttonStyle = {
        google: {
            backgroundColor: 'red',
            width: '100%',
            marginTop: '10px'
        },
        facebook: {
            backgroundColor: 'blue',
            width: '100%',
            marginTop: '10px'
        },
        default: {
            backgroundColor: 'yellow',
            width: '100%',
            marginTop: '10px'
        }
    }

    let initialValues = {
        username: '',
        password: ''
    }
    const loginTypeList = ['default', 'google', 'facebook', 'logout']

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
    const logout = () => {
        signOut(auth, facebook)
    }

    function showLogin(e, values, handleSubmit) {
        switch (e) {
            case 'facebook':
                return <Button style={butttonStyle.facebook} type="primary" onClick={loginFacebook}>Login by Facebook</Button>
            case 'google':
                return <Button style={butttonStyle.google} type="primary" onClick={loginGoogle}>Login by Google</Button>
            case 'logout':
                return <Button style={butttonStyle.google} type="primary" onClick={logout}>Logout</Button>
            default:
                return <Button style={butttonStyle.default} type="primary" onClick={e => userLogin(values, handleSubmit)}>Login</Button>

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