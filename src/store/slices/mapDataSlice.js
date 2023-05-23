import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  weatherData: [],
  airData: [],
}

export const mapDataSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    addDataWeather: (state, action) => {
      state.weatherData.push(action.payload);
    },
    addDataAir: (state, action) => {
      state.airData.push(action.payload);
    },
  },
})

export const { addDataWeather, addDataAir } = mapDataSlice.actions

export default mapDataSlice.reducer