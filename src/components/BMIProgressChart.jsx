import { XAxis, YAxis, Tooltip, LineChart, Line, ReferenceArea,ResponsiveContainer } from 'recharts';

export default function BMIProgressChart({ progressHistory }) {


  return (
<>
    <div className="row justify-content-center m-3">
      <h4>BMI</h4>
    <ResponsiveContainer width={'100%'} minWidth={350} maxWidth={700} height={450}>
      <LineChart
        data={progressHistory}
        syncId="ProgressCharts"
        >
        <YAxis domain={[0, 50]}/>
        <XAxis dataKey="convDate" label={{ value: "Date", position: "insideBottom", offset: -5}} />
        <Tooltip />

      {/* ReferenceArea to fill background color for different levels */}
      <ReferenceArea label={{ value: 'Severly Under Weight', fill: 'white'}} y1={0} y2={16} fill="red" fillOpacity={0.8} />
      <ReferenceArea label={{ value: 'Under Weight', fill: 'grey'}}  y1={16} y2={18.5} fill="yellow" fillOpacity={0.8} />
      <ReferenceArea label={{ value: 'Normal', fill: 'white'}} y1={18.5} y2={25} fill="green" fillOpacity={0.8} />
      <ReferenceArea label={{ value: 'Over Weight', fill: 'grey'}} y1={25} y2={30} fill="yellow" fillOpacity={0.8} />
      <ReferenceArea label={{ value: 'Obese', fill: 'white'}} y1={30} y2={35} fill="orange" fillOpacity={0.8} />
      <ReferenceArea label={{ value: 'Extremely Obese', fill: 'white'}}  y1={35} y2={50} fill="red" fillOpacity={0.8} />
        <Line
          name="BMI"
          type="monotone"
          dataKey="bmi"
          stroke="black"
          strokeWidth={2}
        />
      </LineChart>
      </ResponsiveContainer>
      </div> 
</>
  )
}


