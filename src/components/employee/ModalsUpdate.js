import React, { useEffect, useState } from 'react';
import { Modal, Select, Form, Avatar, Tooltip } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

//input
import ClockCircleOutlined from '@ant-design/icons/ClockCircleOutlined';
import { Input, Space, Row, Col } from 'antd';
import { getDept } from '../../services/serviceDept';
const ModalsUpdate = ({ triggerUpdateUser, user }) => {
    const { Option } = Select;
    const [modal2Open, setModal2Open] = useState(false);
    const [departement, setDepartement] = useState(user.department.name);
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [dept, setdept] = useState([]);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [isFetchDept, setisFetchDept] = useState(false)
    useEffect(() => {
        if (!isFetchDept)
        {

            getDept().then(rep => {
                setdept(rep.data.data);
                setisFetchDept(true)
            }).catch(err => {
                console.log('somme err', err);
            }).finally(() => {
            });
        }

    }, [isFetchDept]);


    function handleSubmt() {
        setConfirmLoading(true);
        triggerUpdateUser({
            ...user,
            departement,
            firstName,
            lastName
        })
            .then(rep => { if (rep) setModal2Open(false) })
            .catch(error => { console.error('Error updating user:', error) })
            .finally(() => {
                setConfirmLoading(false); // Reset loading state after API response
            });
    }

    return (
        <>
            {/* <Button type="primary" ghost onClick={() => setModal2Open(true)}>
                Update
            </Button> */}
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
                            firstName: firstName,
                            lastName: lastName,
                        }}
                    >

                        <Row>
                            <Col span={18}>
                                <Form.Item
                                    name="departement"
                                    label="Departement"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your departement!',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select departement"
                                        onChange={(value) => setDepartement(value)}
                                    >
                                        {dept.map((option) => (
                                            <Option key={option.id} value={option.id}>
                                                {option.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="firstName" label="First Name">
                                    <Input
                                        placeholder="first name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item name="lastName" label="Last Name">
                                    <Input
                                        placeholder="last name"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Avatar shape="square" size={100} icon={<UserOutlined />} />
                            </Col>

                        </Row>

                    </Form>
                </Space>
            </Modal>
        </>
    );
};
export default ModalsUpdate;