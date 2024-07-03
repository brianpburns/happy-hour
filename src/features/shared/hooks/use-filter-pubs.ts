import { usePubsContext } from 'src/state/pubs-context';
import { HappyHourStatus } from 'src/types';
import { getHappyHourDetails } from '../helpers/get-happy-hour-details';

export const useFilterPubs = () => {
  const { pubs, setFilteredPubs } = usePubsContext();

  return (status: HappyHourStatus | 'all') => {
    if (status === 'all') {
      setFilteredPubs(pubs);
      return;
    }

    const filtered = pubs.filter((pub) => {
      const { nextHappyHour } = getHappyHourDetails(pub);

      return status === nextHappyHour?.status;
    });

    setFilteredPubs(filtered);
  };
};
