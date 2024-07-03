import { Theme, useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { StyledText } from 'src/features/shared/components/styled-text';
import { themeColors } from 'src/features/shared/styles';

export const Filters = () => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={styles.filterWrapper}>
      <Pressable style={[styles.filter, { backgroundColor: themeColors.grey }]}>
        <StyledText
          style={{ fontWeight: 'bold', color: 'white' }}
          onPress={() => console.log('all')}
        >
          All
        </StyledText>
      </Pressable>
      <Pressable style={[styles.filter, { backgroundColor: themeColors.green }]}>
        <StyledText style={{ fontWeight: 'bold', color: 'white' }}>Now</StyledText>
      </Pressable>
      <Pressable style={[styles.filter, { backgroundColor: themeColors.orange }]}>
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
      padding: 5,
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
