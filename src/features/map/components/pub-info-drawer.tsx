import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { Pub } from 'src/types';

interface Props {
  pub?: Pub;
  isOpen: boolean;
  close: () => void;
}

export const PubInfoDrawer = ({ pub, isOpen, close }: Props) => {
  const windowHeight = Dimensions.get('window').height;
  const name = pub?.name;
  const happyHours = pub?.happyHours;

  return (
    <Modal
      animationIn='slideInUp'
      isVisible={isOpen}
      coverScreen={false}
      hasBackdrop={false}
      style={styles.modal}
    >
      <View style={[styles.bottomSheet, { height: windowHeight * 0.3 }]}>
        <View>
          <View
            style={{
              opacity: 0.2,
              height: 1,
              borderWidth: 1,
              borderColor: '#86827e',
              marginVertical: 16,
            }}
          />
          <View
            style={{
              flex: 0,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Text>{name}</Text>
            <Text>Happy Hour:</Text>
            <Text>Start: {happyHours?.[0].startTime}</Text>
            <Text>End: {happyHours?.[0].endTime}</Text>
            <TouchableOpacity onPress={close}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 25,
    bottom: 0,
  },
});
