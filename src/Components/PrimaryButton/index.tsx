import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../../theme';

export default ({
  text,
  buttonStyle,
  textStyle,
  onPress,
  disabled,
  leftIcon,
  rightIcon,
  loading,
}: {
  text: string;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
}) => {
  return (
    <Pressable
      onPress={disabled || loading ? () => null : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        buttonStyle,
        disabled ? { backgroundColor: colors.neutral } : null,
        loading && styles.loading,
        { opacity: pressed ? 0.6 : 1 },
      ]}>
      {loading ? (
        <ActivityIndicator
          size="small"
          color="white"
          style={{ paddingVertical: 10 }}
        />
      ) : (
        <React.Fragment>
          <View style={{ flex: 1 }}>{leftIcon}</View>
          <Text style={[styles.text, textStyle]}>{text}</Text>
          <View style={{ flex: 1 }}>{rightIcon}</View>
        </React.Fragment>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    height: 48,
    backgroundColor: colors.primary,
  },
  pill: {
    flexGrow: 0,
    height: 'auto',
    width: 'auto',
    borderRadius: 25,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  textPill: {
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  loading: {
    justifyContent: 'center',
  },
});
