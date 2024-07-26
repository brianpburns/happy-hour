import { useEffect, useState } from 'react';

import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from 'expo-location';
import { useDispatch, useSelector } from '..';
import { setLatitude, setLongitude, setUserLocation } from '../appSlice';

/**
 * This hook should only run once
 */
export const useUserLocation = () => {
  const dispatch = useDispatch();
  const userLocationSet = useSelector((state) => state.userLocationSet);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        // TODO: Handle error - show message
        setError('Permission to access location was denied');
        dispatch(setUserLocation());
        return;
      }

      const { coords } = await getCurrentPositionAsync({});
      const { latitude, longitude } = coords;

      dispatch(setLatitude(latitude));
      dispatch(setLongitude(longitude));
      dispatch(setUserLocation());
    };

    if (!userLocationSet) {
      getLocation();
    }
  }, []);

  return { error };
};
