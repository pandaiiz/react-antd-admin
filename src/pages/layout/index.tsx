import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Menu, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link, Redirect, Route, Switch, useHistory } from 'react-router-dom'
import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import { defaultProps } from './_defaultProps';
import UserList from "../system/user";
import RoleList from "../system/role";
import MenuList from "../system/menu";
import Home from "../home";
import { getUserInfo } from "../../services/system/user";


const Layout = (props: any) => {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState({ name: 'xxx' })
    const { pathname } = props.location;

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            message.error('登录已过期，请重新登录')
            history.push('/login')
        } else {
            getUserInfo().then(res => setCurrentUser(res)).catch(() => {
                    history.push('/login')
                }
            )
        }

    }, [history]);


    const menu = (
        <Menu>
            <Menu.Item key="0">个人中心</Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="1" onClick={ () => {
                localStorage.removeItem('token')
                history.push('/login')
            } }>退出</Menu.Item>
        </Menu>
    );

    const dropDown = (
        <Dropdown overlay={ menu } trigger={ ['click'] }>
            <Button type='text' onClick={ e => e.preventDefault() }>
                <Avatar shape="square" size="small" icon={ <UserOutlined/> }/>
                <span style={ { marginLeft: 8 } }>{ currentUser.name }</span>
            </Button>
        </Dropdown>
    )

    return (
        <div style={ { height: '100vh', } }>
            <ProLayout
                { ...defaultProps }
                location={ { pathname } }
                // waterMarkProps={ { content: 'Pro Layout' } } 水印
                onMenuHeaderClick={ (e) => console.log(e) }
                menuItemRender={ (menuItemProps, defaultDom) => {
                    if (menuItemProps.isUrl || menuItemProps.children) {
                        return defaultDom;
                    }
                    if (menuItemProps.path && pathname !== menuItemProps.path) {
                        return <Link to={ menuItemProps.path }>{ defaultDom }</Link>;
                    }
                    return defaultDom;
                } }
                rightContentRender={ () => dropDown }
            >
                <PageContainer>
                    <Switch>
                        <Redirect from='/' exact to='/home'/>
                        <Route path='/home' component={ Home }/>
                        <Route path='/system/user' component={ UserList }/>
                        <Route path='/system/role' component={ RoleList }/>
                        <Route path='/system/menu' component={ MenuList }/>
                    </Switch>
                </PageContainer>
            </ProLayout>
        </div>
    );
};

export default Layout;
