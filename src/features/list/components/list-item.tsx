import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useHappyHour } from 'src/features/shared/hooks/use-happy-hour';
import { Pub } from 'src/types';

export const ListItem = ({ pub }: { pub: Pub }) => {
  const { name, website, logo } = pub;
  const happyHourStatus = useHappyHour(pub);
  // const { navigate } = useNavigation();

  const handlePress = () => {
    // navigate('PubDetails', { pub });
  };

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
          <Text style={styles.text}>
            {happyHourStatus === 'active' ? 'Now' : '10pm'}
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
