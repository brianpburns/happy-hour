import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { getIconColor } from 'src/features/shared/helpers/get-text-color';
import { useTodaysHappyHours } from 'src/features/shared/hooks/use-happy-hour';
import { Pub } from 'src/types';

interface Props {
  pub: Pub;
  onPress: () => void;
}

export const PubMarker = ({ pub, onPress }: Props) => {
  const { coordinate } = pub;
  const { nextHappyHour } = useTodaysHappyHours(pub);
  const { status } = nextHappyHour ?? { status: 'past' };
  const color = getIconColor(status);

  return (
    <Marker
      onPress={onPress}
      coordinate={coordinate}
      anchor={{ x: 0.1, y: 0.8 }}
    >
      <FontAwesome6
        name='location-pin'
        size={35}
        style={{ ...styles.icon, color }}
      />
    </Marker>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: '#faa84b',
  },
});
