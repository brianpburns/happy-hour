import React from 'react';
import { StyleSheet, Text } from 'react-native';
import flagBlueImg from '../../assets/images/flag-blue.png';

import { View } from './themed';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={styles.container}>
      <Text>Map App only using the space of the text</Text>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        userInterfaceStyle='light'
        showsUserLocation={true}
      >
        <Marker
          // onPress={() => this.setState({ marker1: !this.state.marker1 })}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          centerOffset={{ x: -18, y: -60 }}
          anchor={{ x: 0.69, y: 1 }}
          image={flagBlueImg}
        >
          <Text style={styles.marker}>X</Text>
        </Marker>
      </MapView>
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
});
