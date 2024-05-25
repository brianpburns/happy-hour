interface HappyHour {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Pub {
  id: number;
  name: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  happyHours: HappyHour[];
}
