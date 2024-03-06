import React, { useEffect, useState } from 'react';
import { Button, Upload, message, Timeline, Radio } from 'antd';
import { DownloadOutlined, ClockCircleOutlined } from '@ant-design/icons';

import FileImportButton from './FileImportButton';
import { getAttendance } from '../../services/serviceAttendance';

const TimeLine = () => {
    const [mode, setMode] = useState('left');
    const [attendances, setAttendances] = useState([]);

    useEffect(() => {
        getAttendance().then((rep) => {
            setAttendances(rep.data.data);
            console.log('repppp', rep.data);
        }).catch((err) => {
            console.log('somme err', err);
        });
    }, []);





    const onChange = (e) => {
        setMode(e.target.value);
    };

    const transformDataForTimeline = () => {
        const timelineData = [];

        attendances.forEach((attendance) => {
            const date = new Date(attendance.date).toLocaleDateString();
            const existingEntry = timelineData.find((entry) => entry.label === date);

            const employeeName = (
                <div key={attendance.id}>
                    {attendance.employee.firstName} {attendance.employee.lastName}
                </div>
            );

            if (existingEntry) {
                existingEntry.children.push(employeeName);
            } else {
                timelineData.push({
                    label: date,
                    children: [employeeName],
                });
            }
        });

        return timelineData;
    };



    return (
        <>
            <div style={{ marginBottom: '50px' }}>
                <FileImportButton></FileImportButton>

            </div>
            <div style={{ marginBottom: '50px' }}></div>
            <Radio.Group
                onChange={onChange}
                value={mode}
                style={{
                    marginBottom: 20,
                }}
            >
                <Radio value="left">Left</Radio>
                <Radio value="right">Right</Radio>
                <Radio value="alternate">Alternate</Radio>
            </Radio.Group>
            <Timeline mode={mode} items={transformDataForTimeline()} />
        </>
    );
};

export default TimeLine;
