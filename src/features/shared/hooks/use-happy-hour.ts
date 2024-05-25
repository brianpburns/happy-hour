import { Pub } from 'src/types';

export const useHappyHour = (pub: Pub) => {
  const today = new Date();
  const day = today.getDay();
  const currentHour = new Date().getHours();

  const todaysHappyHour = pub.happyHours.find(
    (happyHour) => happyHour.day === day
  );

  if (!todaysHappyHour) return 'inactive';
  const { startTime, endTime } = todaysHappyHour;

  if (currentHour >= startTime && currentHour <= endTime) {
    return 'active';
  } else if (currentHour >= startTime - 1) {
    return 'upcoming';
  } else {
    return 'inactive';
  }
};
