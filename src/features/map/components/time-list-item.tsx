import { StyleSheet, View } from 'react-native';
import { StyledText } from 'src/features/shared/components/styled-text';
import { displayDayFull, displayTime } from 'src/features/shared/helpers/get-happy-hour-details';
import { HappyHour } from 'src/types';

export const TimeListItem = ({ hh }: { hh: HappyHour[] }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dayWrapper}>
        <StyledText>{displayDayFull(hh[0].day)}</StyledText>
      </View>
      <View style={styles.timesWrapper}>
        {hh.map((time) => (
          <StyledText key={time.startTime}>
            {displayTime(time.startTime)} - {displayTime(time.endTime)}
          </StyledText>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    alignItems: 'flex-start',
    // flex: 1,
  },
  dayWrapper: {
    // width: '40%',
  },
  timesWrapper: {
    flexDirection: 'column',
  },
});
