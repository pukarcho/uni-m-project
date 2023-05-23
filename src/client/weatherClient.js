import axios from 'axios';
import moment from 'moment';

export const getCurrentWeather = async (city) => {
  //const axios = require('axios');

  return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0f4e90f3fa8b0fa05b09b7551b747ec5&units=metric`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCurrentAirPollution = async (coord) => {
  return await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord[0]}&lon=${coord[1]}&appid=0f4e90f3fa8b0fa05b09b7551b747ec5`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getHistoryAirPollution = async (coord) => {
  let startDate = moment().unix();
  let endDate = moment().add(-7, 'days').unix();
  return await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution/history?lat=${coord[0]}&lon=${coord[1]}&start=${endDate}&end=${startDate}&appid=0f4e90f3fa8b0fa05b09b7551b747ec5`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getForecast = async (coord) => {
  return await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${coord[0]}&lon=${coord[1]}&appid=0f4e90f3fa8b0fa05b09b7551b747ec5&units=metric`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};