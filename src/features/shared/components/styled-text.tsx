import { Theme, useTheme } from '@react-navigation/native';
import { useMemo } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

export const StyledText = (props: TextProps) => {
  const { children, style } = props;
  const theme = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

const makeStyles = ({ colors }: Theme) => {
  return StyleSheet.create({
    text: {
      color: colors.text,
      lineHeight: 22,
    },
  });
};
