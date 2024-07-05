import { CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, Legend, ReferenceArea } from 'recharts';

export default function BMIProgressChart({bmiHistory}) {



  return (
<>
    <div className="row justify-content-center mb-3">
      <LineChart
        width={800}
        height={500}
        data={bmiHistory}
        margin={{ right: 30 }}
      >
        <YAxis label="BMI" domain={[0, 50]}/>
        <XAxis label="Date" />
        <CartesianGrid strokeDasharray="5 5" />
        <Tooltip />
        <Legend />

      {/* ReferenceArea to fill background color for different levels */}
      <ReferenceArea label="Severly Under Weight" y1={0} y2={16} fill="red" fillOpacity={0.5} />
      <ReferenceArea label="Under Weight" y1={16} y2={18.4} fill="yellow" fillOpacity={0.5} />
      <ReferenceArea label="Normal" y1={18.5} y2={24.9} fill="green" fillOpacity={0.5} />
      <ReferenceArea label="Over Weight" y1={25} y2={29.9} fill="yellow" fillOpacity={0.5} />
      <ReferenceArea label="Obese" y1={30} y2={35} fill="orange" fillOpacity={0.5} />
      <ReferenceArea label="Extremely Obese" y1={35} y2={50} fill="red" fillOpacity={0.5} />

        <Line
          type="monotone"
          dataKey="bmi"
          stroke="purple"
          stackId="1"
        />

      </LineChart>
      </div> 
</>
  )
}


