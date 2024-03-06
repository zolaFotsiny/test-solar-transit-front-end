
import React, { useState } from 'react';
import { Layout, Menu, theme, Divider } from 'antd';

import {

    UsergroupAddOutlined
} from '@ant-design/icons';

import Test from './components/Test';
const { Content, Sider, Footer } = Layout;

const Index = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('1');

    const items = [
        getItem('Test', '1', <UsergroupAddOutlined />),
    ];

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = ({ key }) => {
        setSelectedMenuItem(key);
    };
    function getItem(label, key, icon, children) {
        return {
            key,
            icon,
            children,
            label,
        };
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* //Navigation */}
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => { console.log('collapse mode', value); setCollapsed(value) }}>
                <div className="demo-logo-vertical" />
                <img src="image/logo.png" alt="Avatar" style={{ marginTop: '20px', width: collapsed ? 40 : 100, height: collapsed ? 40 : 100, borderRadius: '50%' }} />
                <h3 style={{ color: 'white', display: collapsed ? 'none' : 'block', }}>AgileMind Solutions</h3>
                <Divider style={{ color: 'white', borderColor: 'white' }}> </Divider>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onClick={handleMenuClick}
                />
            </Sider>
            {/* //End Navigation */}
            <Layout>

                {/* //Header */}

                {/* //End Header */}


                {/* Content */}
                <Content style={{ margin: '0 16px' }}>
                    <div
                        style={{
                            margin: '16px 0',
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {
                            selectedMenuItem === '1' &&
                            <>
                                <Test ></Test>
                            </>
                        }


                    </div>
                </Content>
                {/* End Content */}

                {/* Footer */}
                <Footer style={{ textAlign: 'center' }}>Raherinjato Andriamarosoa Angela &copy; {new Date().getFullYear()}</Footer>
                {/* End Footer */}
            </Layout>
        </Layout>

    );
};
export default Index;