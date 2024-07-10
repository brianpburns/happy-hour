import React from 'react';
import { View } from 'react-native';
import { HappyHour } from 'src/types';
import { TimeListItem } from './time-list-item';

interface Props {
  happyHours: HappyHour[];
}

const groupedHappyHours = (happyHours: HappyHour[]) => {
  const today = new Date().getDay();

  const happyHoursByDay = happyHours.reduce((acc: Record<number, HappyHour[]>, hh) => {
    if (!acc[hh.day]) {
      acc[hh.day] = [];
    }

    acc[hh.day].push(hh);

    return acc;
  }, {});

  const previousDays: Record<number, HappyHour[]> = {};

  const todayPlus = Object.keys(happyHoursByDay).reduce((acc: Record<number, HappyHour[]>, day) => {
    if (Number(day) >= today) {
      acc[parseInt(day)] = happyHoursByDay[parseInt(day)];
    } else {
      previousDays[parseInt(day)] = happyHoursByDay[parseInt(day)];
    }

    return acc;
  }, {});

  return { todayPlus, previousDays };
};

export const FullTimesList = ({ happyHours }: Props) => {
  const { todayPlus, previousDays } = groupedHappyHours(happyHours);

  return (
    <View>
      {Object.values(todayPlus).map((hh) => (
        <TimeListItem key={`${hh[0].day}-${hh[0].startTime}`} hh={hh} />
      ))}
      {Object.values(previousDays).map((hh) => (
        <TimeListItem key={`${hh[0].day}-${hh[0].startTime}`} hh={hh} />
      ))}
    </View>
  );
};
