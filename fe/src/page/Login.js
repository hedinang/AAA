import { Button, Col, Input, Row } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { login } from "../api/api";
import { Content } from "antd/es/layout/layout";
import { Formik } from "formik";
import GoogleLogin from 'react-google-login';
import FacebookLogin from "react-facebook-login";
// import { useEffect } from "react";
// import GoogleSSO from "./GoogleSSO";
import { auth, provider } from "../config/config";
import { signInWithPopup, signOut } from "firebase/auth";

export const Login = (props) => {

    let initialValues = {
        username: '',
        password: ''
    }


    const loginTypeList = ['default', 'google', 'facebook', 'test', 'logout']

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
    const responseGoogle = response => {
        console.log('aaa')
        // alert(response.access_token)

        // props.callback({
        //     type: "GMAIL",
        //     payload: response
        // })

    }
    const responseFacebook = response => {
        console.log(response);

    }
    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
    }
    const testLogin = async() => {
        console.log('aa')
        await signInWithPopup(auth, provider).then((data) => {
            console.log('aa')
            window.localStorage.setItem("user", data.user.email)
        })
    }

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('aa')
        }).catch((error) => {
            // An error happened.
        });
    }
    function showLogin(e, values, handleSubmit) {
        switch (e) {
            // case 'google':
            //     return <GoogleLogin
            //         style={{ color: 'red' }}
            //         clientId="399731219295-42coi6p2nb4jo4atjnivqk0ak6c989u7.apps.googleusercontent.com"
            //         secret='uiXMBKRMQ0OsuETAxz_08nea'
            //         uxMode="redirect"
            //         buttonText="Google"
            //         redirectUri="http://localhost:3000/login"
            //         onSuccess={responseGoogle}
            //         onFailure={responseGoogle}
            //         cookiePolicy={"single_host_origin"}
            //         className="GOOGLE"

            //     />
            // case 'facebook':
            //     return <FacebookLogin
            //         btnContent="Facebook"
            //         appId="1045728259369425"
            //         fields="name,email,picture"

            //         onSuccess={responseFacebook}
            //         onFailure={responseFacebook}
            //     />
            case 'test':
                // return <GoogleSSO />
                // return <Button type="primary"  onclick={e => userLogin(values, handleSubmit)}> Login</Button>
                return <Button type="primary" onClick={testLogin}> Login</Button>
            case 'logout':
                // return <GoogleSSO />
                // return <Button type="primary"  onclick={e => userLogin(values, handleSubmit)}> Login</Button>
                return <Button type="primary" onClick={logout}>Logout</Button>

            default:
                return <Button type="primary"
                    // onclick={testLogin}
                    onClick={e => userLogin(values, handleSubmit)}
                >Login</Button>

        }
    }
    // useEffect(() => {
    //     window.onload = function () {
    //         window.google.accounts.id.initialize({
    //             client_id: "399731219295-42coi6p2nb4jo4atjnivqk0ak6c989u7.apps.googleusercontent.com",
    //             callback: handleCredentialResponse
    //         });
    //         window.google.accounts.id.renderButton(
    //             document.getElementById("buttonDiv"),
    //             { theme: "outline", size: "large" }  // customization attributes
    //         );
    //         window.google.accounts.id.prompt(); // also display the One Tap dialog
    //     }
    // }, [])
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