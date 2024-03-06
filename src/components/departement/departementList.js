import React, { useEffect } from 'react'
import DepartementAdd from './departementAdd'
import { getDept } from '../../services/serviceDept'

export default function DepartementList() {


    useEffect(() => {

    }, []);

    useEffect(() => {
        getDept().then(rep => {
            console.log('repppp', rep.data);
        }).catch(err => {
            console.log('somme err', err);
        }).finally(() => {
        });

    }, [])

    return (
        // <div>departementList</div>
        <div>
            list
            <DepartementAdd></DepartementAdd>

        </div>
    )
}
