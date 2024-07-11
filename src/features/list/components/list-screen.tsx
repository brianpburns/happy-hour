import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Filters } from 'src/features/map/components/filters';
import { usePubsContext } from 'src/state/pubs-context';
import { ListItem } from './list-item';

export const ListScreen = () => {
  const { filteredPubs } = usePubsContext();

  return (
    <View style={styles.container}>
      <View style={styles.filtersWrapper}>
        <Filters />
      </View>
      <View style={styles.separator} />
      {filteredPubs.map((pub) => (
        <ListItem key={pub.googlePlaceId} pub={pub} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 1,
    marginTop: Constants.statusBarHeight,
  },
  filtersWrapper: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: '80%',
  },
});
