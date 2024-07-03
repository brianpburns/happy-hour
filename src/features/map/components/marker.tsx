import { FontAwesome6 } from '@expo/vector-icons';
import { Image, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { getHappyHourDetails } from 'src/features/shared/helpers/get-happy-hour-details';
import { getIconColor } from 'src/features/shared/helpers/get-text-color';
import { Pub } from 'src/types';
import beerLogo from '../../../../assets/images/beer.png';

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
      <Image source={beerLogo} style={styles.beerIcon} />
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
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
