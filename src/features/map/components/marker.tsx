import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { getHappyHourDetails } from 'src/features/shared/helpers/get-happy-hour-details';
import { getIconColor } from 'src/features/shared/helpers/get-text-color';
import { Pub } from 'src/types';

interface Props {
  pub: Pub;
  onPress: () => void;
  isSelected: boolean;
}

export const PubMarker = ({ pub, onPress, isSelected }: Props) => {
  const { coordinates } = pub;
  const { nextHappyHour } = getHappyHourDetails(pub);
  const status = nextHappyHour?.status ?? 'past';
  const color = getIconColor(status);

  return (
    <Marker
      onPress={onPress}
      coordinate={coordinates}
      anchor={{ x: 0.1, y: 0.8 }}
      tracksViewChanges={false}
    >
      <FontAwesome6 name="location-pin" size={45} style={{ color }} />
      <Ionicons name="beer-outline" size={22} color={color} style={styles.beerIcon} />
    </Marker>
  );
};

const styles = StyleSheet.create({
  beerIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    left: 5,
    top: 4,
    paddingLeft: 3,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
