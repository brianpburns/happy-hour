import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Pub } from 'src/types';
import { pubs } from './pubs-data';

export const DEFAULT_LATITUDE = 49.266250342711686;
export const DEFAULT_LONGITUDE = -123.14568758010866;

interface PubContextProps {
  pubs: Pub[];
  drawerOpen: boolean;
  selectedPub: number | null;
  latitude: number;
  longitude: number;
  filteredPubs: Pub[];
  userLocationSet: boolean;
}

export const initialState: PubContextProps = {
  pubs,
  drawerOpen: false,
  selectedPub: null,
  latitude: DEFAULT_LATITUDE,
  longitude: DEFAULT_LONGITUDE,
  filteredPubs: [],
  userLocationSet: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    setDrawerOpen(state, action: PayloadAction<boolean>) {
      state.drawerOpen = action.payload;
    },
    setSelectedPub(state, action: PayloadAction<number | null>) {
      state.selectedPub = action.payload;
    },
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    setFilteredPubs(state, action: PayloadAction<Pub[]>) {
      state.filteredPubs = action.payload;
    },
    setUserLocation(state) {
      state.userLocationSet = true;
    },
  },
});

export const {
  setDrawerOpen,
  setSelectedPub,
  setLatitude,
  setLongitude,
  setFilteredPubs,
  setUserLocation,
} = appSlice.actions;
export const appReducer = appSlice.reducer;
