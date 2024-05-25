import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
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
      animationType='slide'
      transparent={true}
      visible={isOpen}
      onRequestClose={close}
    >
      <View style={[styles.bottomSheet, { height: windowHeight * 0.4 }]}>
        <View style={{ paddingVertical: 5 }}>
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
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
