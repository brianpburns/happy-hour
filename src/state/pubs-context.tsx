import { createContext, useContext, useState } from 'react';
import { useUserLocation } from 'src/state/hooks/use-user-location';
import { Pub } from 'src/types';
import { pubs } from './pubs-data';

interface PubContextProps {
  pubs: Pub[];
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  selectedPub: number | null;
  setSelectedPub: (id: number | null) => void;
  latitude: number;
  setLatitude: (latitude: number) => void;
  longitude: number;
  setLongitude: (longitude: number) => void;
  filteredPubs: Pub[];
  setFilteredPubs: (pubs: Pub[]) => void;
}

const defaultContext = {
  pubs: [],
  drawerOpen: false,
  setDrawerOpen: () => {},
  selectedPub: null,
  setSelectedPub: () => {},
  latitude: 0,
  setLatitude: () => {},
  longitude: 0,
  setLongitude: () => {},
  filteredPubs: pubs,
  setFilteredPubs: () => {},
};

export const PubsContext = createContext<PubContextProps>(defaultContext);

export const PubsContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedPub, setSelectedPub] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { latitude, setLatitude, longitude, setLongitude } = useUserLocation();
  const [filteredPubs, setFilteredPubs] = useState<Pub[]>(pubs);

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
    filteredPubs,
    setFilteredPubs,
  };

  return <PubsContext.Provider value={value}>{children}</PubsContext.Provider>;
};

export const usePubsContext = () => useContext(PubsContext);
