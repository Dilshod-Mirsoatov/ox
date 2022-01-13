import Head from 'next/head'
import {Button, Col, Form, Input, Row} from "antd";
import {connect, useDispatch} from "react-redux";
import {AUTH} from "../store/types";
import {LoadingOutlined} from "@ant-design/icons";


function Login(props) {
    const {loader} = props;
    const dispatch = useDispatch()
    const {form} = Form.useForm();
    const onFinish = (value)=>{
        if(!loader){
            dispatch({type: AUTH, payload: {
                    ...value, _subdomain: 'toko'
                }});
        }
    }
  return (
    <div className="app app-login">
        <Head>
            <title> Login </title>
            <meta name="description" content="Login page"/>
        </Head>
        <Row>
            <Col span={12} offset={12}>
                <div className="vh-100 shadow d-flex align-item-center justify-content-center">
                    <Row className="w-100">
                        <Col span={16} offset={4}>
                            <h1 className="text-center">Tizimga kirish</h1>
                            <Form
                                name="loginForm"
                                onFinish={onFinish}
                                layout="vertical"
                                form={form}
                                initialValues={{
                                    _username: 'user_task',
                                    _password: 'user_task'
                                }}
                            >
                                <Form.Item name="_username" label="Login"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: 'Logini kirting',
                                               },
                                           ]}>
                                    <Input placeholder="input placeholder" />
                                </Form.Item>
                                <Form.Item name="_password" label="Parol"
                                           rules={[
                                               {
                                                   required: true,
                                                   message: 'Parolni kirting',
                                               },
                                           ]}>
                                    <Input type="password" placeholder="input placeholder" />
                                </Form.Item>
                                <Form.Item >
                                    <Button disabled={loader} type="primary" htmlType="submit">
                                        {
                                            loader ?
                                                <LoadingOutlined/>
                                                : ''
                                        }
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    </div>
  )
}
const propsToState = state => {
    return {
        loader: state?.loader
    }
};
export default connect(propsToState, null)(Login);
