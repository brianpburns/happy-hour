import { SafeAreaView, StyleSheet } from 'react-native';

import Constants from 'expo-constants';
import { useSelector } from 'src/state';
import { MapScreen } from '../../features/map';

export default function TabOneScreen() {
  const userLocationLoaded = useSelector((state) => state.userLocationSet);

  return (
    <SafeAreaView style={styles.container}>
      <MapScreen userLocationLoaded={userLocationLoaded} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
