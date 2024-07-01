import { Pub } from 'src/types';

export const pubs: Pub[] = [
  {
    id: 1,
    googlePlaceId: 'ChIJ57qrv7dzhlQRRuI062Hll2o',
    name: `Carlos O'Bryan's`,
    logo: 'https://www.kobcob.com/files/logo-1.png',
    website: 'https://www.kobcob.com/happy-hour/',
    coordinates: {
      latitude: 49.265325804046235,
      longitude: -123.14535265106639,
    },
    happyHours: [
      { day: 1, startTime: 14, endTime: 17 },
      { day: 1, startTime: 21, endTime: 24 },
      { day: 2, startTime: 14, endTime: 17 },
      { day: 2, startTime: 21, endTime: 24 },
      { day: 3, startTime: 14, endTime: 17 },
      { day: 3, startTime: 21, endTime: 24 },
      { day: 4, startTime: 14, endTime: 17 },
      { day: 4, startTime: 21, endTime: 24 },
      { day: 5, startTime: 14, endTime: 17 },
      { day: 5, startTime: 21, endTime: 24 },
      { day: 6, startTime: 14, endTime: 17 },
      { day: 6, startTime: 21, endTime: 1 },
      { day: 0, startTime: 14, endTime: 17 },
      { day: 0, startTime: 21, endTime: 24 },
    ],
  },
  {
    id: 2,
    googlePlaceId: 'ChIJi5E3G7ZzhlQR_PzPyIqgfBI',
    name: `Romer's`,
    logo: 'https://romersburgerbar.com/wp-content/themes/_tk-master/images/logo_dark.png',
    website: 'https://romersburgerbar.com/menus/drink-deals-happy-hour/',
    coordinates: {
      latitude: 49.268299099229296,
      longitude: -123.14719794566595,
    },
    happyHours: [
      { day: 6, startTime: 15, endTime: 18 },
      { day: 6, startTime: 21, endTime: 24 },
    ],
  },
];
