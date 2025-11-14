"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 6500 },
    { month: 'Mar', sales: 8000 },
    { month: 'Apr', sales: 2000 },
    { month: 'May', sales: 7500 },
    { month: 'Jun', sales: 9000 },
    { month: 'Jul', sales: 10000 }, // highest revenue
];

export default function SimpleChart() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip /> {/* This shows data on hover */}
                <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#576d64"
                    strokeWidth={2}
                    dot={{ r: 5, stroke: '#576d64', strokeWidth: 2 }} // controls points
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
