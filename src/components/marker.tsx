import { Marker } from 'react-native-maps';
import { Pub } from 'src/types';
import flagBlueImg from '../../assets/images/flag-blue.png';

interface Props {
  pub: Pub;
  onPress: () => void;
}

export const PubMarker = ({ pub, onPress }: Props) => {
  const { coordinate } = pub;

  return (
    <Marker
      onPress={onPress}
      coordinate={coordinate}
      anchor={{ x: 0.55, y: 0.9 }}
      image={flagBlueImg}
    />
  );
};
