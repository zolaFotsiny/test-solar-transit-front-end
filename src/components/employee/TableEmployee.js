import React, { useEffect, useState, useRef } from 'react'
import { Table, Input, Divider, Spin } from 'antd';
import './styles.css'
import { getEmployee, saveEmployee } from '../../services/serviceEmployee';
import { showErrorNotification, showSuccessNotification } from '../Notification';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import Filtre from '../Filtre/Filtre'
import AjouterEmployee from './AjouterEmployee';

const criteria = [
    {
        label: 'First Name',
        name: 'firstname',
        type: 'text',

    },
    {
        label: 'Last Name',
        name: 'lastname',
        type: 'text',
    },
    {
        label: 'Departement',
        name: 'departement',
        type: 'text'
    }
];



export default function TablesEmployee() {
    const [user, setuser] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchInput = useRef(null);
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
            title: 'Department',
            dataIndex: 'departmentId',
            ...getColumnSearchProps('departmentId'),
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
        }

    ];


    // function adding style to column
    const addStyleToColumns = (columns, style) => {
        return columns.map(column => ({
            ...column,
            onHeaderCell: () => ({

                style: style
            })
        }));
    };

    columns = addStyleToColumns(columns, { backgroundColor: 'rgb(0, 80, 155)', color: 'white' });



    useEffect(() => {
        setLoading(true);
        getEmployee().then(rep => {
            setuser(rep.data.data);
            console.log('TEST', rep.data);
        }).catch(err => {
            showErrorNotification(err);
            console.log('somme err', err);
        }).finally(() => {
            setLoading(false);
        });
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

    const data = [];
    if (user && user.length > 0)
    {
        user.map((u, i) => {
            data.push({
                key: i,
                id: u.id,
                employeeIdentifier: u.employeeIdentifier,
                departmentId: u.department.name,
                firstName: u.firstName,
                lastName: u.lastName,
            });
        });

    }


    //trigger function

    const triggerInsertEmp = (data) => {
        setLoading(true);
        saveEmployee(data).then(rep => {
            if (rep.data.status === 201)
            {
                console.log('rep', rep);
                let userPlusOne = [...user, rep.data.data]
                setuser(userPlusOne);
                setLoading(false);
                showSuccessNotification(rep.data.message);
            }
            else
            {
                showSuccessNotification(rep.data.message);
            }


        }).catch(err => {
            showErrorNotification('somme error')
            console.log('somme err', err);
        })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>

            <div
                style={{
                    marginBottom: 16,
                }}
            >

                <Filtre criteria={criteria} titleTooltip='Add Employee' children={<AjouterEmployee triggerInsertEmp={triggerInsertEmp} />} ></Filtre>

                <Divider> </Divider>

                <span
                    style={{
                        marginLeft: 8,
                    }}
                >

                </span>
            </div>

            {
                loading ? <Spin size='large' spinning> </Spin> : null
            }
            <h1>Employee List</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    );
}
