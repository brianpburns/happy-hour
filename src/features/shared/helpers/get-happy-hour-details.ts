import { HappyHourDetails, Pub } from 'src/types';

export const displayTime = (time: number) => {
  if (time === 24) return '12am';

  return time >= 12 ? `${time - 12}pm` : `${time}am`;
};

export const displayDay = (day: number) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[day];
};

export const displayDayFull = (day: number) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[day];
};

export const getHappyHourDetails = (pub: Pub) => {
  const today = new Date();
  const day = today.getDay();
  const currentHour = new Date().getHours();

  let nextHappyHour: HappyHourDetails | undefined = undefined;
  const todaysHappyHours: HappyHourDetails[] = [];

  const todaysHH = pub.happyHours.filter((happyHour) => happyHour.day === day);

  const formatData = (
    happyHour: Omit<HappyHourDetails, 'startTimeDisplay' | 'endTimeDisplay' | 'dayDisplay'>,
  ) => {
    const startTimeDisplay =
      happyHour.status === 'active' ? 'Now' : displayTime(happyHour.startTime);
    const endTimeDisplay = displayTime(happyHour.endTime);
    const dayDisplay = displayDay(happyHour.day);

    return { ...happyHour, startTimeDisplay, endTimeDisplay, dayDisplay };
  };

  todaysHH.map((happyHour) => {
    const { startTime, endTime } = happyHour;
    let status: HappyHourDetails['status'] = 'later';

    if (currentHour >= endTime) {
      status = 'past';
    } else if (currentHour >= startTime && currentHour <= endTime) {
      status = 'active';
    } else if (currentHour >= startTime - 2) {
      status = 'soon';
    }

    const data = formatData({ status, startTime, endTime, day });
    todaysHappyHours.push(data);
    if (!nextHappyHour && status !== 'past') {
      nextHappyHour = data;
    }
  });

  if (!nextHappyHour) {
    const data = pub.happyHours.find((happyHour) => happyHour.day > day);

    if (data) {
      const { startTime, endTime, day } = data;

      nextHappyHour = formatData({ status: 'later', startTime, endTime, day });
    }
  }

  return { todaysHappyHours, nextHappyHour };
};
