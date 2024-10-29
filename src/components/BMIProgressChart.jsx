import {
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
    ReferenceArea,
    ResponsiveContainer,
} from 'recharts';

export default function BMIProgressChart({ progressHistory }) {
    return (
        <>
            <h6>BMI</h6>
            <div className="justify-content-center">
                <ResponsiveContainer
                    width={'100%'}
                    minWidth={300}
                    maxWidth={500}
                    height={300}
                >
                    <LineChart
                        data={progressHistory}
                        syncId="ProgressCharts"
                        margin={{ left: -15, bottom: 10 }}
                    >
                        <YAxis
                            domain={[0, 50]}
                            tick={{ fill: 'white', fontSize: 13 }}
                        />
                        <XAxis
                            dataKey="convDate"
                            label={{
                                value: 'Date',
                                position: 'insideBottom',
                                offset: -8,
                                fill: 'lime',
                            }}
                            tick={{ fill: 'white', fontSize: 13 }}
                            tickMargin={5}
                        />
                        <Tooltip
                            cursor={{ stroke: '' }}
                            labelStyle={{ color: 'black' }}
                            itemStyle={{ color: 'green' }}
                        />

                        {/* ReferenceArea to fill background color for different levels */}
                        <ReferenceArea
                            label={{
                                value: 'Severly Under Weight',
                                fill: 'white',
                            }}
                            y1={0}
                            y2={16}
                            fill="red"
                            fillOpacity={0.8}
                        />
                        <ReferenceArea
                            label={{ value: 'Under Weight', fill: 'grey' }}
                            y1={16}
                            y2={18.5}
                            fill="yellow"
                            fillOpacity={0.8}
                        />
                        <ReferenceArea
                            label={{ value: 'Normal', fill: 'white' }}
                            y1={18.5}
                            y2={25}
                            fill="green"
                            fillOpacity={0.8}
                        />
                        <ReferenceArea
                            label={{ value: 'Over Weight', fill: 'grey' }}
                            y1={25}
                            y2={30}
                            fill="yellow"
                            fillOpacity={0.8}
                        />
                        <ReferenceArea
                            label={{ value: 'Obese', fill: 'white' }}
                            y1={30}
                            y2={35}
                            fill="orange"
                            fillOpacity={0.8}
                        />
                        <ReferenceArea
                            label={{ value: 'Extremely Obese', fill: 'white' }}
                            y1={35}
                            y2={50}
                            fill="red"
                            fillOpacity={0.8}
                        />
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
    );
}
