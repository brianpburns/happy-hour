import { HappyHourStatus } from 'src/types';
import { themeColors } from '../styles';

export const getTextColor = (status: HappyHourStatus['status']) => {
  return status === 'active'
    ? themeColors.green
    : status === 'upcoming'
      ? themeColors.orange
      : themeColors.grey;
};

export const getIconColor = (status: HappyHourStatus['status']) => {
  return status === 'active'
    ? themeColors.green
    : status === 'upcoming'
      ? themeColors.orange
      : themeColors.grey;
};
