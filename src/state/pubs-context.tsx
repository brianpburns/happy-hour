import { createContext, useContext, useState } from 'react';
import { useLocation } from 'src/features/map/hooks/use-location';
import { Pub } from 'src/types';
import { pubs } from './pubs-data';

interface PubContextProps {
  pubs: Pub[];
  // setPubs: (pubs: Pub[]) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  selectedPub: number | null;
  setSelectedPub: (id: number | null) => void;
  latitude: number;
  setLatitude: (latitude: number) => void;
  longitude: number;
  setLongitude: (longitude: number) => void;
}

const defaultContext = {
  pubs: [],
  // setPubs: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
  selectedPub: null,
  setSelectedPub: () => {},
  latitude: 0,
  setLatitude: () => {},
  longitude: 0,
  setLongitude: () => {},
};

export const PubsContext = createContext<PubContextProps>(defaultContext);

export const PubsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPub, setSelectedPub] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { coords } = useLocation();
  const [latitude, setLatitude] = useState(coords.latitude);
  const [longitude, setLongitude] = useState(coords.longitude);

  const value = {
    pubs,
    drawerOpen,
    setDrawerOpen,
    selectedPub,
    setSelectedPub,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
  };

  return <PubsContext.Provider value={value}>{children}</PubsContext.Provider>;
};

export const usePubsContext = () => useContext(PubsContext);
