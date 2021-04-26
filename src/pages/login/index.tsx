import { Layout, message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import { login } from "../../services/login";

const Login = () => {
    const history = useHistory()
    return (
        <Layout style={ { height: '100vh' } }>
            <Layout.Content style={ { width: 330, margin: '20vh auto', } }>
                <ProForm
                    onFinish={ async (data) => {
                        const res = await login(data)
                        localStorage.setItem('token', res.token)
                        message.success('登录成功');
                        history.replace('/')
                    } }
                    submitter={ {
                        searchConfig: { submitText: '登录' },
                        render: (_, dom) => dom.pop(),
                        submitButtonProps: { size: 'large', style: { width: '100%' } },
                    } }
                >
                    <h1 style={ { textAlign: 'center', marginBottom: 40, } }>立信商行</h1>
                    <ProFormText
                        fieldProps={ {
                            size: 'large',
                            prefix: <UserOutlined/>,
                        } }
                        name="username"
                        placeholder="请输入帐号"
                        rules={ [
                            {
                                required: true,
                                message: '请输入帐号!',
                            }
                        ] }
                    />
                    <ProFormText.Password
                        fieldProps={ {
                            size: 'large',
                            prefix: <LockOutlined/>,
                        } }
                        name="password"
                        placeholder="请输入密码"
                        rules={ [
                            {
                                required: true,
                                message: '请输入密码!',
                            }
                        ] }
                    />
                </ProForm>
            </Layout.Content>
        </Layout>
    );
};

export default Login;
