import { Theme, useTheme } from '@react-navigation/native';
import { router } from 'expo-router';
import { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StyledHeading } from 'src/features/shared/components/styled-heading';
import { StyledText } from 'src/features/shared/components/styled-text';
import { getTextColor } from 'src/features/shared/helpers/get-text-color';
import { useTodaysHappyHours } from 'src/features/shared/hooks/use-happy-hour';
import { usePubsContext } from 'src/state/pubs-context';
import { Pub } from 'src/types';

export const ListItem = ({ pub }: { pub: Pub }) => {
  const { name, logo, id, coordinates } = pub;
  const { nextHappyHour } = useTodaysHappyHours(pub);
  const today = new Date().getDay();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { setDrawerOpen, selectedPub, setSelectedPub, setLatitude, setLongitude } =
    usePubsContext();

  const handlePress = () => {
    const { latitude, longitude } = coordinates;
    setSelectedPub(id);
    setLatitude(latitude);
    setLongitude(longitude);
    setDrawerOpen(true);
    router.push({ pathname: `/(tabs)` });
  };

  const happyHourText = nextHappyHour
    ? nextHappyHour.status === 'active'
      ? 'Now'
      : `${nextHappyHour.startTimeDisplay} ${
          nextHappyHour.day !== today ? nextHappyHour.dayDisplay : ''
        }`
    : 'None';

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.listItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: logo }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <StyledHeading>{name}</StyledHeading>
        </View>
        <View style={styles.happyHourContainer}>
          <StyledText
            style={{
              fontWeight: 'bold',
              color: nextHappyHour ? getTextColor(nextHappyHour?.status) : '',
            }}
          >
            {happyHourText}
          </StyledText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const makeStyles = ({ dark, colors }: Theme) => {
  const imageBackground = dark ? colors.text : '';

  return StyleSheet.create({
    listItem: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      padding: 10,
      marginBottom: 1,
    },
    imageContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: imageBackground,
      padding: 3,
    },
    image: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    textContainer: {
      justifyContent: 'center',
      marginLeft: 10,
    },
    happyHourContainer: {
      marginLeft: 10,
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  });
};
