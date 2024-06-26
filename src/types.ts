interface HappyHour {
  day: number;
  startTime: number;
  endTime: number;
}

export interface Pub {
  id: number;
  name: string;
  website: string;
  logo: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  happyHours: HappyHour[];
}

export interface HappyHourStatus {
  status: 'past' | 'active' | 'upcoming' | 'later';
  startTime: number;
  startTimeDisplay: string;
  endTime: number;
  endTimeDisplay: string;
  day: number;
  dayDisplay: string;
}
