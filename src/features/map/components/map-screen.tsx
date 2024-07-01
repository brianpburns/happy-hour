import React from 'react';
import { StyleSheet } from 'react-native';

import { View } from './themed';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useMapParams } from '../hooks/use-map-params';
import { useSearchPubs } from '../hooks/use-search-pubs';
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
  const { pubs, selectedPub, setSelectedPub, selectedPubData, latitude, longitude } =
    useMapParams();
  const { searchTerm, handleSearch, results, resetSearch } = useSearchPubs();

  const toggleDrawer = (id: number) => {
    setSelectedPub(selectedPub === id ? null : id);
  };

  const onStartSearch = () => {
    setSelectedPub(null);
  };

  return (
    <View style={styles.container}>
      <PubsSearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        results={results}
        resetSearch={resetSearch}
        onStartSearch={onStartSearch}
      />
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
