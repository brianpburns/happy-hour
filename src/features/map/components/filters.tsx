import { Theme, useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from 'src/features/shared/components/styled-text';
import { useFilterPubs } from 'src/features/shared/hooks/use-filter-pubs';
import { themeColors } from 'src/features/shared/styles';

export const Filters = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const filterPubs = useFilterPubs();

  return (
    <View style={styles.filterWrapper}>
      <Pressable style={[styles.filter, { backgroundColor: themeColors.grey }]}>
        <StyledText
          onPress={() => filterPubs('all')}
          style={{ fontWeight: 'bold', color: 'white' }}
        >
          All
        </StyledText>
      </Pressable>
      <Pressable
        onPress={() => filterPubs('active')}
        style={[styles.filter, { backgroundColor: themeColors.green }]}
      >
        <StyledText style={{ fontWeight: 'bold', color: 'white' }}>Now</StyledText>
      </Pressable>
      <Pressable
        onPress={() => filterPubs('soon')}
        style={[styles.filter, { backgroundColor: themeColors.orange }]}
      >
        <StyledText style={{ fontWeight: 'bold', color: 'white' }}>Soon</StyledText>
      </Pressable>
    </View>
  );
};

const makeStyles = ({ colors }: Theme) => {
  return StyleSheet.create({
    filterWrapper: {
      position: 'absolute',
      left: 5,
      right: 5,
      top: 48,
      zIndex: 1,
      width: '50%',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    filter: {
      padding: 3,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.background,
      borderStyle: 'solid',
      marginRight: 5,
    },
    pressedFilter: {
      backgroundColor: colors.primary,
    },
  });
};
