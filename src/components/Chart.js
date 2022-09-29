import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './chart.css'



const data = [
    {
      name: '2016',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: '2017',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: '2018',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: '2019',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: '2020',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: '2021',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: '2022',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];


const Chart = () =>{
    return(
    <div className='chart'>
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#FF0000" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#0000FF" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    )
}

export default Chart