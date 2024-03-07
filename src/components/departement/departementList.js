import React, { useEffect, useState } from 'react'
import DepartementAdd from './departementAdd'
import { getDept, getDeptFilter, saveDept, updateDept } from '../../services/serviceDept'
import { Spin, Divider, Table, Space } from 'antd';
import { showErrorNotification, showSuccessNotification } from '../Notification';
import DepartementUpdate from './departementUpdate';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import Filtre from '../Filtre/Filtre';
import './styles.css'

const criteria = [
    {
        label: 'Id',
        name: 'id',
        type: 'text',
    },
    {
        label: 'Name',
        name: 'name',
        type: 'text',
    }
];
export default function DepartementList() {
    const [dept, setdept] = useState([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getDept().then(rep => {

            setdept(rep.data.data);
        }).catch(err => {
            console.log('somme err', err);
        }).finally(() => {
            setLoading(false);
        });

    }, [])

    //function
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const triggerInsertDept = (data) => {
        saveDept(data).then(rep => {
            if (rep.data.status === 201) {

                let deptPlusOne = [...dept, rep.data.data]
                setdept(deptPlusOne);
                showSuccessNotification(rep.data.message);
            }
            else {
                showErrorNotification(rep.data.message)
            }
        }).catch(err => {
            showErrorNotification(err.response.data.message || 'An error occurred')
            console.log('somme err', err);
        })
            .finally(() => {
                // setLoading(false);
            });
    };

    const triggerFiltre = (obj) => {
        console.log('last', obj);


        getDeptFilter(obj).then(rep => {
            console.log('inito', rep);
            setdept(rep.data.data);
        }).catch(err => {
            console.log('somme err', err);
        }).finally(() => {
            setLoading(false);
        });
    }

    const triggerUpdateDept = (dept, val) => {
        let data = { "name": val };
        console.log(data);
        updateDept(dept.id, data)
            .then(rep => {
                setdept(prevDepts => {
                    return prevDepts.map(prevDept => {
                        if (prevDept.id === dept.id) {
                            // If the department ID matches, update the department
                            showSuccessNotification(rep.data.message);
                            return { ...prevDept, ...data }; // Assuming rep.data contains the updated department data
                        }
                        return prevDept;
                    });
                });
            })
            .catch(err => {
                showErrorNotification('Some error');
                console.log('Some error', err);
            })
            .finally(() => {
                // setLoading(false);
            });
    };



    // edit column table
    let columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Department',
            dataIndex: 'name',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            align: 'center',
            render: (text, record) => (
                <DepartementUpdate key={`update-${record.id}`} triggerUpdateDept={triggerUpdateDept} dept={record} />
            ),
        },
    ];

    // Format data to add in the table
    const data = [];
    if (dept && Array.isArray(dept) && dept.length > 0) {
        dept.forEach((d) => {
            data.push({
                key: d.id,
                id: d.id,
                name: d.name,
            });
        });
    }
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
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >

                <Filtre criteria={criteria} titleTooltip='Add Employee' triggerFiltre={triggerFiltre} children={<DepartementAdd triggerInsertDept={triggerInsertDept} />} ></Filtre>

                <span
                    style={{
                        marginLeft: 8,
                    }}
                >

                </span>
            </div>
            <Divider></Divider>
            <h1>Department List</h1>
            <Table columns={columns} dataSource={dept} onChange={onChange} />
            {
                loading ? <Spin tip="Loading..." size='large' spinning> </Spin> : null
            }
        </div>
    )
}
