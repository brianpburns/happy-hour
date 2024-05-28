import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import { View } from './themed';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { usePubsContext } from 'src/state/pubs-context';
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

  const toggleDrawer = (id: number) => {
    setSelectedPub(selectedPub === id ? null : id);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 49.265325804046235,
          longitude: -123.14535265106639,
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
      <PubInfoDrawer
        pub={pubs.find((pub) => pub.id === selectedPub)}
        isOpen={selectedPub !== null}
        close={() => setSelectedPub(null)}
      />
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
  marker: {
    height: 10,
    width: 10,
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
