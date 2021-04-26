import React, { forwardRef, memo, useImperativeHandle, useReducer } from 'react';
import { Button, Modal } from 'antd';
import ProForm, { ProFormSelect, ProFormText } from '@ant-design/pro-form';
import { createAccount, modifyAccountById } from "../../../services/system/user";
import { UserItem, UserModalInit, UserModalProps } from "./user-interface";
import { platformOption, statusOption } from "./select-options";

const UserModal = (props: UserModalProps, ref: any) => {

    const changeEnd = props.changeEnd

    const initData: UserModalInit = { modalVisit: false, record: {} }
    const reducer = (state: any, action: UserModalInit): UserModalInit => ({
        modalVisit: action.modalVisit,
        record: action.record
    })
    const [state, dispatch] = useReducer(reducer, initData)

    useImperativeHandle(ref, () => ({
        changeModalVisit: (type: boolean, record: UserItem) => dispatch({ modalVisit: type, record })
    }));

    const { modalVisit, record } = state

    return (
        <Modal destroyOnClose centered title={ record ? "编辑用户" : "新增用户" } visible={ modalVisit }
               footer={ false } onCancel={ () => dispatch({ modalVisit: false, record: {} }) }>
            <ProForm
                title={ record ? "编辑用户" : "新增用户" }
                layout='horizontal'
                labelCol={ { span: 4 } }
                wrapperCol={ { span: 18 } }
                initialValues={ record }
                submitter={ {
                    render: (prop) => {
                        return [
                            <div style={ { textAlign: 'right' } }>
                                <Button type="primary" key="submit" onClick={ () => prop.form?.submit?.() }>
                                    提交
                                </Button>
                            </div>,
                        ];
                    },
                } }
                onFinish={ async (values) => {
                    record ? await modifyAccountById(record.id, values) : await createAccount(values);
                    dispatch({ modalVisit: false, record: {} });
                    changeEnd()
                } }
            >
                <ProFormText name="username" label="用户名" placeholder="请输入用户名"
                             rules={ [{ required: true, message: '请输入用户名!' }] }/>
                <ProFormText name="mobile" label="手机号码" placeholder="请输入手机号码"/>
                <ProFormText name="email" label="邮箱" placeholder="请输入邮箱"/>
                <ProFormSelect
                    name="status"
                    label="状态"
                    placeholder="请选择状态"
                    initialValue={ 1 }
                    valueEnum={ statusOption }
                />
                <ProFormSelect
                    name="platform"
                    label="平台"
                    valueEnum={ platformOption }
                    placeholder="请选择用户平台"
                    rules={ [{ required: true, message: '请选择用户平台!' }] }
                />
            </ProForm>
        </Modal>
    );
};
export default memo(forwardRef(UserModal));
