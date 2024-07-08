import { Theme, useTheme } from '@react-navigation/native';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { StyledHeading } from 'src/features/shared/components/styled-heading';
import { StyledText } from 'src/features/shared/components/styled-text';
import { getHappyHourDetails } from 'src/features/shared/helpers/get-happy-hour-details';
import { getTextColor } from 'src/features/shared/helpers/get-text-color';
import { Pub } from 'src/types';

interface Props {
  pub: Pub;
  isOpen: boolean;
}

enum DrawerHeight {
  Min = 0.1,
  Mid = 0.25,
  Max = 0.6,
}

export const PubInfoDrawer = ({ pub, isOpen }: Props) => {
  const windowHeight = Dimensions.get('window').height;
  const { name, website } = pub;
  const { todaysHappyHours, nextHappyHour } = getHappyHourDetails(pub);
  const today = new Date().getDay();
  const websiteDomain = website.replace(/(^\w+:|^)\/\//, '').split('/')[0];
  const [drawerHeight, setDrawerHeight] = useState<DrawerHeight>(DrawerHeight.Mid);
  const [y, setY] = useState(0);
  const ref = useRef<View>(null);

  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  useEffect(() => {
    setDrawerHeight(DrawerHeight.Mid);
  }, [name]);

  const laterHappyHours = todaysHappyHours.filter(
    (hh) => !['past', 'active'].includes(hh.status) && hh.startTime !== nextHappyHour?.startTime,
  );
  const laterStartTimeDisplay = laterHappyHours[0]?.startTimeDisplay;
  const laterEndTimeDisplay = laterHappyHours[0]?.endTimeDisplay;
  const laterStatus = laterHappyHours[0]?.status;

  const nextHappyHourText =
    (nextHappyHour?.day !== today ? `${nextHappyHour?.dayDisplay} ` : '') +
    `${nextHappyHour?.startTimeDisplay} - ${nextHappyHour?.endTimeDisplay}`;

  const handleTouchStart = (event: GestureResponderEvent) => {
    setY(event.nativeEvent.pageY);
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    if (event.nativeEvent.pageY > y) {
      if (drawerHeight === DrawerHeight.Max) {
        setDrawerHeight(DrawerHeight.Mid);
      } else {
        setDrawerHeight(DrawerHeight.Min);
      }
    } else {
      if (drawerHeight === DrawerHeight.Mid) {
        setDrawerHeight(DrawerHeight.Max);
      } else {
        setDrawerHeight(DrawerHeight.Mid);
      }
    }
  };

  return (
    <Modal
      animationIn="slideInUp"
      isVisible={isOpen}
      coverScreen={false}
      hasBackdrop={false}
      style={styles.modal}
    >
      <Animated.View
        ref={ref}
        style={[styles.bottomSheet, { height: windowHeight * drawerHeight }]}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
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
            </View>
          </View>
        </View>
      </Animated.View>
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
