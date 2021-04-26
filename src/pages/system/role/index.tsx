import React from 'react';
import { Button, Space } from "antd";
import ProTable, { ProColumns } from "@ant-design/pro-table";
import { getRoles } from "../../../services/system/role";


type RoleItem = {
    id: number;
    name: string;
    field: string;
    createdAt: string;
    updateAt: string;
};

const columns: ProColumns<RoleItem>[] = [
    {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
    },
    {
        title: '名称',
        dataIndex: 'name',
        search: false,
    },
    {
        title: '字段',
        dataIndex: 'field',
        search: false,
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        valueType: 'dateTime',
        sorter: (a: any, b: any) => a.createdAt - b.createdAt,
        search: false,
    },
    {
        title: '更新时间',
        dataIndex: 'updateAt',
        valueType: 'dateTime',
        search: false,
    },
    {
        title: '操作',
        dataIndex: 'action',
        search: false,
        render: (text: any, record: any) => (
            <Space size="middle">
                <Button type='text'>修改{ record.id }</Button>
                <Button type='text'>删除</Button>
            </Space>
        ),
    },
];

const RoleList = () => {
    return (
        <ProTable<RoleItem>
            columns={ columns }
            request={ async (params, sorter, filter) => {
                return getRoles({ params, sorter, filter })
            } }
            search={ false }
            rowKey="id"
            options={ { search: true } }
            headerTitle="角色管理"
            toolBarRender={ () => [
                <Button type="primary" key="primary">新增</Button>
            ] }
        />
    );
}

export default RoleList;
