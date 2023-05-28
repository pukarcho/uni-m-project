import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment';
import { useTranslation } from 'react-i18next';

import Layout from './layout/Layout';

import { addDataWeather, addDataAir } from './store/slices/mapDataSlice';
import { showPreloader } from './store/slices/navigationSlice';
import { getCurrentWeather, getCurrentAirPollution } from './client/weatherClient';

//let working = false;

function App() {
  const markers = require('./map/markers.json');
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  //const count = useSelector((state) => state.mapData.value);

  const [working, setWorking] = useState(false);
  const [fetchSuccess, setFetchSuccess] = useState(0);

  useEffect(() => {
    if(localStorage.getItem('language') === null){
      i18n.changeLanguage('bg');
      moment.locale('bg');
      localStorage.setItem('language', 'bg');
    }

    if(!working && fetchSuccess === 0){
      markers['city'].map((marker) => {
        getMapData(marker.name, marker.cordinates);
        setWorking(true);
        setFetchSuccess(state => state + 1);
      });
    }
  }, []);

  useEffect(() => {
    if(fetchSuccess >= 27){
      setWorking(false);
      setTimeout(() => {
        dispatch(showPreloader(false));
      }, 1000);
      
    }
  }, [fetchSuccess]);


  const getMapData = async (city, coord) => {
    dispatch(addDataWeather(await getCurrentWeather(city)));
    dispatch(addDataAir({data: await getCurrentAirPollution(coord), name: city}));
  };

  return <Layout />;
}

export default App;
