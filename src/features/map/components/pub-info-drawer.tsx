import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { getTextColor } from 'src/features/shared/helpers/get-text-color';
import { useTodaysHappyHours } from 'src/features/shared/hooks/use-happy-hour';
import { Pub } from 'src/types';

interface Props {
  pub?: Pub;
  isOpen: boolean;
  close: () => void;
}

export const PubInfoDrawer = ({ pub, isOpen, close }: Props) => {
  const windowHeight = Dimensions.get('window').height;
  const name = pub?.name;
  const { todaysHappyHours, nextHappyHour } = useTodaysHappyHours(pub);
  const today = new Date().getDay();

  const laterHappyHours = todaysHappyHours.filter(
    (hh) =>
      !['past', 'active'].includes(hh.status) &&
      hh.startTime !== nextHappyHour?.startTime
  );

  return (
    <Modal
      animationIn='slideInUp'
      isVisible={isOpen}
      coverScreen={false}
      hasBackdrop={false}
      style={styles.modal}
    >
      <View style={[styles.bottomSheet, { height: windowHeight * 0.3 }]}>
        <View>
          <View style={styles.handle} />
          <View style={styles.textContainer}>
            <Text style={styles.heading}>{name}</Text>
            <Text>Next Happy Hour</Text>
            {nextHappyHour ? (
              <Text style={{ color: getTextColor(nextHappyHour.status) }}>
                {nextHappyHour.startTimeDisplay}-{nextHappyHour.endTimeDisplay}{' '}
                {nextHappyHour.day !== today ? nextHappyHour.dayDisplay : ''}
              </Text>
            ) : (
              <Text>None upcoming</Text>
            )}
            {!!laterHappyHours.length && <Text>Later</Text>}
            {laterHappyHours.map(
              ({ status, startTimeDisplay, endTimeDisplay }) => {
                const color = getTextColor(status);
                const style = color ? { color } : {};

                return (
                  <Text
                    key={startTimeDisplay}
                    style={{ ...style, fontWeight: '600', fontSize: 16 }}
                  >
                    {startTimeDisplay} - {endTimeDisplay}
                  </Text>
                );
              }
            )}
            <TouchableOpacity onPress={close}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    margin: 0,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  handle: {
    opacity: 0.2,
    height: 1,
    borderWidth: 1,
    borderColor: '#86827e',
    marginVertical: 16,
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 25,
    bottom: 0,
  },
});
