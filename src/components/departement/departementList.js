import React, { useEffect, useState } from 'react'
import DepartementAdd from './departementAdd'
import { getDept, saveDept } from '../../services/serviceDept'
import { Spin, Divider, Table } from 'antd';
import { showErrorNotification, showSuccessNotification } from '../Notification';
import { notification } from 'antd';
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
    const triggerInsertEmp = (data) => {


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

    ];
    //format data to add in table
    const data = [];
    dept.map((d, i) => {
        data.push({
            key: d.id,
            id: d.id,
            name: d.name,
        });
    });
    return (
        <div>

            <DepartementAdd triggerInsertEmp={triggerInsertEmp}></DepartementAdd>
            <Divider></Divider>
            <Table columns={columns} dataSource={dept} onChange={onChange} />
        </div>
    )
}
