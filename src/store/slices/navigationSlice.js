import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedCity: null,
    selectedCityCoord: [],
    drawerView: false,
    moreInfoView: false,
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
    },
})

export const { selectCity, selectCityCoord, showDrawerView, showMoreInfoView } = navigationSlice.actions

export default navigationSlice.reducer