import { configureStore } from '@reduxjs/toolkit'

import mapDataReducer from './slices/mapDataSlice';

export const store = configureStore({
    reducer: {
      mapData: mapDataReducer,
    },
  })