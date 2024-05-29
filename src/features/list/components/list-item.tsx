import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getTextColor } from 'src/features/shared/helpers/get-text-color';
import { useTodaysHappyHours } from 'src/features/shared/hooks/use-happy-hour';
import { Pub } from 'src/types';

export const ListItem = ({ pub }: { pub: Pub }) => {
  const { name, website, logo } = pub;
  const { nextHappyHour } = useTodaysHappyHours(pub);
  const today = new Date().getDay();
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

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.listItem}>
        <Image
          source={{ uri: logo }}
          style={{ width: 50, height: 50, resizeMode: 'contain', margin: 1 }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text
            style={{ ...styles.text, color: 'blue' }}
            onPress={() => Linking.openURL(website)}
          >
            {website}
          </Text>
        </View>
        <View style={styles.happyHourContainer}>
          <Text
            style={{
              ...styles.text,
              color: nextHappyHour ? getTextColor(nextHappyHour?.status) : '',
            }}
          >
            {happyHourText}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 1,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
});
