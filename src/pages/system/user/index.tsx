import React, { useRef } from 'react';
import { deleteAccountById, getUsers } from "../../../services/system/user";
import { Button, Popconfirm, Space } from "antd";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import UserModal from "./UserModal";
import { UserItem, UserModalRef } from "./user-interface";
import { platformOption, statusOption } from "./select-options";

const UserList = () => {
    const [proTableRef, userModalRef] = [useRef<ActionType>(), useRef<UserModalRef>()];
    const columns: ProColumns<UserItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'index',
            align: 'center'
        },
        {
            title: '用户名',
            dataIndex: 'username',
            align: 'center'
        },
        {
            title: '手机',
            dataIndex: 'mobile',
            align: 'center'
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            align: 'center'
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
            sorter: (a: any, b: any) => a.createdAt - b.createdAt,
            search: false,
            align: 'center'
        },
        {
            title: '更新时间',
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
            sorter: (a: any, b: any) => a.updatedAt - b.updatedAt,
            search: false,
            align: 'center'
        },
        {
            title: '账户状态',
            dataIndex: 'status',
            render: (status) => statusOption.get(status as number),
            align: 'center'
        },
        {
            title: '平台',
            dataIndex: 'platform',
            render: (platform) => platformOption.get(platform as number),
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: 'center',
            width: 140,
            render: (text: any, record: UserItem) => (
                <Space size="middle">
                    <Button type='link' onClick={ () => openModal(record) }>编辑</Button>
                    <Button type='link'>分配角色</Button>
                    <Button type='link'>
                        <Popconfirm title="确认删除吗？" onConfirm={ () => removeItem(record.id) } okText='确认'
                                    cancelText='取消'>删除</Popconfirm>
                    </Button>
                </Space>
            ),
        },
    ];
    const openModal = (record?: UserItem) => userModalRef.current?.changeModalVisit(true, record);
    const changeEnd = () => proTableRef.current?.reload();
    const removeItem = async (userId: any) => {
        await deleteAccountById(userId);
        proTableRef.current?.reload();
    };

    return (
        <>
            <ProTable<UserItem>
                actionRef={ proTableRef }
                columns={ columns }
                request={ async (params, sorter, filter) => {
                    return getUsers({ params, sorter, filter })
                } }
                search={ false }
                rowKey="id"
                options={ { search: true } }
                toolBarRender={ () => [
                    <Button type="primary" key="primary" onClick={ () => openModal() }>新增</Button>
                ] }
            />
            <UserModal ref={ userModalRef } changeEnd={ changeEnd }/>
        </>

    );
}

export default UserList;
