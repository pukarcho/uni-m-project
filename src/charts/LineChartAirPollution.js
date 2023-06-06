import moment from 'moment';
import { MdOutlineDateRange } from 'react-icons/md';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';

import { sensors, colors as areaColors } from '../helpers/AirMetricsHelper';

function LineChartAirPollution({ data, sensorName }) {

    const dateFormatter = (value) => {
        return moment.unix(value).format('DD MMM');
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-1 border-emerald-400">
                    <div className='flex justify-start items-center text-black m-2'>
                        <MdOutlineDateRange className='mr-2' />
                        {moment.unix(payload[0].payload.date).format('DD MMM HH:mm')}
                    </div>
                    <div className='text-black m-2'>{payload[0].payload.value}</div>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 5,
                    left: 0,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                <XAxis dataKey="date" tickFormatter={dateFormatter} stroke='white' />
                <YAxis stroke='white' width={35} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="basis" dataKey="value" stroke="white" dot={false} />
                {sensors[sensorName].map((item, key) => (
                    <ReferenceArea key={key} y1={item.min} y2={item.max} fill={areaColors[key]} fillOpacity={0.4} ifOverflow='visible' />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}

export default LineChartAirPollution;