import React, { useEffect, useState, useRef } from 'react';
import { Spin, Badge, Input, Divider, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import Highlighter from 'react-highlight-words';
import { Table } from 'antd';
import moment from 'moment';
import 'moment/locale/fr'; // Importer le fichier de localisation pour le français
import { formatDate } from '../../Utils/Date';
import Filtre from '../Filtre/Filtre';
import { getAttendance } from '../../services/serviceAttendance';
import FicheEmp from './ficheEmp';
const criteria = [
    {
        label: 'First Name',
        name: 'firstName',
        type: 'text'
    }
];

export default function AttendanceList() {
    const [attendance, setAttendance] = useState([]);

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


    useEffect(() => {
        getAttendance().then(rep => {
            console.log('useEffecxt', rep.data);
            // console.log()
            const attendanceData = rep.data.data.map(u => ({
                key: u.id,
                id: u.id,
                Employee: u.employee.firstName,
                date: formatDate(u.date),
                detail: <FicheEmp user={u.employee} />

            }));

            console.log('attendenceState', attendanceData);
            setAttendance(attendanceData);

        }).catch(err => {
            console.log('error', err);
        });
    }, []);




    const searchInput = useRef(null);

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
                    color: filtered ? '#1677ff' : undefined,
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
            title: 'Employee',
            dataIndex: 'Employee',
            ...getColumnSearchProps('Employee'),
        },
        {
            title: 'Date',
            dataIndex: 'date',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => moment(a.date).diff(moment(b.date)),
        },
        {
            title: 'Detail',
            dataIndex: 'detail',
        },

    ];
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

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
    return (

        <>
            <Filtre criteria={criteria}></Filtre>

            <Table columns={columns} dataSource={attendance} onChange={onChange} />
        </>
    );
};
