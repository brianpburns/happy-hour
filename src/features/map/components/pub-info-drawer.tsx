import { Theme, useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { Dimensions, Linking, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { StyledHeading } from 'src/features/shared/components/styled-heading';
import { StyledText } from 'src/features/shared/components/styled-text';
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

  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const laterHappyHours = todaysHappyHours.filter(
    (hh) => !['past', 'active'].includes(hh.status) && hh.startTime !== nextHappyHour?.startTime,
  );
  const laterStartTimeDisplay = laterHappyHours[0]?.startTimeDisplay;
  const laterEndTimeDisplay = laterHappyHours[0]?.endTimeDisplay;
  const laterStatus = laterHappyHours[0]?.status;

  const nextHappyHourText =
    (nextHappyHour?.day !== today ? `${nextHappyHour?.dayDisplay} ` : '') +
    `${nextHappyHour?.startTimeDisplay} - ${nextHappyHour?.endTimeDisplay}`;

  return (
    <Modal
      animationIn="slideInUp"
      isVisible={isOpen}
      coverScreen={false}
      hasBackdrop={false}
      style={styles.modal}
    >
      <View style={[styles.bottomSheet, { height: windowHeight * 0.3 }]}>
        <View>
          <View style={styles.handle} />
          <View style={styles.containersContainer}>
            <View>
              <StyledHeading>{name}</StyledHeading>
              <StyledText>
                Happy hour:{' '}
                {nextHappyHour ? (
                  <StyledText style={{ color: getTextColor(nextHappyHour.status) }}>
                    {nextHappyHourText}
                  </StyledText>
                ) : (
                  <StyledText>None upcoming</StyledText>
                )}
              </StyledText>
              {laterStartTimeDisplay && (
                <StyledText>
                  Later:{' '}
                  <StyledText style={{ color: getTextColor(laterStatus) }}>
                    {laterStartTimeDisplay} - {laterEndTimeDisplay}
                  </StyledText>
                </StyledText>
              )}
              <StyledText>
                Menu -{' '}
                <StyledText style={styles.link} onPress={() => Linking.openURL(website)}>
                  {websiteDomain}
                </StyledText>
              </StyledText>
              <TouchableOpacity onPress={close}>
                <StyledText>Close</StyledText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const makeStyles = ({ dark, colors }: Theme) => {
  return StyleSheet.create({
    modal: {
      flex: 1,
      justifyContent: 'center',
      margin: 0,
    },
    handle: {
      opacity: 0.3,
      height: 3,
      borderWidth: 2,
      borderColor: dark ? colors.text : colors.primary,
      marginVertical: 16,
      alignSelf: 'center',
      width: 50,
    },
    containersContainer: {
      flexDirection: 'row',
    },
    link: {
      color: colors.primary,
    },
    bottomSheet: {
      position: 'absolute',
      left: 0,
      right: 0,
      justifyContent: 'flex-start',
      backgroundColor: colors.background,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingHorizontal: 25,
      bottom: 0,
    },
  });
};
