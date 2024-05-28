import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
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
            <Text>Today</Text>
            {todaysHappyHours.map(
              ({ status, startTimeDisplay, endTimeDisplay }) => {
                const color =
                  status === 'active'
                    ? 'green'
                    : status === 'upcoming'
                    ? 'orange'
                    : status === 'past' && 'grey';
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
            {!todaysHappyHours.length &&
              (nextHappyHour ? (
                <Text>
                  {nextHappyHour.startTimeDisplay} {nextHappyHour.dayDisplay}
                </Text>
              ) : (
                <Text>None upcoming</Text>
              ))}
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
    alignItems: 'center',
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
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 25,
    bottom: 0,
  },
});
