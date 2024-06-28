import { useEffect, useState } from 'react';

import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

export const useLocation = () => {
  const [coords, setCoords] = useState({ latitude: 49, longitude: -123 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const { coords } = await getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      setCoords({ latitude, longitude });
    })();
  }, []);

  return { coords, error };
};
