import { useEffect, useState } from 'react';

import Layout from './layout/Layout';
import Preloader from './layout/Preloader';

import { useSelector, useDispatch } from 'react-redux'
import { addDataWeather, addDataAir } from './store/slices/mapDataSlice';

import { getCurrentWeather, getCurrentAirPollution } from './client/weatherClient';

let working = false;

function App() {
  const markers = require('./map/markers.json');
  const dispatch = useDispatch();
  //const count = useSelector((state) => state.mapData.value);

  const [working, setWorking] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(0);

  useEffect(() => {
    if(!working && fetchSuccess === 0){
      markers['city'].map((marker) => {
        getMapData(marker.name, marker.cordinates);
        setWorking(true);
        setFetchSuccess(state => state + 1);
      });
    }
  }, []);

  useEffect(() => {
    if(fetchSuccess <= 54){
      setWorking(false);
    }
  }, [fetchSuccess]);


  const getMapData = async (city, coord) => {
    dispatch(addDataWeather(await getCurrentWeather(city)));
    dispatch(addDataAir({data: await getCurrentAirPollution(coord), name: city}));
  };

  if(working){
    return <Preloader />;
  }

  return <Layout />;
}

export default App;
