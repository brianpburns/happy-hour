import { Pub } from './types';

export const pubs: Pub[] = [
  {
    id: 1,
    name: `Carlos O'Bryan's`,
    coordinate: {
      latitude: 49.265325804046235,
      longitude: -123.14535265106639,
    },
    happyHours: [
      {
        day: 'Monday',
        startTime: '14:00',
        endTime: '17:00',
      },
      {
        day: 'Monday',
        startTime: '21:00',
        endTime: '24:00',
      },
    ],
  },
];
