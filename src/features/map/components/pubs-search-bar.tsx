import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Theme, useTheme } from '@react-navigation/native';
import React, { useMemo, useRef } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { StyledText, getTextStyles } from 'src/features/shared/components/styled-text';

import { usePubsContext } from 'src/state/pubs-context';
import { Pub } from 'src/types';
import { useSearchPubs } from '../hooks/use-search-pubs';

interface Props {
  onStartSearch: () => void;
  setSelectedPub: (id: number | null) => void;
}

export const PubsSearchBar = ({ onStartSearch, setSelectedPub }: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const textStyles = useMemo(() => getTextStyles(theme), [theme]);
  const ref = useRef<TextInput>(null);
  const { searchTerm, handleSearch, results, resetSearch, clearSearch } = useSearchPubs();
  const { setDrawerOpen, setLatitude, setLongitude } = usePubsContext();

  const unfocus = () => {
    ref.current?.blur();
  };

  const search = (value: string) => {
    if (value === '') {
      resetSearch();
    } else {
      handleSearch(value);
    }
  };

  const handleSubmit = (item: Pub) => {
    setSelectedPub(item.id);
    setLatitude(item.coordinates.latitude);
    setLongitude(item.coordinates.longitude);
    unfocus();
    setDrawerOpen(true);
    resetSearch();
  };

  const handlePress = () => {
    if (searchTerm === 'Search here') {
      clearSearch();
    }
    onStartSearch();
  };

  return (
    <View style={styles.searchbarWrapper}>
      <Autocomplete
        data={results}
        onPress={handlePress}
        onChangeText={(text) => search(text)}
        renderTextInput={() => (
          <View style={styles.searchbar}>
            {searchTerm ? (
              <AntDesign name="left" size={16} color="white" onPress={resetSearch} />
            ) : (
              <Ionicons
                name="beer-outline"
                size={16}
                color="white"
                onPress={() => ref.current?.focus()}
              />
            )}
            <TextInput
              ref={ref}
              onPress={handlePress}
              onChangeText={(text) => search(text)}
              style={[textStyles.text, { paddingLeft: 3, flex: 1 }]}
            >
              {searchTerm}
            </TextInput>
            {searchTerm && (
              <AntDesign
                name="closecircleo"
                size={16}
                style={styles.closeButton}
                onPress={clearSearch}
              />
            )}
          </View>
        )}
        flatListProps={{
          renderItem: ({ item }) => (
            <TouchableOpacity onPress={() => handleSubmit(item)}>
              <StyledText key={item.name} style={styles.listItem}>
                {item.name}
              </StyledText>
            </TouchableOpacity>
          ),
          keyboardShouldPersistTaps: 'handled',
        }}
      />
    </View>
  );
};

const makeStyles = ({ colors }: Theme) => {
  return StyleSheet.create({
    searchbarWrapper: {
      flex: 1,
      left: 5,
      position: 'absolute',
      right: 5,
      top: 5,
      zIndex: 1,
    },
    searchbar: {
      backgroundColor: colors.background,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      color: colors.text,
      paddingLeft: 15,
      borderRadius: 20,
      height: 40,
    },
    closeButton: {
      color: colors.text,
      marginRight: 12,
    },
    listItem: {
      backgroundColor: colors.background,
      padding: 5,
    },
  });
};
