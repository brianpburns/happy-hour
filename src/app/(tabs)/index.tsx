import { SafeAreaView, StyleSheet } from 'react-native';

import MapScreen from '../../components/map-screen';

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
