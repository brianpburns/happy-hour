import { Theme, useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { StyledHeading } from 'src/features/shared/components/styled-heading';
import { StyledText } from 'src/features/shared/components/styled-text';
import { getTextColor } from 'src/features/shared/helpers/get-text-color';
import { useTodaysHappyHours } from 'src/features/shared/hooks/use-happy-hour';
import { Pub } from 'src/types';

export const ListItem = ({ pub }: { pub: Pub }) => {
  const { name, website, logo } = pub;
  const { nextHappyHour } = useTodaysHappyHours(pub);
  const today = new Date().getDay();
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  // const { navigate } = useNavigation();

  const handlePress = () => {
    // navigate('PubDetails', { pub });
  };

  const happyHourText = nextHappyHour
    ? nextHappyHour.status === 'active'
      ? 'Now'
      : `${nextHappyHour.startTimeDisplay} ${
          nextHappyHour.day !== today ? nextHappyHour.dayDisplay : ''
        }`
    : 'None';

  // Remove http:// and https:// from website
  const websiteDomain = website.replace(/(^\w+:|^)\/\//, '').split('/')[0];

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.listItem}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: logo }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <StyledHeading>{name}</StyledHeading>
          <StyledText>
            Menu -{' '}
            <StyledText
              style={styles.link}
              onPress={() => Linking.openURL(website)}
            >
              {websiteDomain}
            </StyledText>
          </StyledText>
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
      padding: 2,
    },
    image: {
      width: 50,
      height: 50,
      resizeMode: 'contain',
    },
    textContainer: {
      marginLeft: 10,
    },
    happyHourContainer: {
      marginLeft: 10,
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    link: {
      color: colors.primary,
    },
  });
};
