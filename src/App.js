import { useEffect, useState } from 'react';

import Layout from './layout/Layout';

import { useSelector, useDispatch } from 'react-redux'
import { addDataWeather, addDataAir } from './store/slices/mapDataSlice';

import { getCurrentWeather, getCurrentAirPollution } from './client/weatherClient';

let working = false;

function App() {
  const markers = require('./map/markers.json');
  const dispatch = useDispatch();
  //const count = useSelector((state) => state.mapData.value);

  const [fetchSuccess, setFetchSuccess] = useState(0);

  useEffect(() => {
    console.log("---");

    if(!working && fetchSuccess === 0){
      working = true;

      markers['city'].map((marker) => {
        getMapData(marker.name, marker.cordinates);
      });
    }
  }, []);

  useEffect(() => {
    if(fetchSuccess === 27){
      working = false;
    }
  }, [fetchSuccess]);


  const getMapData = async (city, coord) => {
    dispatch(addDataWeather(await getCurrentWeather(city)));
    dispatch(addDataAir({data: await getCurrentAirPollution(coord), name: city}));
  };


  return <Layout />;
}

export default App;
