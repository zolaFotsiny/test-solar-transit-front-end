import React, { useEffect, useState } from 'react'
import DepartementAdd from './departementAdd'
import { getDept, saveDept, updateDept } from '../../services/serviceDept'
import { Spin, Divider, Table } from 'antd';
import { showErrorNotification, showSuccessNotification } from '../Notification';
import DepartementUpdate from './departementUpdate';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
export default function DepartementList() {
    const [dept, setdept] = useState([])

    useEffect(() => {
        getDept().then(rep => {
            console.log('repppp', rep.data);
            setdept(rep.data.data);
        }).catch(err => {
            console.log('somme err', err);
        }).finally(() => {
        });

    }, [])

    //function
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const triggerInsertDept = (data) => {
        saveDept(data).then(rep => {
            if (rep.data.status === 201)
            {
                console.log('insert', rep);
                let deptPlusOne = [...dept, rep.data.data]
                setdept(deptPlusOne);
                showSuccessNotification(rep.data.message);
            }
            else
            {
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
        console.log('to update ', dept);

        let data = { "name": dept.firstName };

        updateDept(dept.id, data)
            .then(rep => {
                console.log('update successs', rep);
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

            <DepartementAdd triggerInsertDept={triggerInsertDept}></DepartementAdd>
            <Divider></Divider>
            <Table columns={columns} dataSource={dept} onChange={onChange} />
        </div>
    )
}
