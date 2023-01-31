import { Button, Col, Input, Row } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { login } from "../api/api";
import { Content } from "antd/es/layout/layout";
import { Formik } from "formik";

export const Login = () => {

    let initialValues = {
        username: '',
        password: ''
    }
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
    return (
        <>
            <Content >
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                >
                    {({ resetForm, values, errors, touched, handleChange, handleSubmit }) => (
                        <>
                            <Row style={{ marginTop: '30vh' }}>
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
                                <Col span={2}><Button type="primary" onClick={e => userLogin(values, handleSubmit)}>Login</Button></Col>
                                <Col span={11}></Col>
                            </Row>
                        </>
                    )}
                </Formik>
            </Content>
        </>
    )
}