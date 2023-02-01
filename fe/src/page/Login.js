import { Button, Col, Input, Row } from "antd"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { login } from "../api/api";
import { Content } from "antd/es/layout/layout";
import { Formik } from "formik";
import GoogleLogin from 'react-google-login';
import FacebookLogin from "react-facebook-login";
// import { useEffect } from "react";
// import GoogleSSO from "./GoogleSSO";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';

export const Login = (props) => {

    let initialValues = {
        username: '',
        password: ''
    }

    const firebaseConfig = { "type": "service_account", "project_id": "mechanicsmarketplace-13b12", "private_key_id": "7fa5356c24a60a1a56d7ec4d031f6c0748a925c0", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDk3ShTuP5R9v/l\n8WOcsS+ehC2dB4qKQbxyq6d7xCycMYlk+WqLrdPSsO4Vdm7G403JPsd+RDG03EoO\n5tk/CsdSwPLtie6/0yAv2dPACy8ZmB0sOTUKVazkm10AiRepCpV24ioZBGHuZs8P\nZ9JsUQSvwxwDFJjRE5OT4z0UeGEOMancQgNWcqb0eRGUw5z6xKUIH18grOUwB5d5\nJuVZGv1UpwH3Im3UOawJSjMBwjphm3gYstSvHGA/J3klb5lxh4oLslW7WIvLW8sQ\niXn3xW3t6ojJBzFP8HMuS2F2kmBqtyWNeYLhNymihlao47XcBm5Pt5hsO358zHIR\n1XnIgXUhAgMBAAECggEAA7X4yYu8NurC+TDd6TxfvemdfjhxNP7uHetd2LZEdWdh\nt40KPtfLkZTcFWXBU9D7ccYGcMwNBMZWHpH8Z4bmlrdJcRPNltdm5BO7eNeNlNQI\nNA985k0fk6jXvBKc+zkQVZhC77soFdgdpx2rNiWlpm5q0bt3o1s2hz014DM3+qWI\nY/2BkPWxqyqyxVqu5l5uCGWnh1nIl7IT8mELW6zfZ/No49S7Ytpr1xgKp9/mR1Jv\nWNsP45pijLEHPF2aSvZex7XvfiA3RhNOZdrl+wUCKArps0dv1oPjE6+tBK6+Byqe\nEZdKcAWWaJVgrAYZJYYYb3ym5MERonWU/x7HHqrUIQKBgQD+9z52w3KypjIk7W/9\norq/ruwXWsEujysYyR50OjPB5MkcsuSMPgl59mz1bHoyEp8f8JQ7tamh+Lz/9/ek\n6t18nGlBAzbAlv+er2QRZqFx/k1Q2TOtgMoJEvLfj2Xwy1LaL/5Z7SQpymSasi1O\noN50BO847+oRtgffjhmSpTABMQKBgQDlys8yeyWgUino0QP/7/mocG70S6wvsSwV\nDsYp8DNubryY/WJMDLQb5/Mxni6Mk5gsmhfabswOFtEepmplUVpnCOfiQ2tyaw7g\ne7IUuAz29HIgfe6Hduv4jxqLJuwumR+EcP+vbYxn974s+b/JtHUrgkMOeJ+B6OUq\nmjF4gxA28QKBgQClinQU+itjUMLn9P2siVaFFBaXx0X8a9pIenR6dDucnWXyazg2\n0iSm+leeNXNVRX/pZfNonTdpQa286AvzGMb7nDY+js6i1qdbKXdoUOFruPgMESob\nca47nADzJBDE+c5ueZDEZFMBizYstpjyH0Kvw3Bq4GJyY2TTQljaPMRhUQKBgAEn\nUHz3Y0v3vaAelH+Pa9htoBD35EhlAkykw1fojcmLIsU92GV7VtghBPaFzcQE5amr\nqFz/W2TitnAJ89TIYMTNpaRcJEjxwqRb2pwCBIak2YHSQAVMEokv5rk2G89sE11t\n18rAqQjIlJrTMiRIFKKAR+flsR9M1QGuvnrVZZpxAoGBAMIv4IKW1cecu/UN9S3t\nbYHSeyxzlLX9BvdwS8oSrIv1/rE8XEA9uPvTKjcq2ZGXpE7acmiYijhI1JGLVr+f\nz7PbMDfguKyMzqfABfGM664+1XRVeqaf1PNvbT9lVLgBk98SWsTCCGIThUW3Kfjz\nwqtjwxbeHpd5zbJnmVSHbZOx\n-----END PRIVATE KEY-----\n", "client_email": "firebase-adminsdk-kwqrp@mechanicsmarketplace-13b12.iam.gserviceaccount.com", "client_id": "113203010039887583505", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kwqrp%40mechanicsmarketplace-13b12.iam.gserviceaccount.com" }
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const loginTypeList = ['default', 'google', 'facebook', 'test']

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
    const testLogin = () => {
        getRedirectResult(auth)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access Google APIs.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });



    }

    function showLogin(e) {
        switch (e) {
            case 'google':
                return <GoogleLogin
                    style={{ color: 'red' }}
                    clientId="399731219295-42coi6p2nb4jo4atjnivqk0ak6c989u7.apps.googleusercontent.com"
                    secret='uiXMBKRMQ0OsuETAxz_08nea'
                    uxMode="redirect"
                    buttonText="Google"
                    redirectUri="http://localhost:3000/login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                    className="GOOGLE"

                />
            case 'facebook':
                return <FacebookLogin
                    btnContent="Facebook"
                    appId="1045728259369425"
                    fields="name,email,picture"

                    onSuccess={responseFacebook}
                    onFailure={responseFacebook}
                />
            case 'test':
                // return <GoogleSSO />
                return <Button onclick={testLogin}> Login google</Button >
            default:
                return <Button type="primary"
                //  onClick={e => userLogin(values, handleSubmit)}
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
                                    {loginTypeList.map(e => showLogin(e))}
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