
import React, { useState } from 'react';
import { Layout, Menu, theme, Divider } from 'antd';

import {

    UsergroupAddOutlined
} from '@ant-design/icons';

import Test from '../components/Test';
import DepartementList from '../components/departement/departementList';
import Head from '../components/Header/Head';
import TablesEmployee from '../components/employee/TableEmployee';
const { Content, Sider, Footer } = Layout;

const Index = () => {

    const [collapsed, setCollapsed] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('1');

    const items = [
        getItem('Depatement', '1', <UsergroupAddOutlined />),
        getItem('Employee', '2', <UsergroupAddOutlined />),
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
                <img src="logo.png" alt="Avatar" style={{ marginTop: '20px', width: collapsed ? 40 : 100, height: collapsed ? 40 : 100, borderRadius: '50%' }} />
                <h3 style={{ color: 'white', display: collapsed ? 'none' : 'block', }}>A Company</h3>
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
                <Head></Head>
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
                                <DepartementList ></DepartementList>
                            </>
                        }
                        {
                            selectedMenuItem === '2' &&
                            <>
                                <TablesEmployee  ></TablesEmployee>
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