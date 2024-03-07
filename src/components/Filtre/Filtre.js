import React, { useEffect } from 'react';
import { Form, Row, Col, Input, Button, DatePicker, Tooltip, Flex } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment'
export default function Filtre({ criteria, children, triggerFiltre }) {
    useEffect(() => {
        console.log('criteria', criteria);
    }, []);

    // Use Form instance to manage form state
    const [form] = Form.useForm();

    const { RangePicker } = DatePicker;


    function formatFiltreObject(filterInput) {
        console.log('huhuhuhu', filterInput);
        let filtreNonNull = {};
        //traitemennt du formulaire vide
        Object.keys(filterInput).forEach((key) => {
            // Check if the value is not empty or undefined
            if (filterInput[key]) {
                filtreNonNull[key] = filterInput[key];
                console.log('Filtre trier', JSON.stringify(filtreNonNull));


            }
        });
        return filtreNonNull;
        // sortie form non nu

    }

    function handleSubmtFiltre() {
        form
            .validateFields()
            .then((values) => {
                // console.log('non format', values);
                const formattedFiltre = formatFiltreObject(values);
                triggerFiltre(formattedFiltre);
                console.log('repreprperperp', formattedFiltre);
            })
            .catch((errorInfo) => {
                console.log('Validation Failed:', errorInfo);
            });
    }

    return (
        <>
            {/* <h3>Filter</h3> */}
            <Flex justify='flex-end' align='center'>

                <Form
                    form={form}
                    name="wrap"
                    labelAlign="left"
                    colon={true}
                    layout="vertical"
                >
                    {/* <Row gutter={[16, 16]} align="right"> */}
                    <Row gutter={[16, 16]} justify="start">
                        {criteria.map((crt, index) => (
                            <Col key={index}>
                                <Form.Item label={crt.label} name={crt.name}>
                                    {crt.type === 'date' ? (
                                        <RangePicker style={{ width: '100%' }} />
                                    ) : (
                                        <Input />
                                    )}
                                </Form.Item>
                            </Col>
                        ))}
                        <Col>

                            <Form.Item label=" " style={{ display: 'flex', alignItems: 'center' }}>

                                <Tooltip title='Search'>

                                    <Button
                                        ghost
                                        type="primary"
                                        onClick={() => handleSubmtFiltre()}
                                        icon={<SearchOutlined />}
                                        style={{ marginRight: '8px' }} // Adjust margin as needed
                                    >
                                    </Button>
                                </Tooltip>

                                {children && React.isValidElement(children) && React.cloneElement(children, { handleSubmtFiltre })}
                            </Form.Item>
                        </Col>
                    </Row>

                </Form>
            </Flex>
        </>
    );
}
