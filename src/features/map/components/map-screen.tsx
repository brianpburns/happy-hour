import React, { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput } from 'react-native';

import { View } from './themed';

import { getCurrentPositionAsync } from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useFilterPubs } from 'src/features/shared/hooks/use-filter-pubs';
import { useDispatch, useSelector } from 'src/state';
import { setDrawerOpen, setLatitude, setLongitude, setSelectedPub } from 'src/state/appSlice';
import { useUserLocation } from 'src/state/hooks/use-user-location';
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

interface Props {
  userLocationLoaded: boolean;
}

export const MapScreen = ({ userLocationLoaded }: Props) => {
  const { selectedPubData } = useMapParams();
  const drawerOpen = useSelector((state) => state.drawerOpen);
  const selectedPub = useSelector((state) => state.selectedPub);
  const latitude = useSelector((state) => state.latitude);
  const longitude = useSelector((state) => state.longitude);
  const filteredPubs = useSelector((state) => state.filteredPubs);
  const searchBarRef = useRef<TextInput>(null);
  const [hideSearchResults, setHideSearchResults] = useState(false);
  const filterPubs = useFilterPubs();
  const dispatch = useDispatch();
  useUserLocation();

  const handleMarkerPress = (id: number) => {
    dispatch(setDrawerOpen(drawerOpen ? selectedPub !== id : true));
    dispatch(setSelectedPub(id));
  };

  const onStartSearch = () => {
    filterPubs('all');
    setHideSearchResults(false);
    dispatch(setDrawerOpen(false));
  };

  // This method handles clicking the my location button. Without it, coords are out of sync with the map position.
  const handleRegionChangeComplete = async (e: Region) => {
    const { coords } = await getCurrentPositionAsync({});
    if (
      Math.round(e.latitude) === Math.round(coords.latitude) &&
      Math.round(e.longitude) === Math.round(coords.longitude)
    ) {
      dispatch(setLatitude(e.latitude));
      dispatch(setLongitude(e.longitude));
    }
  };

  const unfocusSearchBar = () => {
    setHideSearchResults(true);
    searchBarRef.current?.blur();
  };

  return (
    <>
      {userLocationLoaded ? (
        <View style={styles.container}>
          <PubsSearchBar
            ref={searchBarRef}
            onStartSearch={onStartSearch}
            hideSearchResults={hideSearchResults}
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
            onPress={unfocusSearchBar}
            onMarkerPress={unfocusSearchBar}
            onRegionChangeComplete={handleRegionChangeComplete}
            showsUserLocation={true}
            showsPointsOfInterest={false}
            customMapStyle={mapStyle}
            toolbarEnabled={false}
            mapPadding={{ top: 40, right: 0, left: 0, bottom: 40 }}
          >
            {filteredPubs.map((pub) => (
              <PubMarker
                key={pub.id}
                pub={pub}
                onPress={() => handleMarkerPress(pub.id)}
                isSelected={selectedPub === pub.id}
              />
            ))}
          </MapView>
          {selectedPubData && <PubInfoDrawer pub={selectedPubData} isOpen={drawerOpen} />}
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </>
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
