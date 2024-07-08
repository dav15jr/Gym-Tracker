import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, Legend, ReferenceLine } from 'recharts';

export default function WeightProgressChart({progressHistory, targetWeight}) {

  return (
<>
    <div className="row justify-content-center mb-3">
      <AreaChart
        width={800}
        height={500}
        data={progressHistory}
        margin={{ right: 30 }}
      >
        <YAxis type="number" unit="kg" label="Weight" />
        <XAxis dataKey="date" label="Date" />
        <CartesianGrid strokeDasharray="10 10" />
        <ReferenceLine x="May" label="Summer Holiday" stroke="red" />
        <ReferenceLine y={targetWeight} label="Target Weight" stroke="green" />
        <Tooltip />
        <Legend />

        <Area
          type="monotone"
          dataKey="weight"
          stroke="#2563eb"
          fill="#3b82f6"
          stackId="1"
        />
      </AreaChart>
      </div> 
</>
  )
}


