import { SafeAreaView, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/edit-screen-info';

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <EditScreenInfo path='app/(tabs)/index.tsx' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
