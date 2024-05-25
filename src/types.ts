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
  coordinate: {
    latitude: number;
    longitude: number;
  };
  happyHours: HappyHour[];
}
