import { useState } from 'react';
import { usePubsContext } from 'src/state/pubs-context';
import { Pub } from 'src/types';

export const useSearchPubs = () => {
  const { pubs } = usePubsContext();
  const [results, setResults] = useState<Pub[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { setDrawerOpen, setLatitude, setLongitude } = usePubsContext();
  const { setSelectedPub } = usePubsContext();

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (term === '') {
      setResults([]);
    }

    setResults(
      pubs.filter((pub) => pub.name.toLowerCase().includes(term.toLowerCase())).map((pub) => pub),
    );
  };

  const resetSearch = () => {
    setSearchTerm('');
    setResults([]);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
  };

  const handleListSelection = (pub: Pub) => {
    setSelectedPub(pub.googlePlaceId);
    setLatitude(pub.coordinates.latitude);
    setLongitude(pub.coordinates.longitude);
    setDrawerOpen(true);
    setSearchTerm(pub.name);
    setResults([]);
  };

  return {
    results,
    searchTerm,
    handleSearch,
    resetSearch,
    clearSearch,
    handleListSelection,
  };
};
