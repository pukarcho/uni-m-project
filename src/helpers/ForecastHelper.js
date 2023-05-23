import { BsFillCloudHazeFill, BsCloudSunFill, BsCloudLightningFill, BsCloudDrizzleFill, BsFillCloudRainHeavyFill, BsFillCloudSnowFill, BsFillSunFill } from 'react-icons/bs';

export const getWeatherIcon = (key, iconSize) => {
    switch (key) {
        case 'Thunderstorm':
            return <BsCloudLightningFill className={`${iconSize} fill-white"`} />;
        case 'Drizzle':
            return <BsCloudDrizzleFill className={`${iconSize} fill-white"`} />;
        case 'Rain':
            return <BsFillCloudRainHeavyFill className={`${iconSize} fill-white"`} />;
        case 'Snow':
            return <BsFillCloudSnowFill className={`${iconSize} fill-white"`} />;
        case 'Mist':
            return <BsFillCloudHazeFill className={`${iconSize} fill-white"`} />;
        case 'Clear':
            return <BsFillSunFill className={`${iconSize} fill-white"`} />;
        case 'Clouds':
            return <BsCloudSunFill className={`${iconSize} fill-white"`} />;
        default:
            return null;
    }
};