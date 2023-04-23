export const getAirIndexBySensor = (name, value) => {
    let color = '';
    let index = 0;

    switch(name){
        case 'SO2':
            index = sensors.SO2.findIndex(a => a.min <= value && value < a.max) + 1;
            break;
        case 'NO2':
            index = sensors.NO2.findIndex(a => a.min <= value && value < a.max) + 1;
            break;
        case 'PM10':
            index = sensors.PM10.findIndex(a => a.min <= value && value < a.max) + 1;
            break;
        case 'PM2.5':
            index = sensors.PM2_5.findIndex(a => a.min <= value && value < a.max) + 1;
            break;
        case 'O3':
            index = sensors.O3.findIndex(a => a.min <= value && value < a.max) + 1;
            break;
        case 'CO':
            index = sensors.CO.findIndex(a => a.min <= value && value < a.max) + 1;
            break;
        default:
            index = 0;
    }

    color = colors[index - 1];

    return { index: index, color: color };
};

export const getMinMaxTooltipText = (barIndex, name, t) => {
    switch(name){
        case 'SO2':
            return `${t(airQualityNames[barIndex])}: ${sensors.SO2[barIndex].min} - ${sensors.SO2[barIndex].max ?? '∞'} μg/m3`;
        case 'NO2':
            return `${t(airQualityNames[barIndex])}: ${sensors.NO2[barIndex].min} - ${sensors.NO2[barIndex].max ?? '∞'} μg/m3`;
        case 'PM10':
            return `${t(airQualityNames[barIndex])}: ${sensors.PM10[barIndex].min} - ${sensors.PM10[barIndex].max ?? '∞'} μg/m3`;
        case 'PM2.5':
            return `${t(airQualityNames[barIndex])}: ${sensors.PM2_5[barIndex].min} - ${sensors.PM2_5[barIndex].max ?? '∞'} μg/m3`;
        case 'O3':
            return `${t(airQualityNames[barIndex])}: ${sensors.O3[barIndex].min} - ${sensors.O3[barIndex].max ?? '∞'} μg/m3`;
        case 'CO':
            return `${t(airQualityNames[barIndex])}: ${sensors.CO[barIndex].min} - ${sensors.CO[barIndex].max ?? '∞'} μg/m3`;
        default:
            return '';
    }
};

const colors = ['#2FFF01', '#FFF701', '#FFA601', '#FF5D01', '#FF0101'];

const airQualityNames = ['good', 'fair', 'moderate', 'poor', 'very_poor'];

const sensors = {
    SO2: [
        {
            min: 0,
            max: 20
        },
        {
            min: 20,
            max: 80
        },
        {
            min: 80,
            max: 250
        },
        {
            min: 250,
            max: 350
        },
        {
            min: 350,
            max: null
        },
    ],
    NO2: [
        {
            min: 0,
            max: 40
        },
        {
            min: 40,
            max: 70
        },
        {
            min: 70,
            max: 150
        },
        {
            min: 150,
            max: 200
        },
        {
            min: 200,
            max: null
        },
    ],
    PM10: [
        {
            min: 0,
            max: 20
        },
        {
            min: 20,
            max: 50
        },
        {
            min: 50,
            max: 100
        },
        {
            min: 100,
            max: 200
        },
        {
            min: 200,
            max: null
        },
    ],
    PM2_5: [
        {
            min: 0,
            max: 10
        },
        {
            min: 10,
            max: 25
        },
        {
            min: 25,
            max: 50
        },
        {
            min: 50,
            max: 75
        },
        {
            min: 75,
            max: null
        },
    ],
    O3: [
        {
            min: 0,
            max: 60
        },
        {
            min: 60,
            max: 100
        },
        {
            min: 100,
            max: 140
        },
        {
            min: 140,
            max: 180
        },
        {
            min: 180,
            max: null
        },
    ],
    CO: [
        {
            min: 0,
            max: 4400
        },
        {
            min: 4400,
            max: 9400
        },
        {
            min: 9400,
            max: 12400
        },
        {
            min: 12400,
            max: 15400
        },
        {
            min: 15400,
            max: null
        },
    ]
};