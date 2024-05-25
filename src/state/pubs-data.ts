import { Pub } from 'src/types';

export const pubs: Pub[] = [
  {
    id: 1,
    name: `Carlos O'Bryan's`,
    website: 'https://www.kobcob.com/',
    logo: 'https://www.kobcob.com/files/logo-1.png',
    coordinate: {
      latitude: 49.265325804046235,
      longitude: -123.14535265106639,
    },
    happyHours: [
      {
        day: 1,
        startTime: 14,
        endTime: 17,
      },
      {
        day: 1,
        startTime: 21,
        endTime: 24,
      },
      {
        day: 6,
        startTime: 14,
        endTime: 17,
      },
      {
        day: 6,
        startTime: 21,
        endTime: 1,
      },
    ],
  },
  {
    id: 2,
    name: `Romer's`,
    website: 'https://romersburgerbar.com/',
    logo: 'https://romersburgerbar.com/wp-content/themes/_tk-master/images/logo_dark.png',
    coordinate: {
      latitude: 49.268299099229296,
      longitude: -123.14719794566595,
    },
    happyHours: [
      {
        day: 6,
        startTime: 15,
        endTime: 18,
      },
      {
        day: 6,
        startTime: 21,
        endTime: 24,
      },
    ],
  },
];
