"use client"
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
const data = [
    {
      name: "GW1",
      points: 65,
      value: 100.0,
    },
    {
      name: "GW2",
      points: 58,
      value: 100.2,
    },
    {
      name: "GW3",
      points: 72,
      value: 100.5,
    },
    {
      name: "GW4",
      points: 45,
      value: 100.3,
    },
    {
      name: "GW5",
      points: 80,
      value: 100.8,
    },
    {
      name: "GW6",
      points: 53,
      value: 101.0,
    },
    {
      name: "GW7",
      points: 68,
      value: 101.3,
    },
    {
      name: "GW8",
      points: 61,
      value: 101.5,
    },
    {
      name: "GW9",
      points: 75,
      value: 101.8,
    },
    {
      name: "GW10",
      points: 50,
      value: 101.7,
    },
    {
      name: "GW11",
      points: 70,
      value: 102.0,
    },
    {
      name: "GW12",
      points: 62,
      value: 102.2,
    },
  ];
export default function ManagerPositionTrends(){
    return (<ResponsiveContainer height={350} width="100%">
      <BarChart data={data} className="[&_.recharts-tooltip-cursor]:fill-zinc-200 dark:[&_.recharts-tooltip-cursor]:fill-zinc-800"

      >
        <XAxis dataKey="name" stroke="#888888" fontSize={12}/>
        <YAxis dataKey="points" stroke="#888888" fontSize={12}/>
        <Tooltip separator=': ' wrapperClassName='dark:!bg-black rounded-md dark:!border-border'/>
        <Legend iconType='circle' formatter={(value)=>{
            if(value==="value"){
                return <div>You value in fpl is</div>
            }else if(value==="points"){
                return <div className='text-sm'>you point for fpl this week is</div>
            }
        }}/>
        <Bar dataKey="points" stackId={1} fill="#ec4899"/>
        <Bar dataKey="value" stackId={1} fill="#6b7280" radius={[4,4,0,0]}/>
      </BarChart>
    </ResponsiveContainer>)
}