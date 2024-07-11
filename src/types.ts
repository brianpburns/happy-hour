export interface HappyHour {
  day: number;
  startTime: number;
  endTime: number;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Pub {
  googlePlaceId: string;
  name: string;
  website: string;
  logo: string;
  coordinates: Coordinate;
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
