import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { getAttendanceStat } from '../services/serviceAttendance';

export function MonthlyTemperatureChart() {
    const [attendance, setAttendance] = useState({ categories: [], values: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const rep = await getAttendanceStat();
                const categories = rep.data.data.categories;
                const values = rep.data.data.value;

                setAttendance({ categories, values });
            } catch (error) {
                console.error('Error fetching attendance data:', error);
            }
        };

        fetchData();
    }, []);


    const options = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Monthly attendance',
        },
        subtitle: {
            text: 'Annee: 2024',
        },
        xAxis: {
            categories: attendance.categories,
        },
        yAxis: {
            title: {
                text: 'Nb',
            },
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                },
                enableMouseTracking: false,
            },
        },
        series: [
            {
                name: 'Employee',
                data: attendance.values,
            },
            // Add more series as needed
        ],
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

export default MonthlyTemperatureChart;
