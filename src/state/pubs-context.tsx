import { createContext, useContext } from 'react';
import { Pub } from 'src/types';
import { pubs } from './pubs-data';

interface PubContextProps {
  pubs: Pub[];
  // setPubs: (pubs: Pub[]) => void;
}

const defaultContext = {
  pubs: [],
  // setPubs: () => {},
};

export const PubsContext = createContext<PubContextProps>(defaultContext);

export const PubsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PubsContext.Provider value={{ pubs }}>{children}</PubsContext.Provider>
  );
};

export const usePubsContext = () => useContext(PubsContext);
