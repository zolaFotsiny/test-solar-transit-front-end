import React, { useEffect, useState } from 'react';
import { Button, Modal, Switch, Form, Avatar, Tooltip } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

//input
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { Input, Space, Row, Col } from 'antd';


const DepartementUpdate = ({ triggerUpdateDept, dept }) => {
    const [modal2Open, setModal2Open] = useState(false);
    const [departement, setDepartement] = useState(dept.name);
    const [confirmLoading, setConfirmLoading] = useState(false);



    function handleSubmt() {
        // setConfirmLoading(true);

        console.log('dept', dept)


        // triggerUpdateDept({
        //     ...user,
        //     departement,
        // })
        //     .then(rep => { if (rep) setModal2Open(false) })
        //     .catch(error => { console.error('Error updating user:', error) })
        //     .finally(() => {
        //         setConfirmLoading(false); // Reset loading state after API response
        //     });
    }

    return (
        <>
            <Tooltip title="Update">
                <EditOutlined onClick={() => setModal2Open(true)} />
            </Tooltip>

            <Modal
                title="Modifier"
                centered
                open={modal2Open}
                onOk={() => handleSubmt()}
                confirmLoading={confirmLoading}
                onCancel={() => setModal2Open(false)}
            >
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                >
                    <Form
                        name="wrap"
                        labelAlign="left"
                        labelWrap
                        colon={false}
                        style={{ maxWidth: 600 }}
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        layout="vertical"
                        initialValues={{
                            Departement: departement,

                        }}
                    >

                        <Row>
                            <Col span={18}>
                                <Form.Item name="Departement" label="Departement">
                                    <Input
                                        placeholder="departement"
                                        onChange={(e) => setDepartement(e.target.value)}
                                    />
                                </Form.Item>
                            </Col>


                        </Row>

                    </Form>
                </Space>
            </Modal>
        </>
    );
};
export default DepartementUpdate;