import { usePubsContext } from 'src/state/pubs-context';

export const useMapParams = () => {
  const { pubs, selectedPub } = usePubsContext();

  const selectedPubData = pubs.find((pub) => pub.googlePlaceId === selectedPub);

  return { pubs, selectedPubData };
};
