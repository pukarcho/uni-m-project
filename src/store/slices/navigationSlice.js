import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedCity: null,
    selectedCityCoord: [],
    drawerView: false,
    moreInfoView: false,
    preloaderView: true,
}

export const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        selectCity: (state, action) => {
            state.selectedCity = action.payload;
        },
        selectCityCoord: (state, action) => {
            state.selectedCityCoord = action.payload;
        },
        showDrawerView: (state, action) => {
            state.drawerView = action.payload;
        },
        showMoreInfoView: (state, action) => {
            state.moreInfoView = action.payload;
        },
        showPreloader: (state, action) => {
            state.preloaderView = action.payload;
        },
    },
})

export const { selectCity, selectCityCoord, showDrawerView, showMoreInfoView, showPreloader } = navigationSlice.actions

export default navigationSlice.reducer