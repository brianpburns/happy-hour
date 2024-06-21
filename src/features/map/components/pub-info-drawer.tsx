import {
  Dimensions,
  Linking,
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
  pub: Pub;
  isOpen: boolean;
  close: () => void;
}

export const PubInfoDrawer = ({ pub, isOpen, close }: Props) => {
  const windowHeight = Dimensions.get('window').height;
  const { name, website } = pub;
  const { todaysHappyHours, nextHappyHour } = useTodaysHappyHours(pub);
  const today = new Date().getDay();
  const websiteDomain = website.replace(/(^\w+:|^)\/\//, '').split('/')[0];

  const laterHappyHours = todaysHappyHours.filter(
    (hh) =>
      !['past', 'active'].includes(hh.status) &&
      hh.startTime !== nextHappyHour?.startTime
  );
  const laterStartTimeDisplay = laterHappyHours[0]?.startTimeDisplay;
  const laterEndTimeDisplay = laterHappyHours[0]?.endTimeDisplay;
  const laterStatus = laterHappyHours[0]?.status;

  const nextHappyHourText =
    (nextHappyHour?.day !== today ? `${nextHappyHour?.dayDisplay} ` : '') +
    `${nextHappyHour?.startTimeDisplay} - ${nextHappyHour?.endTimeDisplay}`;

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
          <View style={styles.containersContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>{name}</Text>
              <Text style={styles.text}>
                Happy hour:{' '}
                {nextHappyHour ? (
                  <Text
                    style={{
                      ...styles.text,
                      color: getTextColor(nextHappyHour.status),
                    }}
                  >
                    {nextHappyHourText}
                  </Text>
                ) : (
                  <Text>None upcoming</Text>
                )}
              </Text>
              {laterStartTimeDisplay && (
                <Text>
                  Later:{' '}
                  <Text
                    style={{ ...styles.text, color: getTextColor(laterStatus) }}
                  >
                    {laterStartTimeDisplay} - {laterEndTimeDisplay}
                  </Text>
                </Text>
              )}
              <Text style={styles.text}>
                Menu -{' '}
                <Text
                  style={{ ...styles.text, color: 'blue' }}
                  onPress={() => Linking.openURL(website)}
                >
                  {websiteDomain}
                </Text>
              </Text>
              <TouchableOpacity onPress={close}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
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
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 30,
  },
  handle: {
    opacity: 0.3,
    height: 3,
    borderWidth: 2,
    borderColor: '#86827e',
    marginVertical: 16,
    alignSelf: 'center',
    width: 50,
  },
  containersContainer: {
    flexDirection: 'row',
  },
  textContainer: {},
  text: {
    lineHeight: 22,
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
