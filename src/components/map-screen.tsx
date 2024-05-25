import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Text, View } from './themed';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { pubs } from 'src/test-data';
import { PubMarker } from './marker';
import { PubInfoDrawer } from './pub-info-drawer';

export default function MapScreen() {
  const [selectedPub, setSelectedPub] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setSelectedPub(1)}>
        <Text>Open Drawer</Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 49.265325804046235,
          longitude: -123.14535265106639,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        userInterfaceStyle='light'
        showsUserLocation={true}
      >
        {pubs.map((pub) => (
          <PubMarker
            key={pub.id}
            pub={pub}
            onPress={() => setSelectedPub(pub.id)}
          />
        ))}
      </MapView>
      <PubInfoDrawer
        pub={pubs.find((pub) => pub.id === selectedPub)}
        isOpen={!!selectedPub}
        close={() => setSelectedPub(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
