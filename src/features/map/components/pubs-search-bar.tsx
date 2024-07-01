import { Theme, useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { StyledText } from 'src/features/shared/components/styled-text';

import { Pub } from 'src/types';

interface Props {
  searchTerm: string;
  handleSearch: (term: string) => void;
  results: Pub[];
  resetSearch: () => void;
  onStartSearch: () => void;
}

export const PubsSearchBar = ({
  searchTerm,
  handleSearch,
  results,
  resetSearch,
  onStartSearch,
}: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const search = (value: string) => {
    if (value === '') {
      resetSearch();
    } else {
      handleSearch(value);
    }
  };

  const handleSubmit = (item: Pub) => {
    console.log('click', item);
  };

  return (
    <View style={styles.wrapper}>
      <Autocomplete
        data={results}
        onPress={onStartSearch}
        value={searchTerm ?? 'Search here'}
        onChangeText={(text) => search(text)}
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
        listContainerStyle={{ marginLeft: -10, marginRight: -10 }}
        style={styles.searchbar}
      />
    </View>
  );
};

const makeStyles = ({ colors }: Theme) => {
  return StyleSheet.create({
    wrapper: {
      flex: 1,
      left: 5,
      position: 'absolute',
      right: 5,
      top: 5,
      zIndex: 1,
    },
    searchbar: {
      backgroundColor: colors.background,
      color: colors.text,
      textDecorationLine: 'none',
      paddingLeft: 10,
      borderRadius: 10,
    },
    listItem: {
      backgroundColor: colors.background,
      padding: 5,
    },
  });
};
