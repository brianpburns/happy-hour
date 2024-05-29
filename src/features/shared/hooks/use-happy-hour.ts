import { HappyHourStatus, Pub } from 'src/types';

const displayTime = (time: number) => {
  if (time === 24) return '12am';

  return time >= 12 ? `${time - 12}pm` : `${time}am`;
};

const displayDay = (day: number) => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[day];
};

export const useTodaysHappyHours = (pub?: Pub) => {
  const today = new Date();
  const day = today.getDay();
  const currentHour = new Date().getHours();

  let nextHappyHour: HappyHourStatus | undefined = undefined;
  const todaysHappyHours: HappyHourStatus[] = [];

  if (!pub) {
    return { todaysHappyHours, nextHappyHour };
  }

  const todaysHH = pub.happyHours.filter((happyHour) => happyHour.day === day);

  const formatData = (
    happyHour: Omit<
      HappyHourStatus,
      'startTimeDisplay' | 'endTimeDisplay' | 'dayDisplay'
    >
  ) => {
    const startTimeDisplay = displayTime(happyHour.startTime);
    const endTimeDisplay = displayTime(happyHour.endTime);
    const dayDisplay = displayDay(happyHour.day);

    return { ...happyHour, startTimeDisplay, endTimeDisplay, dayDisplay };
  };

  todaysHH.map((happyHour) => {
    const { startTime, endTime } = happyHour;
    let status: HappyHourStatus['status'] = 'later';

    if (currentHour >= endTime) {
      status = 'past';
    } else if (currentHour >= startTime && currentHour <= endTime) {
      status = 'active';
    } else if (currentHour >= startTime - 2) {
      status = 'upcoming';
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
