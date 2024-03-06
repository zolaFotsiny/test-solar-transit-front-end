import React, { useEffect, useState } from 'react'
import DepartementAdd from './departementAdd'
import { getDept, saveDept, updateDept } from '../../services/serviceDept'
import { Spin, Divider, Table } from 'antd';
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
            showErrorNotification('Some error')
            console.log('somme err', err);
        })
            .finally(() => {
                // setLoading(false);
            });
    };

    const triggerUpdateDept = (dept) => {


        let data = { "name": dept.firstName };

        updateDept(dept.id, data)
            .then(rep => {

                // setuser((prevUsers) => {
                //     return prevUsers.map((prevUser) => {
                //         if (prevUser.id === user.id)
                //         {
                //             // If the user ID matches, update the user
                //             showSuccessNotification();
                //             return { ...prevUser, ...data };
                //         }
                //         return prevUser;
                //     });
                // });
                return true; // Return true for success
            })
            .catch(err => {
                showErrorNotification('somme error')
                console.log('some err', err);
                return false; // Return false for failure
            }).finally(() => {
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
            render: (actions, record) => (

                // actions.map((action, index) => (
                <React.Fragment > </React.Fragment>
                // ))


            ),
        },


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



    //format data to add in table
    const data = [];
    dept.map((d, i) => {
        data.push({
            key: d.id,
            id: d.id,
            name: d.name,
            // action: <DepartementUpdate key={`update-${i}`} triggerUpdateDept={triggerUpdateDept} dept={d} />,
            action: [
                <DepartementUpdate key={`update-${i}`} triggerUpdateDept={triggerUpdateDept} dept={d} />,
            ],
        });
    });
    return (
        <div>
            <div
                style={{
                    marginBottom: 16,
                }}
            >

                <Filtre criteria={criteria} titleTooltip='Add Employee' children={<DepartementAdd triggerInsertDept={triggerInsertDept} />} ></Filtre>

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
