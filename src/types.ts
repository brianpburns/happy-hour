interface HappyHour {
  day: number;
  startTime: number;
  endTime: number;
}

export interface Pub {
  id: number;
  googlePlaceId: string;
  name: string;
  website: string;
  logo: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  happyHours: HappyHour[];
}

export type HappyHourStatus = 'past' | 'active' | 'soon' | 'later';
export interface HappyHourDetails {
  status: HappyHourStatus;
  startTime: number;
  startTimeDisplay: string;
  endTime: number;
  endTimeDisplay: string;
  day: number;
  dayDisplay: string;
}
