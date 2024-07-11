import { Ionicons } from '@expo/vector-icons';
import { Theme, useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { StyledText } from 'src/features/shared/components/styled-text';
import { themeColors } from 'src/features/shared/styles';
import { HappyHourStatus } from 'src/types';

export const FilterButton = ({
  filter,
  activeFilter,
  handleFilterPress,
  color,
}: {
  filter: HappyHourStatus | 'all';
  activeFilter: HappyHourStatus | 'all';
  handleFilterPress: (status: HappyHourStatus | 'all') => void;
  color: keyof typeof themeColors;
}) => {
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <Pressable style={[styles.filter, { backgroundColor: color }]}>
      {filter === activeFilter && (
        <Ionicons
          name="beer-outline"
          size={16}
          color="white"
          style={{ marginRight: 2, marginTop: 1 }}
        />
      )}
      <StyledText
        onPress={() => handleFilterPress(filter)}
        style={{
          fontWeight: 'bold',
          color: 'white',
          justifyContent: 'flex-start',
        }}
      >
        {filter.charAt(0).toUpperCase() + filter.slice(1)}
      </StyledText>
    </Pressable>
  );
};

const makeStyles = ({ colors }: Theme) => {
  return StyleSheet.create({
    filterWrapper: {
      flexDirection: 'row',
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
      flexDirection: 'row',
    },
    pressedFilter: {
      backgroundColor: colors.primary,
    },
  });
};
