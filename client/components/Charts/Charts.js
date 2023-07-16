import React from 'react'
import './Charts.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


function Charts({ title, data, dataKey, grid }) {
    
    return (
        <div className="chart">
            <h3 className="charttitle">Sales Analytics </h3>
            <ResponsiveContainer width="100%" aspect={4 / 1}>
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke="#5550bd"></XAxis>
                    <Line type="monotone" dataKey="uv" stroke="#5550bd"></Line>
                    <Tooltip/>
                    <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>
                    <Legend/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Charts
