import React, { useEffect, useState, useRef } from 'react'
import { Table, Input, Divider } from 'antd';
import './styles.css'
import { getEmployee, saveEmployee } from '../../services/serviceEmployee';
import { showErrorNotification, showSuccessNotification } from '../Notification';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import moment from 'moment';



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
            if (visible) {
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
            title: 'Departement',
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
    if (user && user.length > 0) {
        user.map((u, i) => {
            data.push({
                key: i,
                id: u.id,
                departmentId: u.departmentId,
                firstName: u.firstName,
                lastName: u.lastName,
            });
        });

    }







    return (
        <div>

            <div
                style={{
                    marginBottom: 16,
                }}
            >


                <Divider> </Divider>

                <span
                    style={{
                        marginLeft: 8,
                    }}
                >

                </span>
            </div>




            <Table columns={columns} dataSource={data} />
        </div>
    );
}
