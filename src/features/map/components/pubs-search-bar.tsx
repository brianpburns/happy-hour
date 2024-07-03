import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Theme, useTheme } from '@react-navigation/native';
import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { StyledText, getTextStyles } from 'src/features/shared/components/styled-text';

import { Pub } from 'src/types';
import { useSearchPubs } from '../hooks/use-search-pubs';
import { Filters } from './filters';

interface Props {
  onStartSearch: () => void;
}

export const PubsSearchBar = forwardRef<TextInput, Props>(({ onStartSearch }, ref) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const textStyles = useMemo(() => getTextStyles(theme), [theme]);
  const { searchTerm, handleSearch, results, resetSearch, clearSearch, handleListSelection } =
    useSearchPubs();

  const newRef = React.useRef<TextInput>(null);
  const searchBarRef = (ref || newRef) as React.RefObject<TextInput>;

  const unfocus = () => {
    searchBarRef.current?.blur();
  };

  const search = (value: string) => {
    if (value === '') {
      resetSearch();
    } else {
      handleSearch(value);
    }
  };

  const handleSelect = (pub: Pub) => {
    unfocus();
    handleListSelection(pub);
  };

  return (
    <>
      <View style={styles.searchbarWrapper}>
        <Autocomplete
          data={results}
          onPress={onStartSearch}
          onChangeText={(text) => search(text)}
          renderTextInput={() => (
            <View style={styles.searchbar}>
              {searchTerm ? (
                <AntDesign name="left" size={16} color="white" onPress={unfocus} />
              ) : (
                <Ionicons
                  name="beer-outline"
                  size={16}
                  color="white"
                  onPress={() => searchBarRef.current?.focus()}
                />
              )}
              <TextInput
                ref={searchBarRef}
                onPress={onStartSearch}
                onChangeText={(text) => search(text)}
                style={[textStyles.text, { paddingLeft: 5, flex: 1 }]}
                placeholderTextColor={theme.colors.text}
                placeholder="Search here"
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
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <StyledText key={item.name} style={styles.listItem}>
                  {item.name}
                </StyledText>
              </TouchableOpacity>
            ),
            keyboardShouldPersistTaps: 'handled',
          }}
        />
      </View>
      <Filters />
    </>
  );
});

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
