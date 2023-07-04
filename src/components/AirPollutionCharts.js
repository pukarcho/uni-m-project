import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { AiOutlineInfoCircle, AiOutlineLineChart } from "react-icons/ai";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars-2";

import LineChartAirPollution from '../charts/LineChartAirPollution';
import LineChartForecast from "../charts/LineChartForecast";
import { getHistoryAirPollution, getForecast } from '../client/weatherClient';

import { getWeatherIcon } from '../helpers/ForecastHelper';
import { getWindDirectionCardinal } from "../helpers/WindHelper";
import { showPreloader } from "../store/slices/navigationSlice";

function AirPollutionCharts() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigation = useSelector((state) => state.navigation);
    const weatherDataState = useSelector((state) => state.mapData.weatherData);

    const [weatherData, setWeatherData] = useState(null);

    const [forecastData, setForecastData] = useState([]);
    const [forecastChartData, setForecastChartData] = useState([]);

    const [SO2Data, setSO2Data] = useState([]);
    const [NO2Data, setNO2Data] = useState([]);
    const [PM10Data, setPM10Data] = useState([]);
    const [PM2_5Data, setPM2_5Data] = useState([]);
    const [O3Data, setO3Data] = useState([]);
    const [COData, setCOData] = useState([]);

    useEffect(() => {
        if (navigation.moreInfoView) {
            getAirPollutionData();
            getForecastData();

            if (weatherDataState) {
                if (navigation.selectedCity === 'Ruse') {
                    setWeatherData(weatherDataState.find(a => a.name === 'Rousse'));
                }
                else {
                    setWeatherData(weatherDataState.find(a => a.name === navigation.selectedCity));
                }
            }
        }
    }, [navigation.moreInfoView]);

    const getAirPollutionData = async () => {
        let rawData = await getHistoryAirPollution(navigation.selectedCityCoord);

        let tempSO2Data = [];
        let tempNO2Data = [];
        let tempPM10Data = [];
        let tempPM2_5Data = [];
        let tempO3Data = [];
        let tempCOData = [];

        rawData.list.map((data) => {
            tempSO2Data.push({
                date: data.dt,
                value: data.components.so2
            });
            tempNO2Data.push({
                date: data.dt,
                value: data.components.no2
            });
            tempPM10Data.push({
                date: data.dt,
                value: data.components.pm10
            });
            tempPM2_5Data.push({
                date: data.dt,
                value: data.components.pm2_5
            });
            tempO3Data.push({
                date: data.dt,
                value: data.components.o3
            });
            tempCOData.push({
                date: data.dt,
                value: data.components.co
            });
        });

        setSO2Data(tempSO2Data);
        setNO2Data(tempNO2Data);
        setPM10Data(tempPM10Data);
        setPM2_5Data(tempPM2_5Data);
        setO3Data(tempO3Data);
        setCOData(tempCOData);
    };

    const getForecastData = async () => {
        let rawData = await getForecast(navigation.selectedCityCoord);

        let tempForecastData = [];
        let tempFerecastChartData = [];
        rawData.list.map((data) => {
            let date = moment.unix(data.dt).format('DD MMM');
            if (tempForecastData.filter(a => a.date === date).length === 0) {
                tempForecastData.push({
                    date: date,
                    main: [
                        data.main
                    ],
                    weatherIcons: [
                        data.weather[0].main
                    ],
                });
            }
            else {
                tempForecastData.find(a => a.date === date).main.push(data.main);
                tempForecastData.find(a => a.date === date).weatherIcons.push(data.weather[0].main);
            }

            tempFerecastChartData.push({
                date: data.dt,
                min: data.main.temp_min,
                max: data.main.temp_max,
                feelsLike: data.main.feels_like
            });
        });

        setForecastData(tempForecastData);
        setForecastChartData(tempFerecastChartData);

        setTimeout(() => {
            dispatch(showPreloader(false));
        }, 1000);
    };

    const getMostCommonElememt = (array) => {
        if (array.length == 0)
            return null;
        var modeMap = {};
        var maxEl = array[0], maxCount = 1;
        for (var i = 0; i < array.length; i++) {
            var el = array[i];
            if (modeMap[el] == null)
                modeMap[el] = 1;
            else
                modeMap[el]++;
            if (modeMap[el] > maxCount) {
                maxEl = el;
                maxCount = modeMap[el];
            }
        }
        return maxEl;
    };

    return (
        <div className="w-full text-white">
            <div className="flex flex-wrap justify-between items-center mx-4">
                <h3 className="mb-2 text-2xl">{t(navigation.selectedCity)}</h3>
                <span>{weatherData && moment(weatherData.dt * 1000).format("HH:mm DD/MM/YYYY")}</span>
            </div>
            <Scrollbars style={{ width: '100%', height: 'calc(100vh - 7rem)' }}>
                <div className="flex flex-wrap">
                    <div className="w-1/3 max-xl:w-1/2 max-lg:w-full p-4">
                        <div className="bg-gray-700 rounded-2xl p-4">
                            <h3>{t('current')}</h3>
                            <div className="h-[270px]">
                                {weatherData && (
                                    <div>
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col">
                                                <h1 className="text-4xl font-bold">{Math.round(weatherData.main.temp)}<span>&deg;</span></h1>
                                                <h3>{t('feels-like')}: {Math.round(weatherData.main.feels_like)}<span>&deg;</span></h3>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div>{getWeatherIcon(weatherData.weather[0].main, 'text-8xl')}</div>
                                                <span>{t(`${weatherData.weather[0].description}`)}</span>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="flex justify-between mt-6">
                                            <ul>
                                                <li>{t('wind')}: {weatherData.wind.speed} m/s</li>
                                                <li>{t('wind')}: {getWindDirectionCardinal(weatherData.wind.deg)}</li>
                                                <li>{t('humidity')}: {weatherData.main.humidity} %</li>
                                            </ul>
                                            <ul>
                                                <li>{t('pressure')}: {weatherData.main.pressure} Pha</li>
                                                <li>{t('sunrise')}: {moment.unix(weatherData.sys.sunrise).format('HH:mm')}</li>
                                                <li>{t('sunset')}: {moment.unix(weatherData.sys.sunset).format('HH:mm')}</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 max-xl:w-1/2 max-lg:w-full p-4">
                        <div className="bg-gray-700 rounded-2xl p-4">
                            <h3>{t('forecast_for_5_days')}</h3>
                            <div className="h-[270px]">
                                <Scrollbars style={{ width: '100%', height: '100%' }}>
                                    <div className="flex justify-center items-center h-full w-full max-md:w-fit">
                                        {forecastData.map((data, key) => (
                                            <div key={key} className={`flex flex-col items-center h-44 w-20 border-r-[1px] ${key === 0 ? 'border-l-[1px]' : ''}`}>
                                                <span className="mb-4">{data.date}</span>
                                                {getWeatherIcon(getMostCommonElememt(data.weatherIcons), 'text-5xl')}
                                                <span className="text-xl mt-4">{Math.round(Math.max(...data.main.map(item => item.temp_max)))}<span>&deg;</span></span>
                                                <div className="w-8 border-b-[1px]"></div>
                                                <span className="text-xl">{Math.round(Math.min(...data.main.map(item => item.temp_min)))}<span>&deg;</span></span>
                                            </div>
                                        ))}
                                    </div>
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 max-xl:w-1/2 max-lg:w-full p-4">
                        <div className="bg-gray-700 rounded-2xl p-4">
                            <h3>{t('detailed_forecast_for_5_days')}</h3>
                            <div className="h-[270px] max-md:h-[200px]">
                                <LineChartForecast data={forecastChartData} />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 max-xl:w-1/2 max-lg:w-full p-4">
                        <ChartWrapper
                            head={<h3>SO<sub>2</sub> {t('data_for_last_7_days')}</h3>}
                            chart={<LineChartAirPollution data={SO2Data} sensorName='SO2' name={<>SO<sub>2</sub></>} />}
                            info={t('SO2_short_description')}
                        />
                    </div>
                    <div className="w-1/3 max-xl:w-1/2 max-lg:w-full p-4">
                        <ChartWrapper
                            head={<h3>NO<sub>2</sub> {t('data_for_last_7_days')}</h3>}
                            chart={<LineChartAirPollution data={NO2Data} sensorName='NO2' name={<>NO<sub>2</sub></>} />}
                            info={t('NO2_short_description')}
                        />
                    </div>
                    <div className="w-1/3 max-xl:w-1/2 max-lg:w-full p-4">
                        <ChartWrapper
                            head={<h3>PM<sub>10</sub> {t('data_for_last_7_days')}</h3>}
                            chart={<LineChartAirPollution data={PM10Data} sensorName='PM10' name={<>PM<sub>10</sub></>} />}
                            info={t('PM10_short_description')}
                        />
                    </div>
                    <div className="w-1/3 max-xl:w-1/2 max-lg:w-full p-4">
                        <ChartWrapper
                            head={<h3>PM<sub>2.5</sub> {t('data_for_last_7_days')}</h3>}
                            chart={<LineChartAirPollution data={PM2_5Data} sensorName='PM2_5' name={<>PM<sub>2.5</sub></>} />}
                            info={t('PM2_5_short_description')}
                        />
                    </div>
                    <div className="w-1/3 max-xl:w-1/2 max-lg:w-full p-4">
                        <ChartWrapper
                            head={<h3>O<sub>3</sub> {t('data_for_last_7_days')}</h3>}
                            chart={<LineChartAirPollution data={O3Data} sensorName='O3' name={<>O<sub>3</sub></>} />}
                            info={t('O3_short_description')}
                        />
                    </div>
                    <div className="w-1/3 max-xl:w-1/2 max-lg:w-full p-4">
                        <ChartWrapper
                            head={<h3>CO {t('data_for_last_7_days')}</h3>}
                            chart={<LineChartAirPollution data={COData} sensorName='CO' name={<>CO</>} />}
                            info={t('CO_short_description')}
                        />
                    </div>
                </div>
            </Scrollbars>
        </div>
    );
};

function ChartWrapper({ head, chart, info }) {
    const [showInfoText, setShowInfoText] = useState(false);

    return (
        <div className="bg-gray-700 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
                {head}
                {showInfoText ? (
                    <AiOutlineLineChart className="text-xl cursor-pointer" onClick={() => setShowInfoText(state => !state)} />
                ) : (
                    <AiOutlineInfoCircle className="text-xl cursor-pointer" onClick={() => setShowInfoText(state => !state)} />
                )}
            </div>
            <div className="h-[270px] max-md:h-[200px]">
                {showInfoText ? (
                    <div className="p-4 h-full">
                        <Scrollbars style={{ width: '100%', height: '100%' }}>
                            {info}
                        </Scrollbars>
                    </div>
                ) : (
                    <>{chart}</>
                )}
            </div>
        </div>
    );
};

export default AirPollutionCharts;