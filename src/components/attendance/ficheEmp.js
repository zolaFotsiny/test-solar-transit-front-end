import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Col, Modal, Row } from 'antd';

//input
import { UserOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { formatDate } from '../../Utils/Date';
const FicheEmp = ({ user }) => {
    const [modal2Open, setModal2Open] = useState(false);


    useEffect(() => {
        console.log('asd', user);
    }, []);



    function handleSubmt() {

        setModal2Open(false);
    }


    return (
        <>
            <Button type="primary" ghost onClick={() => setModal2Open(true)}>
                Fiche
            </Button>

            <Modal
                title="Employee record"
                // centered
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
                    <Row>


                    </Row>
                    <Row>
                        <Col span={8}>
                            <Avatar shape="square" size={100} icon={<UserOutlined />} />
                        </Col>
                        <Col span={12}>
                            <p>
                                Fullname : <strong>{user.firstName + '  ' + user.lastName}</strong>
                            </p>
                            <p>
                                Department : <strong>{user.departmentId}</strong>
                            </p>

                            <p>
                                Registered since : <strong>{formatDate(user.createdAt)}</strong>
                            </p>
                        </Col>
                    </Row>
                </Space>

            </Modal>
        </>
    );
};
export default FicheEmp;