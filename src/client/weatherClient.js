import axios from 'axios';

export const getCurrentWeather = async (city) => {
    //const axios = require('axios');

    // Make a request for a user with a given ID
    return await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0f4e90f3fa8b0fa05b09b7551b747ec5&units=metric`)
      .then((response) => {
        // handle success
        // console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
      // .then(() => {
      //   // always executed
      // });
};