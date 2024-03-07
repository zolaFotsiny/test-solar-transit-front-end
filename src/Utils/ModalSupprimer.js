import React from 'react';
import { message, Popconfirm, Tooltip } from 'antd';
import { StopOutlined } from '@ant-design/icons';


const ModalSupprimer = ({ triggerDeleteUser, idDelete }) => (
    <Popconfirm
        title="Disable"
        description="Are you sure to disable this user?"
        onConfirm={() => confirm(triggerDeleteUser, idDelete)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
    >
        <Tooltip title="Delete">
            <StopOutlined />
        </Tooltip>
    </Popconfirm>
);
const confirm = (triggerDeleteUser, idDelete) => {
    triggerDeleteUser(idDelete);
    message.success('Click on Yes');
};
const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
};
export default ModalSupprimer;