import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme';

const RadioButton = ({
  selected,
  label,
  onPress,
  buttonStyle,
  secondaryLabel,
}: {
  selected: boolean;
  label: string;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  secondaryLabel?: string;
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <View style={styles.inputRow}>
        <View
          style={{
            height: 30,
            width: 30,
            borderColor: 'white',
            borderWidth: 2,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            backgroundColor: 'white',
          }}>
          {selected && (
            <View
              style={{
                height: 28,
                width: 28,
                borderRadius: 14,
                backgroundColor: colors.active,
              }}
            />
          )}
        </View>
        <Text
          style={{
            color: colors.secondary,
            fontSize: 16,
            marginLeft: 10,
            fontWeight: '600',
          }}>
          {label}
        </Text>
      </View>
      {secondaryLabel && (
        <Text
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: '400',
            marginLeft: 40,
          }}>
          {secondaryLabel}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
});
