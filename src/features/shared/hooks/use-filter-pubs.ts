import { useDispatch, useSelector } from 'src/state';
import { setFilteredPubs } from 'src/state/appSlice';
import { HappyHourStatus } from 'src/types';
import { getHappyHourDetails } from '../helpers/get-happy-hour-details';

export const useFilterPubs = () => {
  const dispatch = useDispatch();
  const pubs = useSelector((state) => state.pubs);

  return (status: HappyHourStatus | 'all') => {
    if (status === 'all') {
      dispatch(setFilteredPubs(pubs));
      return;
    }

    const filtered = pubs.filter((pub) => {
      const { nextHappyHour } = getHappyHourDetails(pub);

      return status === nextHappyHour?.status;
    });

    dispatch(setFilteredPubs(filtered));
  };
};
