import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from './themed';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { usePubsContext } from 'src/state/pubs-context';
import { useMapParams } from '../hooks/use-map-params';
import { PubMarker } from './marker';
import { PubInfoDrawer } from './pub-info-drawer';
import { PubsSearchBar } from './pubs-search-bar';

const mapStyle = [
  {
    featureType: 'poi',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [{ visibility: 'off' }],
  },
];

export const MapScreen = () => {
  const { pubs, selectedPubData } = useMapParams();
  const {
    drawerOpen,
    setDrawerOpen,
    selectedPub,
    setSelectedPub,
    latitude,
    longitude,
    setLatitude,
  } = usePubsContext();

  const toggleDrawer = (id: number) => {
    setDrawerOpen(drawerOpen ? selectedPub !== id : true);
    if (selectedPub !== id) {
      setSelectedPub(id);
    }
  };

  const onStartSearch = () => {
    setDrawerOpen(false);
  };

  return (
    <View style={styles.container}>
      <PubsSearchBar onStartSearch={onStartSearch} setSelectedPub={setSelectedPub} />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        customMapStyle={mapStyle}
        toolbarEnabled={false}
        mapPadding={{ top: 40, right: 0, left: 0, bottom: 40 }}
      >
        {pubs.map((pub) => (
          <PubMarker
            key={pub.id}
            pub={pub}
            onPress={() => toggleDrawer(pub.id)}
            isSelected={selectedPub === pub.id}
          />
        ))}
      </MapView>
      {selectedPubData && (
        <PubInfoDrawer
          pub={selectedPubData}
          isOpen={drawerOpen}
          close={() => setDrawerOpen(false)}
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
