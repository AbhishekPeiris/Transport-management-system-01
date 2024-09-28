import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const AttendanceChart = () => {
    const [attendanceData, setAttendanceData] = useState([]);

    useEffect(() => {
        fetchAttendanceData();
    }, []);

    const fetchAttendanceData = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            const response = await axios.get(`http://localhost:5000/api/attendance/${user.loginEmployee._id}`);
            const processedData = processAttendanceData(response.data);
            setAttendanceData(processedData);
        } catch (error) {
            console.error('Error fetching attendance data:', error);
        }
    };

    const processAttendanceData = (data) => {
        // Group attendance by date and count occurrences
        const grouped = data.reduce((acc, record) => {
            const date = new Date(record.date).toLocaleDateString();
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});

        // Convert to array format for Recharts
        return Object.entries(grouped).map(([date, count]) => ({ date, count }));
    };

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={attendanceData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#0071ff" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AttendanceChart;