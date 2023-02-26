import { useEffect, useState } from "react";
import { AiFillEye, AiOutlineDashboard } from 'react-icons/ai';
import { BsFillCloudHazeFill, BsCloudSunFill, BsCloudLightningFill, BsCloudDrizzleFill, BsFillCloudRainHeavyFill, BsFillCloudSnowFill, BsFillSunFill } from 'react-icons/bs';
import { IoWater } from 'react-icons/io5';
import { RiTempColdFill, RiTempHotFill } from 'react-icons/ri';
import { TbWind, TbWindsock, TbTemperature } from 'react-icons/tb';
import { WiSunrise, WiSunset } from 'react-icons/wi';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { getCurrentWeather } from '../client/weatherClient';
import { getWindDirectionCardinal } from '../helpers/WindHelper';

const CurrentWeather = ({ selected }) => {
    const { t } = useTranslation();
    
    const [data, setData] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setData(await getCurrentWeather(selected.city));
    };

    const getWeatherIcon = (key) => {
        switch(key){
            case 'Thunderstorm':
                return <BsCloudLightningFill className="text-8xl fill-white" />;
            case 'Drizzle':
                return <BsCloudDrizzleFill className="text-8xl fill-white" />;
            case 'Rain':
                return <BsFillCloudRainHeavyFill className="text-8xl fill-white" />;
            case 'Snow':
                return <BsFillCloudSnowFill className="text-8xl fill-white" />;
            case 'Mist':
                return <BsFillCloudHazeFill className="text-8xl fill-white" />;
            case 'Clear':
                return <BsFillSunFill className="text-8xl fill-white" />;
            case 'Clouds':
                return <BsCloudSunFill className="text-8xl fill-white" />;
            default:
                return null;
        }
    };

    if (data) {
        return (
            // <div className="flex items-center h-full w-96">
            <div>
                <div className="flex mb-16">
                    <div className="w-4/6">
                        <h1 className="text-2xl font-bold">{data.name}</h1>
                        <p className="mb-8">08:20 11/12/2022</p>
                        <h1 className="text-4xl font-bold">{Math.round(data.main.temp)}<span>&deg;</span></h1>
                    </div>
                    <div className="w-2/6 flex justify-center items-end">
                        {getWeatherIcon(data.weather[0].main)}
                        <h1>{t('title')}</h1>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <RiTempColdFill className="text-xl" />
                                <span className="ml-2 text-xs">MIN</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{Math.round(data.main.temp_min)}<span>&deg;</span></p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <RiTempHotFill className="text-xl" />
                                <span className="ml-2 text-xs">MAX</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{Math.round(data.main.temp_max)}<span>&deg;</span></p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <TbWindsock className="text-xl" />
                                <span className="ml-2 text-xs">WIND</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{getWindDirectionCardinal(data.wind.deg)}</p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <TbWind className="text-xl" />
                                <span className="ml-2 text-xs">WIND</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{data.wind.speed} m/s</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <IoWater className="text-xl" />
                                <span className="ml-2 text-xs">HUMIDITY</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{data.main.humidity} %</p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <AiFillEye className="text-xl" />
                                <span className="ml-2 text-xs">VISIBILITY</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{data.visibility / 1000} km</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <TbTemperature className="text-xl" />
                                <span className="ml-2 text-xs">FEELSLIKE</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{Math.round(data.main.feels_like)}<span>&deg;</span></p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <AiOutlineDashboard className="text-xl" />
                                <span className="ml-2 text-xs">PRESSURE</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{data.main.pressure} Pha</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <WiSunrise className="text-xl" />
                                <span className="ml-2 text-xs">SUNRISE</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{moment.unix(data.sys.sunrise).format('HH:mm')}</p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <WiSunset className="text-xl" />
                                <span className="ml-2 text-xs">SUNSET</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{moment.unix(data.sys.sunset).format('HH:mm')}</p>
                        </div>
                    </div>
                </div>
            </div>
            // </div>
        );
    }
    else {
        return (
            <p>Loading</p>
        );
    }
};

export default CurrentWeather;