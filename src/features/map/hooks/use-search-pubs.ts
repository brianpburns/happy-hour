import { useState } from 'react';
import { usePubsContext } from 'src/state/pubs-context';
import { Pub } from 'src/types';

export const useSearchPubs = () => {
  const { pubs } = usePubsContext();
  const [results, setResults] = useState<Pub[]>([]);
  const [searchTerm, setSearchTerm] = useState('Search here');

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
    setSearchTerm('Search here');
    setResults([]);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setResults([]);
  };

  return { results, searchTerm, handleSearch, resetSearch, clearSearch };
};
