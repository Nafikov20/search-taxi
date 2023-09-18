
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IDriver} from "../types/driver";
interface Order {
    source_time: string;
    addresses: { address: string; lat: number; lon: number }[];
    crew_id: number | null;
}
export interface Crew {
    crewId: number;
    carMark: string;
    carModel: string;
    carColor: string;
    carNumber: string;
    driverName: string;
    driverPhone: string;
    lat: number;
    lon: number;
    distance: number;
}
interface TaxiState {
    address: string  ;
    selectedCrew: IDriver | null;
    availableCrews: Crew[];
    markerCoordinates: number[];
    orders: Order[];
}



const initialState: TaxiState = {
    address: '',
    selectedCrew: null,
    availableCrews: [],
    markerCoordinates: [],
    orders: [],
};


const taxiSlice = createSlice({
    name: 'taxi',
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setCrewId: (state, action: PayloadAction<IDriver | null>) => {
            state.selectedCrew = action.payload;
        },
        setCrews: (state, action: PayloadAction<Crew[]>) => {
            state.availableCrews = action.payload;
        },
        setMarkerCoordinates: (state, action: PayloadAction<[number, number]>) => {
            state.markerCoordinates = action.payload;
        },
        addOrder: (state, action: PayloadAction<Order>) => {
            state.orders.push(action.payload);
        },
    },
});

export const {
    setAddress,
    setCrewId,
    setCrews,
    setMarkerCoordinates,
    addOrder,
} = taxiSlice.actions;
export default taxiSlice.reducer;