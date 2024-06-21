import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from './themed';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { usePubsContext } from 'src/state/pubs-context';
import { useLocation } from '../hooks/use-location';
import { PubMarker } from './marker';
import { PubInfoDrawer } from './pub-info-drawer';

const mapStyle = [
  {
    featureType: 'poi',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
];

export const MapScreen = () => {
  const [selectedPub, setSelectedPub] = useState<number | null>(null);
  const { pubs } = usePubsContext();
  const selectedPubData = pubs.find((pub) => pub.id === selectedPub);
  // TODO: Handle user rejection of location permissions
  const { coords } = useLocation();

  const toggleDrawer = (id: number) => {
    setSelectedPub(selectedPub === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        customMapStyle={mapStyle}
        toolbarEnabled={false}
      >
        {pubs.map((pub) => (
          <PubMarker
            key={pub.id}
            pub={pub}
            onPress={() => toggleDrawer(pub.id)}
          />
        ))}
      </MapView>
      {selectedPubData && (
        <PubInfoDrawer
          pub={selectedPubData}
          isOpen={selectedPub !== null}
          close={() => setSelectedPub(null)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerBlurb: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'red',
  },
});
