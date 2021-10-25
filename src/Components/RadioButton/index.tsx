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
        <View style={styles.circle}>
          {selected && <View style={styles.filledCircle} />}
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      {secondaryLabel && (
        <Text style={styles.secondaryLabel}>{secondaryLabel}</Text>
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
  circle: {
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
  },
  filledCircle: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: colors.active,
  },
  label: {
    color: colors.secondary,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  secondaryLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 40,
  },
});
