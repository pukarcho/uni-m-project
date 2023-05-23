import { configureStore } from '@reduxjs/toolkit'

import mapDataReducer from './slices/mapDataSlice';
import navigationReducer from './slices/navigationSlice';

export const store = configureStore({
    reducer: {
      mapData: mapDataReducer,
      navigation: navigationReducer,
    },
  })