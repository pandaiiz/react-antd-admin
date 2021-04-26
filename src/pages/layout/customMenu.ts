export default [
    {
        path: '/',
        name: 'home',
    },
    {
        name: '系统设置',
        children: [
            {
                path: '/system/menu',
                name: 'menu',
                exact: true,
            },
        ],
    },
];
