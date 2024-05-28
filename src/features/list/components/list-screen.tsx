import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { usePubsContext } from 'src/state/pubs-context';
import { ListItem } from './list-item';

export const ListScreen = () => {
  const { pubs } = usePubsContext();

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      {pubs.map((pub) => (
        <ListItem key={pub.id} pub={pub} />
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
