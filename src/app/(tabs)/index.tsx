import { SafeAreaView, StyleSheet } from 'react-native';

import { MapScreen } from '../../features/map';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MapScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
