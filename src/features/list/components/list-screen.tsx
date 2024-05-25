import { StyleSheet, Text, View } from 'react-native';

export const ListScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <Text>Carlos O'Bryan's</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
