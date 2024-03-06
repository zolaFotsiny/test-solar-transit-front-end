import React, { useState } from 'react';

import { Button, Modal, Form, Tooltip } from 'antd';
import { Input, Space, Row, Col } from 'antd';
//input
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
const DepartementAdd = ({ triggerInsertEmp }) => {
    const [modal2Open, setModal2Open] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        // Focus on the first form field when the modal is opened
        if (modal2Open)
        {
            const firstFieldName = Object.keys(form.getFieldsValue())[0];
            form.setFieldsValue({ [firstFieldName]: form.getFieldValue(firstFieldName) });
        }
    }, [modal2Open, form]);



    function handleSubmt() {
        form
            .validateFields()
            .then((values) => {
                console.log('test', values);
                // Trigger the callback to add department with the validated values
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
            <Tooltip title="Add Departement">
                <Button type="primary" onClick={() => setModal2Open(true)} icon={<PlusOutlined />}></Button>
            </Tooltip>




            <Modal
                title="Add Departement"
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
                            <Col span={24}>
                                <Form.Item
                                    label="departement"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input departement name!',
                                        },
                                    ]}>
                                    <Input

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
export default DepartementAdd;