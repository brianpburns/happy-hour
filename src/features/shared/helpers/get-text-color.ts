import { HappyHourDetails } from 'src/types';
import { themeColors } from '../styles';

export const getTextColor = (status: HappyHourDetails['status']) => {
  return status === 'active'
    ? themeColors.green
    : status === 'soon'
      ? themeColors.orange
      : themeColors.grey;
};

export const getIconColor = (status: HappyHourDetails['status']) => {
  return status === 'active'
    ? themeColors.green
    : status === 'soon'
      ? themeColors.orange
      : themeColors.grey;
};
