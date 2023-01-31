import { Button, Col, Modal, Row } from "antd";
import { Typography } from 'antd';
import { editUser } from "../../api/api";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import _ from 'lodash'
const { Text } = Typography;
export const ModalEditUser = ({ show, close, rawData, editSuccess }) => {

    const initialValues = {
        id: rawData?.id,
        email: rawData?.email,
        password: rawData?.password,
        firstName: rawData?.first_name,
        lastName: rawData?.last_name,
        country: rawData?.country,
        phoneNumber: rawData?.phone_number,
        position: rawData?.position
    }

    const save = async (e, resetForm) => {
        let result = await editUser(e)
        if (result.status === 'OK') {
            editSuccess()
            resetForm()
        } else {
            toast(result.message);
        }

    }
    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email()
                    .required("Email not blank"),
                password: Yup.string()
                    .required("Password not blank"),
                firstName: Yup.string()
                    .required("First name not blank")
            })}
        >
            {({ resetForm, values, errors, touched, setFieldValue, handleSubmit }) => (
                <Modal
                    open={show}
                    title="Edit user"
                    keyboard={false}
                    closable={false}
                    footer={[
                        <Button onClick={e => {
                            handleSubmit()
                            if (!_.isEmpty(errors)) {
                                toast("Validation error");
                                return;
                            }
                            save(values, resetForm)
                        }} type="primary">
                            Save
                        </Button>,
                        <Button
                            onClick={() => {
                                resetForm()
                                close()
                            }}
                            type="primary">
                            Cancel
                        </Button>
                    ]}
                    width={650}
                >

                    <Form>
                        <Row>
                            <Col span={7} ><Text strong> Email:</Text></Col>
                            <Col span={17} >
                                <Field
                                    value={values?.email}
                                    onChange={e => setFieldValue('email', e.currentTarget.value)}
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback" style={{ color: 'red' }}>{errors.email}</div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} ><Text strong> Passowrd:</Text></Col>
                            <Col span={17} >
                                <Field
                                    value={values?.password}
                                    onChange={e => setFieldValue('password', e.currentTarget.value)}
                                />
                                {errors.password && touched.password && (
                                    <div className="input-feedback" style={{ color: 'red' }}>{errors.password}</div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} ><Text strong> First name:</Text></Col>
                            <Col span={17} >
                                <Field
                                    value={values?.firstName}
                                    onChange={e => setFieldValue('firstName', e.currentTarget.value)}
                                />
                                {errors.firstName && touched.firstName && (
                                    <div className="input-feedback" style={{ color: 'red' }}>{errors.firstName}</div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} ><Text strong> Last name:</Text></Col>
                            <Col span={17} ><Field
                                value={values?.lastName}
                                onChange={e => setFieldValue('lastName', e.currentTarget.value)}
                            />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7} ><Text strong> Country:</Text></Col>
                            <Col span={17} ><Field
                                value={values?.country}
                                onChange={e => setFieldValue('country', e.currentTarget.value)}
                            /></Col>
                        </Row>
                        <Row>
                            <Col span={7} ><Text strong> Phone number:</Text></Col>
                            <Col span={17} ><Field
                                value={values?.phoneNumber}
                                onChange={e => setFieldValue('phoneNumber', e.currentTarget.value)}
                            /></Col>
                        </Row>
                        <Row>
                            <Col span={7} ><Text strong> Position:</Text></Col>
                            <Col span={17} ><Field
                                value={values?.position}
                                onChange={e => setFieldValue('position', e.currentTarget.value)}
                            /></Col>
                        </Row>
                    </Form>
                </Modal>
            )}
        </Formik>
    )
}