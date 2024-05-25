import { Marker } from 'react-native-maps';
import { Pub } from 'src/types';
import flagBlueImg from '../../../../assets/images/beer.png';

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
      anchor={{ x: 0.3, y: 0.75 }}
      image={flagBlueImg}
    />
  );
};
