import {
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    Area,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';
import { useAppContext } from '../assets/AppContext';

export default function WeightProgressChart({ progressHistory }) {
    const { targetWeight } = useAppContext();

    return (
        <>
            <div className="justify-content-center">
                <h6>Weight</h6>
                <ResponsiveContainer
                    width={'100%'}
                    minWidth={300}
                    maxWidth={500}
                    height={300}
                >
                    <AreaChart
                        data={progressHistory}
                        syncId="ProgressCharts"
                        margin={{ left: -15, bottom: 10 }}
                    >
                        <YAxis
                            type="number"
                            unit="kg"
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
                        <CartesianGrid
                            strokeDasharray="5 5"
                            stroke="grey"
                            strokeOpacity={0.5}
                        />
                        <Tooltip
                            cursor={{ stroke: 'white', strokeWidth: 2 }}
                            labelStyle={{ color: 'black' }}
                            itemStyle={{ color: 'purple' }}
                            separator=" "
                        />

                        <Area
                            name=" "
                            unit="kg"
                            type="monotone"
                            dataKey="weight"
                            stroke="purple"
                            strokeWidth={2}
                            fill="#cc00fff3"
                            opacity={1}
                        />
                        <ReferenceLine
                            y={targetWeight}
                            label={{
                                position: 'bottom',
                                value: 'Target Weight',
                                fill: 'limeGreen',
                                opacity: 0.9,
                            }}
                            stackId="1"
                            stroke="limegreen"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}
