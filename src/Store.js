import { configureStore } from "@reduxjs/toolkit";
import searchFlightReducer from './SearchFlightSlice'
import searchFlightResultReducer from "./SearchFlightResultSlice";
import selectedFlightReducer from './SelectedFlightSlice';

const store=configureStore({
    reducer:{
        searchFlight:searchFlightReducer,
        searchFlightResult:searchFlightResultReducer,
        selectedFlight:selectedFlightReducer
    }
})

export default store