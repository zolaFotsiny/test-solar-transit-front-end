import React, { useEffect, useState, useRef } from 'react';
import { Modal, Table, Tooltip, Space } from 'antd';
import { SolutionOutlined } from '@ant-design/icons';
import { Input, Divider, Spin } from 'antd';
import { Button } from 'antd';
import { getUserDept } from '../../services/serviceDept';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
const EmptDept = ({ dept }) => {
    const [modal2Open, setModal2Open] = useState(false);

    const searchInput = useRef(null);

    const [user, setuser] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getUserDept(dept.id).then(rep => {
            setuser(rep.data.data.employees)
            console.log('repqsdqsd', (rep.data.data.employees))
        }).catch(err => {
            console.log('err', err);
        })
    }, [])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    //Filtre need to be refactor
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#fff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible)
            {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    let columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps('id'),

        },
        {
            title: 'Reference',
            dataIndex: 'employeeIdentifier',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
            ...getColumnSearchProps('employeeIdentifier'),

        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            ...getColumnSearchProps('firstName'),
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            ...getColumnSearchProps('lastName'),
        },


    ];
    const data = [];
    if (user && user.length > 0)
    {
        user.map((u, i) => {
            data.push({
                key: i,
                id: u.id,
                employeeIdentifier: u.employeeIdentifier,
                firstName: u.firstName,
                lastName: u.lastName,

            });
        });

    }

    return (
        <>
            <Tooltip title="Employee Dept">
                <SolutionOutlined onClick={() => setModal2Open(true)} />
            </Tooltip>

            <Modal
                title="Employee Department"
                centered
                open={modal2Open}
                onOk={() => setModal2Open(false)}
                onCancel={() => setModal2Open(false)}
                width={1000}
            >
                <Space
                    direction="vertical"
                    style={{
                        width: '100%',
                    }}
                >
                    <Divider>{dept.name} have {user.length} employee</Divider>
                    <p></p>
                    <Table columns={columns} dataSource={data} />
                </Space>
            </Modal>
        </>
    );
};
export default EmptDept;