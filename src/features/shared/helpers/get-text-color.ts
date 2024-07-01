import { HappyHourStatus } from 'src/types';

export const getTextColor = (status: HappyHourStatus['status']) => {
  return status === 'active' ? '#34d422' : status === 'upcoming' ? '#faa84b' : 'grey';
};

export const getIconColor = (status: HappyHourStatus['status']) => {
  return status === 'active' ? '#34d422' : status === 'upcoming' ? '#faa84b' : 'grey';
};
