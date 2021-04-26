import React from 'react';

import { Button, Card, Tag } from 'antd';
import { CheckOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAccessByParentId } from "../../../services/system/access";

export type Status = {
    color: string;
    text: string;
};

export type TableListItem = {
    id: number;
    name: string;
    containers: number;
    creator: string;
    status: Status;
    type: number;
    createdAt: number;
    updatedAt: number;
};


const columns: ProColumns<TableListItem>[] = [
    {
        title: '模块名称',
        dataIndex: 'moduleName'
    },
    {
        title: '图标',
        dataIndex: 'icon',
        render: (_, record) => <Tag color={ record.status.color }>{ record.status.text }</Tag>,
    },
    {
        title: '排序',
        dataIndex: 'sort',
    },
    {
        title: '状态',
        dataIndex: 'status',
        render: status => status === 1 ? <CheckOutlined/> : <CloseOutlined/>,
    },
    {
        title: '描述',
        dataIndex: 'description',
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        valueType: 'dateTime',
        sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
        title: '修改时间',
        dataIndex: 'updatedAt',
        valueType: 'dateTime',
        sorter: (a, b) => a.updatedAt - b.updatedAt,
    },
    {
        title: '操作',
        key: 'option',
        valueType: 'option',
        render: () => [
            <Button key="1" type='text'>编辑</Button>,
            <Button key="2" type='text'>新增</Button>,
            <Button key="3" type='text'>删除</Button>
        ],
    },
];

const expandedRowRender = (item: any) => {
    return (
        <Card>
            <ProTable<TableListItem, { parentId: any }>
                columns={ [
                    { title: '名称', dataIndex: 'actionName' },
                    { title: '类型', dataIndex: 'type' },
                    { title: 'Url', dataIndex: 'url' },
                    { title: '排序', dataIndex: 'sort' },
                    {
                        title: 'Action',
                        dataIndex: 'operation',
                        key: 'operation',
                        valueType: 'option',
                        render: () => [
                            <Button type='text' key="Pause">Pause</Button>,
                            <Button type='text' key="Stop">Stop</Button>
                        ],
                    },
                ] }
                headerTitle={ false }
                search={ false }
                options={ false }
                rowKey="id"
                request={ (params, sorter, filter) => {
                    // eslint-disable-next-line no-param-reassign
                    params = { parentId: item.id }
                    return getAccessByParentId({ params, sorter, filter });
                } }
                expandable={ { expandedRowRender, rowExpandable: (record) => record.type !== 3 } }
                pagination={ false }
            />
        </Card>
    );
};

const MenuList = () => {
    return (
        <ProTable<TableListItem>
            columns={ columns }
            request={ (params, sorter, filter) => {
                return getAccessByParentId({ params, sorter, filter });
            } }
            rowKey="id"
            pagination={ {
                showQuickJumper: true,
            } }
            expandable={ { expandedRowRender } }
            search={ false }
            dateFormatter="string"
            headerTitle="嵌套表格"
            options={ false }
            toolBarRender={ () => [
                <Button key="show">查看日志</Button>,
                <Button key="out">
                    导出数据
                    <DownOutlined/>
                </Button>,
                <Button key="primary" type="primary">
                    创建应用
                </Button>,
            ] }
        />
    );
};

export default MenuList;
