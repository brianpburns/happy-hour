import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { getIconColor } from 'src/features/shared/helpers/get-text-color';
import { useTodaysHappyHours } from 'src/features/shared/hooks/use-happy-hour';
import { Pub } from 'src/types';
import beerLogo from '../../../../assets/images/beer.png';

interface Props {
  pub: Pub;
  onPress: () => void;
}

export const PubMarker = ({ pub, onPress }: Props) => {
  const { coordinate } = pub;
  const { nextHappyHour } = useTodaysHappyHours(pub);
  const status = nextHappyHour?.status ?? 'past';
  const color = getIconColor(status);

  return (
    <Marker
      onPress={onPress}
      coordinate={coordinate}
      anchor={{ x: 0.1, y: 0.8 }}
    >
      <FontAwesome6 name='location-pin' size={35} style={{ color }} />
      <Image source={beerLogo} style={styles.beerIcon} />
    </Marker>
  );
};

const styles = StyleSheet.create({
  beerIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    left: 3,
    top: 3,
    backgroundColor: 'white',
    borderRadius: 20,
  },
});
