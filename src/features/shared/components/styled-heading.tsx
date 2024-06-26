import { Theme, useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export const StyledHeading = (props: TextProps) => {
  const { children, style } = props;
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <Text {...props} style={[styles.heading, style]}>
      {children}
    </Text>
  );
};

const makeStyles = ({ colors }: Theme) => {
  return StyleSheet.create({
    heading: {
      fontSize: 22,
      lineHeight: 32,
      color: colors.text,
    },
  });
};
