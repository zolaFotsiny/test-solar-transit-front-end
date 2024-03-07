import React, { useEffect, useState, useRef } from 'react';
import { Spin, Badge, Input, Divider, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ModalSupprimer from '../../Utils/ModalSupprimer';
import { showErrorNotification, showSuccessNotification } from '../Notification';
import Highlighter from 'react-highlight-words';
import { Table } from 'antd';
import moment from 'moment';
import 'moment/locale/fr'; // Importer le fichier de localisation pour le français
import { formatDate } from '../../Utils/Date';
import Filtre from '../Filtre/Filtre';
import { deleteAttendance, getAttendance } from '../../services/serviceAttendance';
import FicheEmp from './ficheEmp';
const criteria = [

];

export default function AttendanceList() {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(false);
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

    const triggerDeleteAttendance = (idAttendance) => {
        setLoading(true);
        console.log(idAttendance);
        console.log('state', attendance)

        deleteAttendance(idAttendance).then(rep => {
            setAttendance(prevAttendance => {
                const updatedState = prevAttendance.filter(item => item.id !== idAttendance);
                return updatedState;
            });
            showSuccessNotification(rep.data.message);
        }).catch(err => {
            showErrorNotification(err.response.data.message)
        })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        getAttendance().then(rep => {
            console.log('useEffecxt', rep.data);
            // console.log()
            const attendanceData = rep.data.data.map(u => ({
                key: u.id,
                id: u.id,
                Employee: u.employee.firstName,
                date: formatDate(u.date),
                action: [
                    <ModalSupprimer key={`delete-${u.id}`} triggerDeleteUser={triggerDeleteAttendance} idDelete={u.id} />,
                    <FicheEmp user={u} />,
                ],

            }));

            console.log('attendenceState', attendanceData);
            setAttendance(attendanceData);

        }).catch(err => {
            console.log('error', err);
        }).finally(() => {
            setLoading(false);
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
            title: 'Actions',
            dataIndex: 'action',
            align: 'center',
            render: (actions, record) => (
                <Space size={18}>
                    {actions.map((action, index) => (
                        <React.Fragment key={index}>{action}</React.Fragment>
                    ))}
                </Space>
            ),
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
            <h1>Attendance List</h1>
            <Table columns={columns} dataSource={attendance} onChange={onChange} />
            {
                loading ? <Spin tip="Loading..." size='large' spinning> </Spin> : null
            }
        </>
    );
};
