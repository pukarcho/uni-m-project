import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { AiFillEye, AiOutlineDashboard } from 'react-icons/ai';
import { IoWater } from 'react-icons/io5';
import { RiTempColdFill, RiTempHotFill } from 'react-icons/ri';
import { TbWind, TbWindsock, TbTemperature } from 'react-icons/tb';
import { WiSunrise, WiSunset } from 'react-icons/wi';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import { getWindDirectionCardinal } from '../helpers/WindHelper';
import { getAirIndexBySensor, getMinMaxTooltipText } from '../helpers/AirMetricsHelper';
import { getWeatherIcon } from '../helpers/ForecastHelper';
import { showMoreInfoView, selectCity, showDrawerView, showPreloader } from '../store/slices/navigationSlice';

import Popover from "../layout/Popover";

const CurrentWeather = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useSelector((state) => state.navigation);
    const weatherDataState = useSelector((state) => state.mapData.weatherData);
    const airDataState = useSelector((state) => state.mapData.airData);

    const [weatherData, setWeatherData] = useState(null);
    const [airData, setAirData] = useState(null);

    useEffect(() => {
        if (weatherDataState) {
            if (navigation.selectedCity === 'Ruse') {
                setWeatherData(weatherDataState.find(a => a.name === 'Rousse'));
            }
            else {
                setWeatherData(weatherDataState.find(a => a.name === navigation.selectedCity));
            }
        }
        if (airDataState) {
            setAirData(airDataState.find(a => a.name === navigation.selectedCity).data.list[0].components);
        }
    }, [weatherDataState]);

    const getAirMetrics = (name, dislayName, value) => {
        const airIndex = getAirIndexBySensor(name, value);

        return (
            <div className='flex justify-between items-center space-x-2 mb-1'>
                <div className="flex justify-between w-full">
                    <span>{dislayName}</span>
                    <span>{value}</span>
                </div>
                <div className='flex h-3 space-x-1'>
                    <Popover content={getMinMaxTooltipText(0, name, t)}>
                        <div className='w-12 max-sm:w-10 h-full rounded-l bg-slate-100' style={airIndex.index > 0 ? { backgroundColor: airIndex.color } : null}></div>
                    </Popover>
                    <Popover content={getMinMaxTooltipText(1, name, t)}>
                        <div className='w-12 max-sm:w-10 h-full bg-slate-100' style={airIndex.index > 1 ? { backgroundColor: airIndex.color } : null}></div>
                    </Popover>
                    <Popover content={getMinMaxTooltipText(2, name, t)}>
                        <div className='w-12 max-sm:w-10 h-full bg-slate-100' style={airIndex.index > 2 ? { backgroundColor: airIndex.color } : null}></div>
                    </Popover>
                    <Popover content={getMinMaxTooltipText(3, name, t)}>
                        <div className='w-12 max-sm:w-10 h-full bg-slate-100' style={airIndex.index > 3 ? { backgroundColor: airIndex.color } : null}></div>
                    </Popover>
                    <Popover content={getMinMaxTooltipText(4, name, t)}>
                        <div className='w-12 max-sm:w-10 h-full rounded-r bg-slate-100' style={airIndex.index > 4 ? { backgroundColor: airIndex.color } : null}></div>
                    </Popover>
                </div>
            </div>
        );
    }

    const moreInfoClick = () => {
        dispatch(showPreloader(true));
        dispatch(showMoreInfoView(true));
        //dispatch(selectCity(null));
        dispatch(showDrawerView(false));
    };

    if (weatherData) {
        return (
            <>
                <div className="flex mb-12">
                    <div className="w-4/6">
                        <h1 className="text-2xl font-bold">{t(`${weatherData.name}`)}</h1>
                        <p className="mb-8">{moment(weatherData.dt * 1000).format("HH:mm DD/MM/YYYY")}</p>
                        <div className="flex justify-start items-end space-x-2">
                            <h1 className="text-4xl font-bold">{Math.round(weatherData.main.temp)}<span>&deg;</span></h1>
                            <span>{t(`${weatherData.weather[0].description}`)}</span>
                        </div>
                    </div>
                    <div className="w-2/6 flex justify-center items-end">
                        {getWeatherIcon(weatherData.weather[0].main, 'text-8xl')}
                    </div>
                </div>
                <div className="mb-8">
                    {getAirMetrics('SO2', <span>SO<sub>2</sub></span>, airData.so2)}
                    {getAirMetrics('NO2', <span>NO<sub>2</sub></span>, airData.no2)}
                    {getAirMetrics('PM10', <span>PM<sub>10</sub></span>, airData.pm10)}
                    {getAirMetrics('PM2.5', <span>PM<sub>2.5</sub></span>, airData.pm2_5)}
                    {getAirMetrics('O3', <span>O<sub>3</sub></span>, airData.o3)}
                    {getAirMetrics('CO', 'CO', airData.co)}
                </div>
                <div className="flex justify-center mb-4">
                    <div className="py-2 px-4 bg-slate-100 text-gray-700 rounded-lg cursor-pointer hover:bg-white" onClick={moreInfoClick}>{t('more_information')}</div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
                            <div className="flex items-center">
                                <RiTempColdFill className="text-xl" />
                                <span className="ml-2 text-xs">MIN</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{Math.round(weatherData.main.temp_min)}<span>&deg;</span></p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
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
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
                            <div className="flex items-center">
                                <TbWindsock className="text-xl" />
                                <span className="ml-2 text-xs">{t('wind').toUpperCase()}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{getWindDirectionCardinal(weatherData.wind.deg)}</p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
                            <div className="flex items-center">
                                <TbWind className="text-xl" />
                                <span className="ml-2 text-xs">{t('wind').toUpperCase()}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{weatherData.wind.speed} m/s</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
                            <div className="flex items-center">
                                <IoWater className="text-xl" />
                                <span className="ml-2 text-xs">{t('humidity').toUpperCase()}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{weatherData.main.humidity} %</p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
                            <div className="flex items-center">
                                <AiFillEye className="text-xl" />
                                <span className="ml-2 text-xs">{t('visibility').toUpperCase()}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{weatherData.visibility / 1000} km</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
                            <div className="flex items-center">
                                <TbTemperature className="text-xl" />
                                <span className="ml-2 text-xs">{t('feels-like').toUpperCase()}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{Math.round(weatherData.main.feels_like)}<span>&deg;</span></p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
                            <div className="flex items-center">
                                <AiOutlineDashboard className="text-xl" />
                                <span className="ml-2 text-xs">{t('pressure').toUpperCase()}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{weatherData.main.pressure} Pha</p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-6 mb-4">
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
                            <div className="flex items-center">
                                <WiSunrise className="text-xl" />
                                <span className="ml-2 text-xs">{t('sunrise').toUpperCase()}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{moment.unix(weatherData.sys.sunrise).format('HH:mm')}</p>
                        </div>
                    </div>
                    <div className="w-2/4">
                        <div className="w-full h-20 bg-gray-700 rounded-2xl p-4 max-sm:p-2">
                            <div className="flex items-center">
                                <WiSunset className="text-xl" />
                                <span className="ml-2 text-xs">{t('sunset').toUpperCase()}</span>
                            </div>
                            <p className="text-xl font-bold ml-6">{moment.unix(weatherData.sys.sunset).format('HH:mm')}</p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <p>Loading</p>
        );
    }
};

export default CurrentWeather;