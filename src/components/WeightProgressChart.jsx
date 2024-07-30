import { CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area, ReferenceLine, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../assets/AppContext';

export default function WeightProgressChart({progressHistory}) {

  const { targetWeight} = useAppContext();


  return (
<>
    <div className="justify-content-center m-3">
    <h4>Weight</h4>
    <ResponsiveContainer width={'100%'} minWidth={350} maxWidth={600} height={450}>
      <AreaChart
        data={progressHistory}
        syncId="ProgressCharts"
      >
        <YAxis type="number" unit="kg" tick={{ fill: 'white' }} />
        <XAxis dataKey="convDate" label={{ value: "Date", position: "insideBottom", offset: -5, fill: 'lime'}} tick={{ fill: 'white'}} tickMargin={5} />
        <CartesianGrid strokeDasharray="5 5" stroke="grey" strokeOpacity={0.5} />
        <Tooltip 
            cursor={{ stroke: 'white', strokeWidth: 2}}
            labelStyle={{ color: 'black'}}
            itemStyle={{ color: 'purple'}}
            separator=" "
        />

        <Area
          name=" "
          unit="kg"
          type="monotone"
          dataKey="weight"
          stroke="purple"
          strokeWidth={2}
          fill="purple"
        />

        <ReferenceLine y={targetWeight} label={{ position: 'bottom', value: 'Target Weight', fill: 'limeGreen', opacity:0.9}} stackId="1" stroke="limegreen" strokeWidth={2} />
      </AreaChart>
      </ResponsiveContainer>
      </div> 
</>
  )
}


