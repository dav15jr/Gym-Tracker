import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../assets/AppContext';

export default function WeightProgressChart({progressHistory}) {

  const { targetWeight} = useAppContext();

  return (
<>
    <div className="justify-content-center m-3">
    <h4>Weight</h4>
    <ResponsiveContainer width={'100%'} minWidth={350} maxWidth={300} height={450}>
      <AreaChart
        data={progressHistory}
        syncId="ProgressCharts"
      >
        <YAxis type="number" unit="kg" />
        <XAxis dataKey="convDate" label={{ value: "Date", position: "insideBottom", offset: -5 }}/>
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />

        <Area
          name="Weight"
          unit="kg"
          type="monotone"
          dataKey="weight"
          stroke="purple"
          strokeWidth={2}
          fill="Purple"
        />

        <ReferenceLine y={targetWeight} label={{ position: 'bottom', value: 'Target Weight', fill: 'darkGreen', opacity:0.7}} stackId="1" stroke="green" strokeWidth={2} />
      </AreaChart>
      </ResponsiveContainer>
      </div> 
</>
  )
}


