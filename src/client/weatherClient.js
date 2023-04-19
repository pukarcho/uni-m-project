import axios from 'axios';

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
  return await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${coord[0]}&lon=${coord[1]}&appid=0f4e90f3fa8b0fa05b09b7551b747ec5`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};