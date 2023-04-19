import { useEffect, useState } from "react";
import { useSelector } from 'react-redux'

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
import { getAirIndexBySensor } from '../helpers/AirMetricsHelper';

const CurrentWeather = ({ selected }) => {
    const { t } = useTranslation();
    const weatherDataState = useSelector((state) => state.mapData.weatherData);
    const airDataState = useSelector((state) => state.mapData.airData);

    const [weatherData, setWeatherData] = useState(null);
    const [airData, setAirData] = useState(null);

    useEffect(() => {
        if (weatherDataState) {
            if(selected.city === 'Ruse'){
                setWeatherData(weatherDataState.find(a => a.name === 'Rousse'));
            }
            else{
                setWeatherData(weatherDataState.find(a => a.name === selected.city));
            }
        }
        if (airDataState) {
            setAirData(airDataState.find(a => a.name === selected.city).data.list[0].components);
        }
    }, [weatherDataState]);

    const getWeatherIcon = (key) => {
        switch (key) {
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

    const getAirMetrics = (name, value) => {
        const airIndex = getAirIndexBySensor(name, value);

        return (
            <div className='flex justify-between items-center space-x-2 mb-1'>
                <div className="flex justify-between w-full">
                    <span>{name}</span>
                    <span>{value}</span>
                </div>
                <div className='flex h-3 space-x-1'>
                    <div className='w-12 h-full rounded-l bg-slate-100' style={airIndex.index > 0 ? { backgroundColor: airIndex.color } : null}></div>
                    <div className='w-12 h-full bg-slate-100' style={airIndex.index > 1 ? { backgroundColor: airIndex.color } : null}></div>
                    <div className='w-12 h-full bg-slate-100' style={airIndex.index > 2 ? { backgroundColor: airIndex.color } : null}></div>
                    <div className='w-12 h-full bg-slate-100' style={airIndex.index > 3 ? { backgroundColor: airIndex.color } : null}></div>
                    <div className='w-12 h-full rounded-r bg-slate-100' style={airIndex.index > 4 ? { backgroundColor: airIndex.color } : null}></div>
                </div>
            </div>
        );
    }

    if (weatherData) {
        return (
            // <div className="flex items-center h-full w-96">
            <div>
                <div className="flex mb-16">
                    <div className="w-4/6">
                        <h1 className="text-2xl font-bold">{t(`${weatherData.name}`)}</h1>
                        <p className="mb-8">08:20 11/12/2022</p>
                        <div className="flex justify-start items-end space-x-2">
                            <h1 className="text-4xl font-bold">{Math.round(weatherData.main.temp)}<span>&deg;</span></h1>
                            <span>{t(`${weatherData.weather[0].description}`)}</span>
                        </div>
                    </div>
                    <div className="w-2/6 flex justify-center items-end">
                        {getWeatherIcon(weatherData.weather[0].main)}
                    </div>
                </div>
                <div className="mb-14">
                    {getAirMetrics('SO2', airData.so2)}
                    {getAirMetrics('NO2', airData.no2)}
                    {getAirMetrics('PM10', airData.pm10)}
                    {getAirMetrics('PM2.5', airData.pm2_5)}
                    {getAirMetrics('O3', airData.o3)}
                    {getAirMetrics('CO', airData.co)}
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <RiTempColdFill className="text-xl" />
                                <span className="ml-2 text-xs">MIN</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{Math.round(weatherData.main.temp_min)}<span>&deg;</span></p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <RiTempHotFill className="text-xl" />
                                <span className="ml-2 text-xs">MAX</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{Math.round(weatherData.main.temp_max)}<span>&deg;</span></p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <TbWindsock className="text-xl" />
                                <span className="ml-2 text-xs">{t('wind')}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{getWindDirectionCardinal(weatherData.wind.deg)}</p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <TbWind className="text-xl" />
                                <span className="ml-2 text-xs">{t('wind')}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{weatherData.wind.speed} m/s</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <IoWater className="text-xl" />
                                <span className="ml-2 text-xs">{t('humidity')}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{weatherData.main.humidity} %</p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <AiFillEye className="text-xl" />
                                <span className="ml-2 text-xs">{t('visibility')}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{weatherData.visibility / 1000} km</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <TbTemperature className="text-xl" />
                                <span className="ml-2 text-xs">{t('feels-like')}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{Math.round(weatherData.main.feels_like)}<span>&deg;</span></p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <AiOutlineDashboard className="text-xl" />
                                <span className="ml-2 text-xs">{t('pressure')}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{weatherData.main.pressure} Pha</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <WiSunrise className="text-xl" />
                                <span className="ml-2 text-xs">{t('sunrise')}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{moment.unix(weatherData.sys.sunrise).format('HH:mm')}</p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4">
                            <div className="flex items-center">
                                <WiSunset className="text-xl" />
                                <span className="ml-2 text-xs">{t('sunset')}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{moment.unix(weatherData.sys.sunset).format('HH:mm')}</p>
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