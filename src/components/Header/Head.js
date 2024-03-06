import React from 'react';
import { Layout, theme, Row, Col, Space, Avatar } from 'antd';
import { BellOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default function Head({ triggerInsertEmp }) {
    const iconSize = 24; // Set the desired size for the icons
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Header style={{ padding: 0, background: colorBgContainer }}>
            <Row justify="space-between" align="middle">
                <Col>

                </Col>
                <Col>
                    <Space size={18}>
                        {/* <SettingOutlined style={{ fontSize: iconSize }} />
                        <BellOutlined style={{ fontSize: iconSize }} />
                        <Avatar size="large" icon={<UserOutlined />} /> */}
                    </Space>
                </Col>
            </Row>
        </Header>
    );
}
