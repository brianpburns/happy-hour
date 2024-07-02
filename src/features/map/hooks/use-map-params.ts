import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { usePubsContext } from 'src/state/pubs-context';
import { useLocation } from './use-location';

export const useMapParams = () => {
  const params = useLocalSearchParams();
  const { pubId } = params;
  const pubIdNumber = parseInt(pubId as string);
  const [selectedPub, setSelectedPub] = useState<number | null>(pubIdNumber ?? null);
  const { pubs } = usePubsContext();
  const selectedPubData = pubs.find((pub) => pub.id === selectedPub);
  const { coords } = useLocation();

  const latitude = selectedPubData?.coordinates.latitude ?? coords.latitude;
  const longitude = selectedPubData?.coordinates.longitude ?? coords.longitude;

  useEffect(() => {
    if (pubIdNumber) {
      setSelectedPub(pubIdNumber);
    }
  }, [pubIdNumber]);

  return { pubs, selectedPub, setSelectedPub, selectedPubData, latitude, longitude };
};
