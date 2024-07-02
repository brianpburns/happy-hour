import { usePubsContext } from 'src/state/pubs-context';

export const useMapParams = () => {
  const { pubs, selectedPub } = usePubsContext();

  const selectedPubData = pubs.find((pub) => pub.id === selectedPub);

  return { pubs, selectedPubData };
};
