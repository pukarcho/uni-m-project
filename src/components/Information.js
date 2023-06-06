import { useTranslation } from "react-i18next";
import { Tab } from "@headlessui/react";
import Scrollbars from "react-custom-scrollbars-2";

import { sensors, airQualityNames, colors } from "../helpers/AirMetricsHelper";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function Information() {
    const { t } = useTranslation();

    const tabs = [
        {
            id: 'SO2',
            name: <>SO<sub>2</sub></>,
            shortDescription: t('SO2_short_description'),
            image: "https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/06/power_plant/22104698-2-eng-GB/Power_plant_pillars.jpg"
        },
        {
            id: 'NO2',
            name: <>NO<sub>2</sub></>,
            shortDescription: t('NO2_short_description'),
            image: "https://thehill.com/wp-content/uploads/sites/2/2021/12/ca_vehicleemissions_istock.jpg?w=1280&h=720&crop=1"
        },
        {
            id: 'PM10',
            name: <>PM<sub>10</sub></>,
            shortDescription: t('PM10_short_description'),
            image: "https://cms.iqair.com/sites/default/files/blog/2021-01/PM10_Desk_b.jpg"
        },
        {
            id: 'PM2_5',
            name: <>PM<sub>2.5</sub></>,
            shortDescription: t('PM2_5_short_description'),
            image: "https://ichef.bbci.co.uk/news/624/mcs/media/images/75114000/jpg/_75114601_beijingsmogafp.jpg"
        },
        {
            id: 'O3',
            name: <>O<sub>3</sub></>,
            shortDescription: t('O3_short_description'),
            image: "https://www.trusens.com/siteassets/guides/ultimate-guide-to-air-pollutants/ozone.jpg?width=1254&height=836"
        },
        {
            id: 'CO',
            name: 'CO',
            shortDescription: t('CO_short_description'),
            image: "https://carfromjapan.com/wp-content/uploads/2019/10/car-air-pollution.jpg"
        }
    ];

    return (
        <Scrollbars style={{ width: '100%', height: 'calc(100vh - 4rem)' }}>
            <div className="flex justify-center">
                <div className="w-[1000px] my-8 max-lg:mx-8">
                    <div className="flex flex-col items-center">
                        <h3 className="text-2xl mb-6">{t('air_pollution')}</h3>
                        <div className="flex flex-col space-y-6">
                            <p className="indent-12">{t('air_pollution_part_1')}</p>
                            <p className="indent-12">{t('air_pollution_part_2')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-full py-8 sm:px-0">
                    <Tab.Group>
                        <div className="flex justify-center mx-2">
                            <Tab.List className="flex space-x-1 rounded-xl bg-gray-700 p-1 mb-8 w-[28rem]">
                                {tabs.map((tab) => (
                                    <Tab key={tab.id}
                                        className={({ selected }) =>
                                            classNames(
                                                'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                                                selected
                                                    ? 'bg-white shadow'
                                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                            )
                                        }
                                    >{tab.name}</Tab>
                                ))}
                            </Tab.List>
                        </div>
                        <Tab.Panels>
                            {tabs.map((tab) => (
                                <Tab.Panel key={tab.id}>
                                    <div className="flex justify-center bg-gray-700">
                                        <div className="w-[1000px] text-white">
                                            <div className="flex justify-center items-center space-x-12 max-lg:m-8">
                                                <div className="w-1/2 max-md:w-full">
                                                    <h3 className="text-2xl mb-4 max-md:text-center">{tab.name} {t('pollution')}</h3>
                                                    <p className="indent-12">{tab.shortDescription}</p>
                                                </div>
                                                <div className="h-[400px] w-1/2 max-lg:hidden">
                                                    <img className="h-full" src={tab.image} alt="image" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center my-8 max-md:mx-8">
                                        <h3 className="text-2xl mb-6">{t('reference_values_for')} {tab.name}</h3>
                                        <div className="flex flex-wrap justify-center">
                                            {airQualityNames.map((name, key) => (
                                                <div key={key} className="flex justify-center items-center m-4">
                                                    <div className="w-12 h-12 rounded-full m-2" style={{ backgroundColor: colors[key] }}></div>
                                                    <div className="flex flex-col items-center w-[100px]">
                                                        <h3>{t(name)}</h3>
                                                        <span>{sensors[tab.id][key].min} μg/m3</span>
                                                        <span>{sensors[tab.id][key].max ? sensors[tab.id][key].max : '∞'} μg/m3</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-[1000px]">
                    <hr className="border-gray-700" />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="w-[1000px] my-8">
                    <div className="flex flex-col items-center space-y-6">
                        <h3 className="text-2xl mb-6">{t('air_measurement')}</h3>
                        <div className="flex max-md:flex-col justify-center items-center md:space-x-6">
                            <div className="flex flex-col items-center md:w-1/2 space-y-6 max-md:m-8 max-lg:mx-8">
                                <p className="indent-12">{t('air_measurement_part_1')}</p>
                                <p className="indent-12">{t('air_measurement_part_2')}</p>
                            </div>
                            <img className="h-full md:w-1/2 max-md:my-4" src="https://debati.bg/wp-content/uploads/2021/02/8450385.jpg" alt="image" />
                        </div>
                        <p className="indent-12 max-lg:mx-8">{t('air_measurement_part_3')}</p>
                        <p className="indent-12 max-lg:mx-8">{t('air_measurement_part_4')}</p>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="flex justify-center bg-stone-800">
                <div className="flex flex-col items-center w-[1000px] my-8">
                    <h3 className="text-xl text-white">{t('data_source')}</h3>
                    <div className="flex max-md:flex-col justify-center items-center md:space-x-12 max-lg:mx-8">
                        <img className="w-1/2 h-1/2 max-md:my-8" src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png" alt="image" />
                        <p className="text-white">{t('OpenWeatherAPI_description')}</p>
                    </div>
                </div>
            </div>
            {/* <div className="flex justify-center bg-black py-2">
                <span className="text-white">Copy</span>
            </div> */}
        </Scrollbars>
    );
}

export default Information;