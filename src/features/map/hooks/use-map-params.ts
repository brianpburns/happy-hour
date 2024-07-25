import { useSelector } from 'src/state';

export const useMapParams = () => {
  const pubs = useSelector((state) => state.pubs);
  const selectedPub = useSelector((state) => state.selectedPub);

  const selectedPubData = pubs.find((pub) => pub.id === selectedPub);

  return { pubs, selectedPubData };
};
