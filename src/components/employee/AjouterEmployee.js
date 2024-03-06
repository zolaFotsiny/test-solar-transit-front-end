import React, { useState } from 'react';

import { Button, Modal, message, Form, Avatar, Tooltip } from 'antd';
import { Input, Space, Row, Col } from 'antd';
//input
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { Select } from 'antd';
import { getDept } from '../../services/serviceDept';



const AjouterEmployee = ({ triggerInsertEmp }) => {
    const [modal2Open, setModal2Open] = useState(false);
    const [dept, setdept] = useState([]);
    // Use Form instance to manage form state
    const [form] = Form.useForm();
    useEffect(() => {
        // Focus on the first form field when the modal is opened
        if (modal2Open)
        {
            const firstFieldName = Object.keys(form.getFieldsValue())[0];
            form.setFieldsValue({ [firstFieldName]: form.getFieldValue(firstFieldName) });
        }

        getDept().then(rep => {

            setdept(rep.data.data);
        }).catch(err => {
            console.log('somme err', err);
        }).finally(() => {
        });



    }, [modal2Open, form]);


    const { Option } = Select;



    function handleSubmt() {
        form
            .validateFields()
            .then((values) => {

                // Trigger the callback to add employee with the validated values
                triggerInsertEmp(values);
                // Close the modal and reset form fields
                setModal2Open(false);
                form.resetFields();
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
            });
    }
    const handleEnterPress = (event) => {
        if (event.key === 'Enter')
        {
            event.preventDefault();
            handleSubmt();
        }
    };
    return (
        <>
            <Tooltip title="Add Employee">
                <Button type="primary" onClick={() => setModal2Open(true)} icon={<PlusOutlined />}></Button>
            </Tooltip>
            <Modal
                title="Add Employee"
                centered
                open={modal2Open}
                onOk={() => handleSubmt()}
                onCancel={() => setModal2Open(false)}
            >
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                >
                    <Form
                        form={form}
                        name="wrap"
                        labelAlign="left"
                        colon={true}
                        layout="vertical"
                        onKeyPress={handleEnterPress}
                    >
                        <Row>
                            <Col span={18}>
                                <Form.Item
                                    label="Id"
                                    name="employeeIdentifier"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your id!',
                                        },
                                        {
                                            validator: (_, value) => {
                                                if (!value || /^[0-9]+$/.test(value))
                                                {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('Please enter a valid number for ID!');
                                            },
                                        },
                                    ]}>
                                    <Input />
                                </Form.Item>


                                <Form.Item
                                    label="Departement"
                                    name="departmentId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your departement!',
                                        },
                                    ]}
                                >
                                    <Select>
                                        {dept.map((option) => (
                                            <Option key={option.id} value={option.id}>
                                                {option.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>


                                <Form.Item
                                    label="first Name"
                                    name="firstName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your first Name!',
                                        },
                                    ]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Last Name"
                                    name="lastName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your last name!',
                                        },
                                    ]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col style={{ paddingLeft: 16 }}>

                                <Avatar shape="square" size={100} icon={<UserOutlined />} />
                            </Col>

                        </Row>

                    </Form>
                </Space>
            </Modal>
        </>
    );
};
export default AjouterEmployee;