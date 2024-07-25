import { useState } from 'react';
import { useDispatch, useSelector } from 'src/state';
import { setDrawerOpen, setLatitude, setLongitude, setSelectedPub } from 'src/state/appSlice';
import { Pub } from 'src/types';

export const useSearchPubs = () => {
  const [results, setResults] = useState<Pub[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const pubs = useSelector((state) => state.pubs);
  const dispatch = useDispatch();

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
    dispatch(setSelectedPub(pub.id));
    dispatch(setLatitude(pub.coordinates.latitude));
    dispatch(setLongitude(pub.coordinates.longitude));
    dispatch(setDrawerOpen(true));
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
