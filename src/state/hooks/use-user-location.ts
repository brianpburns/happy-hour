import { useEffect, useState } from 'react';

import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';

/**
 * This hook should only be used by PubsContextProvider.
 */
export const useUserLocation = () => {
  const [latitude, setLatitude] = useState(49);
  const [longitude, setLongitude] = useState(-123);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const { coords } = await getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      setLatitude(latitude);
      setLongitude(longitude);
    };

    getLocation();
  }, []);

  return { latitude, setLatitude, longitude, setLongitude, error };
};
