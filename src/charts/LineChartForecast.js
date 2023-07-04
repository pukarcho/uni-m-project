import moment from 'moment';
import { TbTemperature } from 'react-icons/tb';
import { MdFrontHand, MdOutlineDateRange } from 'react-icons/md';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from 'recharts';
import { useTranslation } from 'react-i18next';

function LineChartForecast({ data }) {
    const { t } = useTranslation();

    const dateFormatter = (value) => {
        return moment.unix(value).format('DD MMM');
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-1 border-emerald-400 rounded-md">
                    <div className='flex justify-start items-center text-black m-2'>
                        <MdOutlineDateRange className='mr-2' />
                        {moment.unix(payload[0].payload.date).format('DD MMM HH:mm')}
                    </div>
                    <div className='flex justify-start items-center text-black m-2'>
                        <TbTemperature className='mr-2' />
                        <span>{t('temperature')}:</span>
                        <span className='ml-2'>{Math.round(payload[0].payload.max)}<span>&deg;</span></span>
                    </div>
                    <div className='flex justify-start items-center text-black m-2'>
                        <MdFrontHand className='mr-2' />
                        <span>{t('feels-like')}:</span>
                        <span className='ml-2'>{Math.round(payload[0].payload.feelsLike)}<span>&deg;</span></span>
                    </div>
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
                <Line type="basis" dataKey="max" stroke="white" dot={false} />
                <Line type="basis" dataKey="feelsLike" stroke="blue" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default LineChartForecast;