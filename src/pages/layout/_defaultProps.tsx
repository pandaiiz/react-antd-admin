import { CrownOutlined, SmileOutlined } from '@ant-design/icons';

export const defaultProps = {
    route: {
        path: '/',
        routes: [
            {
                path: '/home',
                name: '首页',
                icon: <SmileOutlined/>,
            },
            {
                path: '/system',
                name: '系统设置',
                icon: <CrownOutlined/>,
                routes: [
                    {
                        path: '/system/user',
                        name: '用户管理',
                        icon: <CrownOutlined/>,
                    },
                    {
                        path: '/system/role',
                        name: '角色管理',
                        icon: <CrownOutlined/>,
                    },
                    {
                        path: '/system/menu',
                        name: '菜单管理',
                        icon: <CrownOutlined/>,
                    },
                ],
            },
        ],
    },
    location: {
        pathname: '/',
    },
};

